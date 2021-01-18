const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
  title: String,
  month: String,
  year: String,
  day: String,
  content: Mixed,
  lastModDate: Date,
  tags: Array,
  colorMood: String,
  heartRateData: Array,
  samplingRate: Number,

});

// compile model from schema
module.exports = mongoose.model("entry", EntrySchema);
