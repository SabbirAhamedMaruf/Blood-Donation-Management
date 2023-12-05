const { Schema } = require("mongoose");

// user schema (client : registration page)

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  featured: {
    type: String,
    required: true,
  },
});

module.exports = blogSchema;
