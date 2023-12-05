const cors = require("cors");
const express = require("express");
require("dotenv").config();

const applyCorsConnection = (app) => {
  app.use(cors({ origin: process.env.CLIENT.split(","), credentials: true }));
  app.use(express.json());
};

module.exports = applyCorsConnection;
