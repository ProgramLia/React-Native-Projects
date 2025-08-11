const topupModel = require("../api/v1/models/topup");
const userModel = require("../api/v1/models/users");
const history = require("../api/v1/models/history");
const { BadRequest } = require("../errors/badRequest");
const coreApi = require("../libs/midtrans2");
const { Rupiah } = require("../libs/rupiahFormat");

async function processWebhook(req) {
     // const notification = req.body;
     const notification = await coreApi.transaction.notification(req.body);
     const { transaction_status, order_id } = notification;
     const topup = await topupModel.findOne({ order_id });
     if (!topup) throw new BadRequest("Topup not found");
     if (transaction_status === 'settlement' && topup.status != 'success') {
          topup.status = 'success';
          await topup.save();
          const user = await userModel.findById(topup.user_id);
          user.balance += topup.amount;
          await user.save();
          await history.create({
               user_id:user._id,
               type:"topup",
               flow:"in",
               amount:topup.amount,
               description:`Top-up ${Rupiah(topup.amount)}`
          });
     }
     if (['cancel', 'expire', 'deny'].includes(transaction_status)) {
          topup.status = 'failed';
          await topup.save();
     }
     return { status: transaction_status, order_id }
}

module.exports = { processWebhook };