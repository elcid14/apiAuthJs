const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");



const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})



userSchema.pre("save", async function(next) {
    try {
      if (!this.isModified("password")) {
        return next();
      }
      let hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
      return next();
    } catch (err) {
      return next(err);
    }
  });

const User = mongoose.model("User", userSchema);


module.exports = User;

