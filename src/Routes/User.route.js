const express = require("express");
const user = require("../Controllers/User.controller");
const Router = express.Router();

Router.post("/createAnAccount", user.createAnAccount);
Router.post("/login", user.login);
module.exports = Router;

// exports.login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const emailExists = await User.findOne({ email });
//     if (emailExists == null) {
//       return res.status(404).json({
//         message: "Email does not exist, please sign up",
//       });
//     }

//     console.log(password);
//     console.log(emailExists.password);
//     const correctPassword = await bcrypt.compare(
//       password,
//       emailExists.password
//     );
//     if (!correctPassword) {
//       console.log(correctPassword);
//       return res.status(200).json({
//         message: "Login unsuccessful, password incorrect",
//       });
//     }
//     console.log(correctPassword);
//     return res.status(200).json({
//       message: "Login successfully",
//     });
//   } catch (error) {
//     return res.status(200).json({
//       message: error.message,
//     });
//   }
// };

