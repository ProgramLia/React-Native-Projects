const Transfer = require("../api/v1/models/transafer");
const History = require("../api/v1/models/history");
const User = require("../api/v1/models/users");
const {NotFound} = require("../errors/notFound");
const {Conflict} = require("../errors/conflict");
const { BadRequest } = require("../errors/badRequest");
const Image = require("../api/v1/models/image");

async function getContactService(req) {
     const {phone} = req.query;
     if(!phone) return [];
     const user = await User.findById(req.user._id);
     if(phone == user.phone) throw new Conflict("Invalid receiver");
     const receiver = await User.findOne({phone});
     if(!receiver)  throw new NotFound("User not found");
     return receiver;
}

async function getReceiverPhoto(req) {
     const {user_id} = req.query;
     const photo = await Image.findOne({user_id});
     return photo;
}

async function transaferService(req) {
     const {phone , amount} = req.body;
     const sender =  await User.findById(req.user._id);
     const receiver = await User.findOne({phone});
     if(amount < 5000) throw new BadRequest("minimum transfer Rp. 5,000")
     if(!receiver) throw new NotFound("Receiver  not found");
     if(receiver._id.equals(sender._id)) throw new Conflict("Invalid receiver");
     if(sender.balance <= 0 || sender.balance < amount) throw new BadRequest("insufficient balance");
     sender.balance -= Number(amount);
     receiver.balance += Number(amount);
     await sender.save();
     await receiver.save();
     await Transfer.create({
          sender_id:sender._id,
          receiver_id:receiver._id,
          amount:Number(amount)
     });
     await History.insertMany([
          {user_id:sender._id, type:"transfer" , flow:"out",  amount:Number(amount) , description:`Transfer to ${receiver.phone}`},
          {user_id:receiver._id, type:"transfer" , flow:"in", amount:Number(amount) , description:`Transfer from ${sender.phone}`}
     ]);
     return;
}

module.exports = {transaferService, getContactService, getReceiverPhoto};