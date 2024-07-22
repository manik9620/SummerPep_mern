const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: String,
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: ["Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: ["Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.verifyPassword = (password, hashpassword) => {
  return bcrypt.compare(password, hashpassword);
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedpassword = await bcrypt.hash(this.password, 12);
    this.password = hashedpassword;
    next();
  } else {
    next();
  }
});

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
