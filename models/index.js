const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.Promsie = Promise;
mongoose.connect(process.env.MONGODB_URI, {
    keepAlive:true
},
console.log("connected to db"))

module.exports.User = require("./user");