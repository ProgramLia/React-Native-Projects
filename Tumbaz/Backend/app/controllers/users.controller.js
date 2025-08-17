const { getUsers, getUser, insertUser, editUser, removeUser } = require("../services/users.service");

async function Users(req,res,next) {
     try {
          const response = await getUsers(req);
          res.status(200).json({
               code:'200',
               status:'SUCCESS',
               data:response,
          });
     } catch(err) {
          next(err);
     }
}

async function User(req,res,next) {
     try {
          const response = await getUser(req);
          res.status(200).json({
               code:'200',
               status:'SUCCESS',
               data:response,
          });
     } catch(err) {
          next(err);
     }
}

async function create(req,res,next) {
     try {
          const response = await insertUser(req);
          res.status(201).json({
               code:'201',
               status:'SUCCESS',
               message:'USER CREATED SUCCESSFULLY',
               data:response,
          });
     } catch(err) {
          next(err);
     }
}

async function update(req,res,next) {
     try {
          const response = await editUser(req);
          res.status(200).json({
               code:'200',
               status:'SUCCESS',
               message:'USER UPDATED SUCCESSFULLY',
               data:response,
          });
     } catch(err) {
          next(err);
     }
}

async function deleteUser(req,res,next) {
     try {
          await removeUser(req);
          res.status(200).json({
               code:'200',
               status:'SUCCESS',
               message:'USER DELETED SUCCESSFULLY',
          });
     } catch(err) {
          next(err);
     }
}

module.exports = {Users, User, create, update, deleteUser}