const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  avgRBPM: Number,
  imageNames: [String],
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
