const blogModel = require("../../model/blog/blogModel")

const deleteCurrentBlogController = async (req, res) => {
  try {
    const email = req.query.email;
    const blogId = req.query.blogId;
    if (req.decoded.email === email) {
      const result = await blogModel.deleteOne({ _id: blogId });
      res.status(201).json({
        success: true,
        message: "Blog information deleted from database!",
        data: result,
      });
    } else {
      res.status(401).json({
        success: true,
        message: "unauthorized access",
      });
    }
  } catch {
    res.status(500).json({
      success: false,
      message: "Error deleting donation information from database!",
    });
  }
};

module.exports = deleteCurrentBlogController;
