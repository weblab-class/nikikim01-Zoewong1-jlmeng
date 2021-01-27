const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
  user_id: Object,
  title: String,
  month: String,
  year: String,
  day: String,
  content: String,
  jsonContent: mongoose.Schema.Types.Mixed,
  lastModDate: Date,
  tags: Array,
  colorMood: String,
  heartRateData: Array,
  timeHRData: Array,
  avgHR: Number,
  imageName: String,
});

// compile model from schema
module.exports = mongoose.model("entry", EntrySchema);
