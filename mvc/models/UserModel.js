const mongoose = require("mongoose");

const roles = ["admin", "buyer", "seller", "user"];
let userSchemaObject = {
    name: {
        type: String,
        required: [true, "name is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        require: true,
        minLength: [8, "password should be atleast 8 characters long"],
    },
    confirmPassword: {
        type: String,
        require: true,
        minLength: 8,
        validate: [function () {
            return this.password == this.confirmPassword;
        }, "password and confirm password should be same"]
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        default: "user"
    }
}

const userSchema = new mongoose.Schema(userSchemaObject);

// remove confirmPassword before saving to DB
userSchema.pre("save", function (next) {
  this.confirmPassword = undefined;
  next();
});

// // validate role
userSchema.pre("save", function (next) {
  if (!roles.includes(this.role)) {
    return next(new Error("role is invalid"));
  }
  return next()
});

// hide sensitive fields on find queries
userSchema.pre("findOne", function (next) {
  this.select("-password -confirmPassword -__v");
  // next();
});

const UserModel = mongoose.model("UserModel", userSchema);
module.exports = UserModel;
