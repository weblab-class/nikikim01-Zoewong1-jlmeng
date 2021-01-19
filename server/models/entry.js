const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
  user_id: String,
  journal: String,
  title: String,
  month: String,
  year: String,
  day: String,
  content: String,
  lastModDate: Date,
  tags: Array,
  colorMood: String,
  heartRateData: Array,
  samplingRate: Number,
});

// compile model from schema
module.exports = mongoose.model("entry", EntrySchema);
