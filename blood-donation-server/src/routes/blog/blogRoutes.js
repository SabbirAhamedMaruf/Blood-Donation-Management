const addMyBlogController = require("../../api/blog/addMyBlogController");
const deleteCurrentBlogController = require("../../api/blog/deleteCurrentBlogController");
const getAllFeaturedBlogs = require("../../api/blog/getAllFeaturedBlogs");
const getBlogsData = require("../../api/blog/getBlogsData");
const getSingleBlogData = require("../../api/blog/getSingleBlogData");
const makeBlogFeatured = require("../../api/blog/makeBlogFeatured");
const publicBlogsController = require("../../api/blog/publicBlogsController");
const updateMyBlogsStatus = require("../../api/blog/updateMyBlogsStatus");
const verifyAdmin = require("../../middleware/verifyAdmin");
const verifyToken = require("../../middleware/verifytoken");
const router = require("express").Router();

// save blog data
router.post("/add-my-blog",verifyToken, addMyBlogController);

// get blog data 
router.get("/get-blog-data",getBlogsData);
// get blogs for public
router.get("/get-blog-data-public",publicBlogsController);
// get single blog data
router.get("/get-blog-data-public/:id",getSingleBlogData)

// modified blog status
router.patch("/update-blog-status",verifyToken,verifyAdmin,updateMyBlogsStatus);

// make blog featured
router.patch("/make-blog-featured",verifyToken,verifyAdmin,makeBlogFeatured)

// get featured blogs
router.get("/get-all-featured-blogs",getAllFeaturedBlogs)

// delete current blog
router.delete("/delete-current-blog",verifyToken,verifyAdmin,deleteCurrentBlogController)

module.exports = router;