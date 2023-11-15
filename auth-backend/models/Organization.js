const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    role: String,
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;