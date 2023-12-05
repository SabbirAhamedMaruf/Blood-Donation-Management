const jwt = require("jsonwebtoken");
require('dotenv').config();
const createTokenjwt =(useremail)=>{
    const token = jwt.sign({email:useremail},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'});
    return token;
}

module.exports = createTokenjwt