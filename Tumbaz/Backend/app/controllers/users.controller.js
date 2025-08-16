const { getUsers } = require("../services/users.service");

async function Users(req,res,next) {
     try {
          const response = await getUsers(req);
          res.status(200).json({
               code:'200',
               status:'OK',
               data:response,
          });
     } catch(err) {
          next(err);
     }
}

module.exports = {Users}