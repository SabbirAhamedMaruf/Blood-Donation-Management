const confrimdonationController = require("../../api/donation/confrimdonationController");
const deleteDonationDataController = require("../../api/donation/deleteDonationDataController");
const donateBloodController = require("../../api/donation/donateBloodController");
const donationEntryController = require("../../api/donation/donationController");
const donationRequestPageController = require("../../api/donation/donationRequestPageController");

const paginationFetch = require("../../api/donation/fetchDonationDataByPagination");

const fetchDonorDonationController = require("../../api/donation/fetchDonorDonationController");
const getSingleDonationDataController = require("../../api/donation/getSingleDonationDataController");
const mydonationrequest = require("../../api/donation/mydonationrequest");
const updateDonationDataController = require("../../api/donation/updateDonationDataController");
const verifyToken = require("../../middleware/verifytoken");
const router = require("express").Router();

router.post("/createdonationrequests", verifyToken, donationEntryController);

router.get("/fetchdonordonation", verifyToken, fetchDonorDonationController);

router.get(
  "/getsingledonationdata",
  verifyToken,
  getSingleDonationDataController
);

router.patch(
  "/updatedonationrequestsdata",
  verifyToken,
  updateDonationDataController
);

router.delete(
  "/deletedonationrequestsdata",
  verifyToken,
  deleteDonationDataController
);

router.patch("/donateblood", verifyToken, donateBloodController);

router.patch("/confrimdonation", verifyToken, confrimdonationController);

router.get("/mydonationrequest", verifyToken, mydonationrequest);

router.get("/fetchdatabypagination", verifyToken, paginationFetch);

// DonationRequest Page
router.get("/donationRequest", donationRequestPageController);
module.exports = router;
