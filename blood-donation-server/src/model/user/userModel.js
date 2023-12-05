const {model} = require("mongoose");
const userSchema = require("../../schema/user/user");
const users = model("users",userSchema);
module.exports=users;