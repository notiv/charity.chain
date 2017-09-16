const mongoose = require('mongoose');

const EntetySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  geoLocation: {
    lng: { type: Number, required: true },
    lat: { type: Number, required: true },
  },
  address: { type: String, required: true, unique: true, index: true },
  type: { type: String, enum: ['donor', 'charity', 'recipient'] },
}, { collection: 'Entities' });

module.exports = mongoose.model('Entety', EntetySchema);

