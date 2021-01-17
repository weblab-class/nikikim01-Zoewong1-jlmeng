const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema({
  title: String,
  entryID: String,
  startDate: Date,
  lastModDate: Date,

});

// compile model from schema
module.exports = mongoose.model("journal", JournalSchema);
