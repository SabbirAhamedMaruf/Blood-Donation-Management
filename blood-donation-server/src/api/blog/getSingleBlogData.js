const blogModel = require("../../model/blog/blogModel");

const getSingleBlogData = async (req, res) => {
  try {
    const currentBlogId = req.params.id;
    const blogType = req.query.blogType;
    const blogsData = await blogModel.findOne({ _id: currentBlogId });
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

module.exports = getSingleBlogData;
