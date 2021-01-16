const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
  title: String,
  dateMade: Date,
  content: Mixed,
  lastModDate: Date,
  tags: Array,
  colorMood: String,
  heartRateData: Array,
  samplingRate: Number,

});

// compile model from schema
module.exports = mongoose.model("entry", EntrySchema);
