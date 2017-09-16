const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema({
  abi: { type: mongoose.Schema.Types.Mixed, required: true, unique: false },
  address: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true, unique: true },
}, { collection: 'Contracts' });

module.exports = mongoose.model('Contract', ContractSchema);

