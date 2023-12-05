const districtsController = require("../../api/location/districtsController");
const router = require("express").Router();
router.get("/districts", districtsController);
module.exports = router;
