const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
   
  },
  phoneNumber:{
    type:String
 },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
   },
  // confirmPassword: {
  //   type: String,
  //   required: [true, "ConfirmPassword is Required"],
  // }
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  // this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt);

  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

module.exports = mongoose.model("User", userSchema);
