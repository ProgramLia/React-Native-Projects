const { createTopup } = require("../../../services/topUp");

async function topup(req,res,next) {
     try {
          const response = await createTopup(req)
          res.status(200).json({
               code:'200',
               message:"Top-up transaction created",
               token:response.token,
               redirect_url:response.redirect_url
          })
     }catch(err) {
          next(err);
     }
}

module.exports = {topup}