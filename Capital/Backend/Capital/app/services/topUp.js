// IMPORTS...
const userModel = require("../api/v1/models/users");
const topupModel = require("../api/v1/models/topup");
const snap = require('../libs/midtrans');
const { BadRequest } = require("../errors/badRequest");

async function createTopup(req) {
const amount = Number(req.body.amount);
     if (isNaN(amount) || amount < 5000) {
          throw new BadRequest("Invalid top-up nominal. Minimum Rp5,000");
     }
     const orderID = 'TOP-UP-' + Date.now();
     const user = await userModel.findById(req.user._id);
     if (!user) throw new BadRequest("User tidak ditemukan");
     const paramater = {
          transaction_details: {
               order_id: orderID,
               gross_amount: amount
          },
          customer_details: {
               first_name: user.name,
               email: user.email
          },
          item_details: [
               {
                    id: 'topup_' + amount,
                    price: amount,
                    quantity: 1,
                    name: 'TOP-UP Saldo Capital'
               }
          ]
     }
     const transaction = await snap.createTransaction(paramater);
     await topupModel.create({
          user_id: user._id,
          order_id: orderID,
          amount: amount,
          status: 'pending'
     });

     return transaction;
}

module.exports = { createTopup }