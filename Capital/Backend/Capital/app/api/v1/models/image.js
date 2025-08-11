// IMPORTS...
const mongoose = require("mongoose");
const {Schema, Types, model} = mongoose;

// SCHEMA...
const imageModel = new Schema({
     user_id:{
          type:Types.ObjectId,
          required:true,
     },
     filename:{
          type:String,
          required:true
     },
     url:{
          type:String,
          required:true,
     },
     uploaded_at:{
          type:Date,
          default:Date.now(),
     }
})

// EXPORTS...
module.exports = model("Images" , imageModel);