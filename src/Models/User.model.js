const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  PhoneNumber: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
password: {
    type: String,
    required: true,
  },
role: {
    type: String,
    enum: ["User"],
    default: "User"
  }
},
{
    timestamps: true
});
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
