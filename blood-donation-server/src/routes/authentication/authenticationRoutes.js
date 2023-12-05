const authenticationControllerJwt = require("../../api/authentication/authenticationControllerJwt");

const router = require("express").Router();
router.post("/jwt",authenticationControllerJwt)

module.exports = router;