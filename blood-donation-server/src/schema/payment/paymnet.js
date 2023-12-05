const { Schema } = require("mongoose");

// user schema (client : registration page)

const paymentSchema = new Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
  },
  amount:{
    type:Number,
    required:true,
  },
  Date:{
    type:String,
    required:true,
  },
});

module.exports = paymentSchema;
