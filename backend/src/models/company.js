// models/Company.js
const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  roles: [{ type: String, required: true }],  // Array of roles available for each company
});

module.exports = mongoose.model('Company', CompanySchema);
