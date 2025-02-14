const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  gameId: String,
  gameStatus: String,
  player1: Array,
  player2: Array,
  randomArr: Array,
  winner: Array,
});

module.exports = mongoose.model("User", userSchema);
