const blogModel = require("../../model/blog/blogModel");

const makeBlogFeatured = async (req, res) => {
  const email = req.query.email;
  const blogId = req.query.blogId;
  const status = req.query.status;

  try {
    if (req.decoded.email === email) {
      const result = await blogModel.updateOne(
        { _id: blogId },
        {
          $set: {
            featured: status,
          },
        }
      );
      res.status(201).json({
        success: true,
        message: "blog updated inside database!",
        data: result,
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
      message: "Error updating blogs data inside database!",
    });
  }
};

module.exports = makeBlogFeatured;
