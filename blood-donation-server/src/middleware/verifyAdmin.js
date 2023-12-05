const userModel = require("../model/user/userModel");

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const query = { email: email };
  const user = await userModel.findOne(query);
  if (user.userType === "admin") {
    console.log("Is Admin",true)
    next();
  } else {
    console.log("Is Admin",false)
    return res.status(403).send({ message: "forbidden access" });
  }
};

module.exports = verifyAdmin;
