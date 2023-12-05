const blogModel = require("../../model/blog/blogModel");

const getBlogsData = async (req, res) => {
  try {
    const blogType = req.query.blogType;
    const blogsData =await blogModel.find({status:blogType});
    res.status(201).json({
      success: true,
      message: "Blog fetched successfully!",
      data: blogsData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching blogs data from database!",
    });
  }
};

module.exports = getBlogsData;
