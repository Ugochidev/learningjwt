const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authorization = async (req, res, next) => {
  try {
    const authorizationArr = await req.headers.authorization.split(" ");

    console.log(authorizationArr);
    console.log(authorizationArr.includes("Bearer"));
    if(!authorizationArr.includes("Bearer")) {
      return res.status(404).json({
        message: "Bearer must be included",
      });
    }
    const token = authorizationArr[1];
    if(!token) {
      return res.status(401).json({
        message: "Token is required...",
      });
    }
    const decryptToken = await jwt.verify(token, process.env.jwt_token, {expiresIn: "1h"})
    req.user = decryptToken
    console.log(req.user.email);
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.isAdmin = async (req, res, next)=>{
    try {
        if(req.user.role !== "Admin"){
            return res.status(405).json({
                message: "Users cannot post goods"
            })
        }
    next();
    } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
    }
}
