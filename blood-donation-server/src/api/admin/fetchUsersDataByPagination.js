const userModel = require("../../model/user/userModel");
const fetchUsersDataByPagination = async (req, res) => {
  const currentPage = parseInt(req.query.currentpage);
  const catagory = req.query.catagory;
  const email = req.query.email;
  console.log(currentPage);
  console.log(catagory);
  console.log(email);
  try {
    if (req.decoded.email === email) {
      const result = await userModel
        .find({ status: catagory })
        .sort({ _id: -1 })
        .skip(currentPage * 3)
        .limit(3);

      res.status(201).json({
        success: true,
        message: "donation data fetched successfully!",
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
      message: "Error fetching users data from database!",
    });
  }
};
module.exports = fetchUsersDataByPagination;
