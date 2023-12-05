const blogModel = require("../../model/blog/blogModel");

const addMyBlogController = async (req, res) => {
  const newBlogData = new blogModel(req.body);
  const email = req.query.email;
  try {
    if (req.decoded.email === email) {
      await newBlogData.save();
      res.status(201).json({
        success: true,
        message: "Blog added successfully!",
      });
    } else {
      res.status(401).json({
        success: true,
        message: "unauthorized access",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding blog data inside database!",
    });
  }
};

module.exports = addMyBlogController;
