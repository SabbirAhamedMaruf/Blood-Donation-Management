const volunteerStatistics = require("../../api/volunteer/volunteerStatistics");
const verifyToken = require("../../middleware/verifytoken");
const router = require("express").Router();

// getting all statistics
router.get("/volunteertatistics", verifyToken, volunteerStatistics);
module.exports = router;