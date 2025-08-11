// IMPORTS...
const mongoose = require("mongoose");
const { DB_CONNECTION } = require("../config");

mongoose.connect(DB_CONNECTION)
.then(()=> console.log("SUCCESS TO CONNECT"))
.catch(err=> console.log(err));
const DB = mongoose.connection;

// EXPORT...
module.exports = DB;
