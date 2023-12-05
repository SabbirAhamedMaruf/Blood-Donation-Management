const mongoose = require("mongoose");
require("dotenv").config();

const databaseConnection =async()=>{
    const uri = process.env.DB_URL;
    const databaseName = process.env.DB_NAME;
    console.log("Log: Connecting to database...");
    await mongoose.connect(uri,{dbName:databaseName})
    console.log("Log: Conneted with database!");
}

module.exports = databaseConnection;