const mongoose = require("mongoose");

const roles = ["admin", "buyer", "seller", "user"];

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },

  password: {
    type: String,
    required: true,
    minlength: 8
  },

  confirmPassword: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: function () {
        return this.password === this.confirmPassword;
      },
      message: "Passwords do not match"
    }
  },

  createdAt: { type: Date, default: Date.now },

  role: { type: String, default: "user" }
});

// remove confirmPassword before saving to DB
userSchema.pre("save", function (next) {
  this.confirmPassword = undefined;
  next();
});

// validate role
userSchema.pre("save", function (next) {
  if (!roles.includes(this.role)) {
    return next(new Error("role is invalid"));
  }
  next();
});

// hide sensitive fields on find queries
userSchema.pre("findOne", function (next) {
  this.select("-password -confirmPassword -__v");
  next();
});

const UserModel = mongoose.model("UserModel", userSchema);
module.exports = UserModel;
