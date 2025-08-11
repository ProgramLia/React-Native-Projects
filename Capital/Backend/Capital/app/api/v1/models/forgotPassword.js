// IMPORTS...
const bcryptjs = require("bcryptjs"); 
const mongoose = require("mongoose");
const {Schema, Types, model} = mongoose;

// SCHEMA...
const forgotPasswordSchema = new Schema({
     user_id:{
          type:Types.ObjectId,
          ref:"User",
          required:true
     },
     otp:{
         type:String,
         default:null 
     },
     expire_at:{
          type:Date,
          default:null
     }
}, {
     timestamps:true
})

forgotPasswordSchema.pre("save" , async function (next) {
     if(this.isModified("otp")) this.otp = await bcryptjs.hash(String(this.otp) , 12);
     next();
});

// EXPORTS...
module.exports = model("forgotPasswords" , forgotPasswordSchema);