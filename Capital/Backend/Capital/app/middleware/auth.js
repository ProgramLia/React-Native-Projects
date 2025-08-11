// IMPORTS...
const { Unauthorized } = require("../errors/unauthorized");
const { verifyToken } = require("../libs/jwt");
const userModel = require("../api/v1/models/users");
const { Forbidden } = require("../errors/forbidden");
const { BadRequest } = require("../errors/badRequest");

async function authMiddleware(req, res, next) {
     try {
          const { authorization } = req.headers;
          if (!authorization) throw new Unauthorized("Invalid authentication");
          const token = await verifyToken(authorization.split(" ")[1]);
          console.log(token);
          if(token.exp * 1000 < Date.now()) throw new Unauthorized("Token expired");
          const user = await userModel.findById(token._id);
          if (!user) throw new Unauthorized("User not found");
          req.user = user;
          next();
     } catch (err) {
          next(err);
     }
}

function roleMiddleware(...role) {
     return async function(req,res,next) {
          try{
               const user = await userModel.findById(req.user._id);
               req.user = user;
               if(!role.includes(user?.role || '')) throw new Forbidden("Access denied");
               next();
          }catch(err){
               next(err);
          }
     }
}

// EXPORTS...
module.exports = { authMiddleware, roleMiddleware }