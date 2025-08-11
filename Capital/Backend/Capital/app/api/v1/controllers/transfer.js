const { transaferService, getContactService, getReceiverPhoto } = require("../../../services/transafer");

async function transfer(req,res,next) {
     try{
          const response = await transaferService(req);
          res.status(200).json({
               code :'200',
               status:'OK',
               message:'Transfer successfuly'
          })
     }catch(err){
          next(err);
     }
}

async function getContact(req,res,next) {
     try{
          const response = await getContactService(req);
          res.status(200).json({
               code:'200',
               status:'OK',
               data:response,
          })
     }catch(err){
          next(err);
     }
}

async function getReceiver(req,res,next) {
     try{
          const response = await getReceiverPhoto(req);
          res.status(200).json({
               code:'200',
               status:'OK',
               data:response,
          })
     }catch(err){
          next(err);
     }
}

module.exports = {transfer, getContact, getReceiver}