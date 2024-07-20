const mongoose = require("mongoose");
const bcrypt=require("bcrypt")

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: ["Email is required"],
    unique: true,
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  password: {
    type: String,
    required: ["Password is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.methods.verifyPassword=  (password,hashpassword)=>{
    return  bcrypt.compare(password,hashpassword);
}

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
