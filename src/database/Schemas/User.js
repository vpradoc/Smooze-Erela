const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  _id: { type: String },
  blacklist: {type: Boolean, default: false},
  coins: { type: Number, default: 0 },
  daily: { type: Number, default: 0 },
  gay: {type: String, default:'null'},
  Exp: {
    xp: {type: Number, default: 1},
    level: {type: Number, default: 1},
    nextLevel: {type: Number, default: 100},
  }
});

const User = mongoose.model("Users", userSchema);
module.exports = User;
