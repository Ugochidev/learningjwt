const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

exports.createAnAccount = async (req, res, next) => {
  try {
    const { firstName, lastName, age, email, password, PhoneNumber, role } =
      req.body;
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(401).json({
        message: "this email already exist, pls log in",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      age,
      email,
      password: hashPassword,
      PhoneNumber,
      role,
    });
    await newUser.save();
    return res.status(201).json({
      message: "account created successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailExists = await User.findOne({ email });
    if (emailExists == null) {
      return res.status(404).json({
        message: "Email does not exist, please sign up",
      });
    }
    const correctPassword = await bcrypt.compare(
      password,
      emailExists.password
    );
    if (!correctPassword) {
      return res.status(200).json({
        message: "Login unsuccessful, password incorrect",
      });
    }
    const data = {
      id: emailExists._id,
      email: emailExists.email,
      role: emailExists.role,
    };

    const secret_key = process.env.jwt_token;
    const token = await jwt.sign(data, secret_key, { expiresIn: "1h" });
    return res.status(200).json({
      message: "logged in successful",
      token,
    });
    // console.log(emailExist);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error caught",
    });
  }
};
