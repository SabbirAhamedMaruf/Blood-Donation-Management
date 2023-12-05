const router = require("express").Router();
const adminStatistics = require("../../api/admin/adminStatistics");
const fetchAllDonationController = require("../../api/admin/fetchAllDonationController");
const fetchUsersDataByPagination = require("../../api/admin/fetchUsersDataByPagination");
const getAllDonationDataForHook = require("../../api/admin/getAllDonationDataForHook");
const manageUserRoleController = require("../../api/admin/manageUserRoleController");
const manageUserStatusController = require("../../api/admin/manageUserStatusController");
const manageAllUser = require("../../api/admin/manageUsersController");
const verifyAdmin = require("../../middleware/verifyAdmin");
const verifyToken = require("../../middleware/verifytoken");

// Routes
// getting all statistics
router.get("/adminstatistics", verifyToken, verifyAdmin, adminStatistics);

// Manage All users
router.get("/user/allUsers", manageAllUser);

// fetch users data by pagination
router.get(
  "/fetch-users-by-paginations",
  verifyToken,
  verifyAdmin,
  fetchUsersDataByPagination
);

// manage user status from manage user page
router.patch(
  "/manage-user-status",
  verifyToken,
  verifyAdmin,
  manageUserStatusController
);

// manage user role from manager user page
router.patch(
    "/manage-user-role",
    verifyToken,
    verifyAdmin,
    manageUserRoleController
  );

router.get("/getalldonation",verifyToken,getAllDonationDataForHook)


// get all donation
router.get("/fetch-all-donation-pagiation",verifyToken,fetchAllDonationController)

module.exports = router;
