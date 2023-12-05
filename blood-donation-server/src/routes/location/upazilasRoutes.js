const upazilasController = require("../../api/location/upazilasController");
const router = require("express").Router();
router.post("/upazilas", upazilasController);
module.exports = router;
