const blogModel = require("../../model/blog/blogModel");

const publicBlogsController = async (req, res) => {
  try {
    const blogsData = await blogModel
      .find({
        status: "publish",
      })
      .sort({ _id: -1 });
    res.status(201).json({
      success: true,
      message: "Blog added successfully!",
      data: blogsData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting blogs data from database!",
    });
  }
};

module.exports = publicBlogsController;
