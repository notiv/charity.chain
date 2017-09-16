const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  headline: { type: String, required: false },
  timestamp: { type: Date, required: false },
  charity: { type: String, required: false },
  cause: { type: String, required: false },
  geography: { type: String, required: false },
  text: { type: String, required: false },
}, { collection: 'Data' });

module.exports = mongoose.model('Data', DataSchema);

