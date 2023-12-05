const { model } = require("mongoose");
const blogSchema = require("../../schema/blog/blogs");
const blogs = model("blogs", blogSchema);
module.exports = blogs;
