const mongoose = require('mongoose');

const EntetySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
}, { collection: 'Highlights' });

module.exports = mongoose.model('Highlights', EntetySchema);

