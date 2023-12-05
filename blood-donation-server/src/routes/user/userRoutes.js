const allDonorsController = require("../../api/user/allDonorsController");
const searchDonorsController = require("../../api/user/searchDonorsController");
const userController = require("../../api/user/userController");
const userDashboardController = require("../../api/user/userDashboardController");
const userUpdateProfileController = require("../../api/user/userUpdateProfileController");
const verifyToken = require("../../middleware/verifytoken");
const router = require("express").Router();
// Setting user inside database
router.post("/users",userController);
router.get("/user/dashboard",userDashboardController);
//> update profile from dashboard
router.post("/user/updateProfile/:id",verifyToken,userUpdateProfileController);

// all donors
router.get("/all-donors-default",allDonorsController)

// search donors
router.post("/search-donors",searchDonorsController)



module.exports = router;

