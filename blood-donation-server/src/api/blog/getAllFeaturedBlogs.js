const blogModel = require("../../model/blog/blogModel");

const getAllFeaturedBlogs = async (req, res) => {
  try {
    const blogsData = await blogModel.find({ featured: "featured" });
    res.status(201).json({
      success: true,
      message: "Featured blog fetched successfully!",
      data: blogsData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching blogs data from database!",
    });
  }
};

module.exports = getAllFeaturedBlogs;
