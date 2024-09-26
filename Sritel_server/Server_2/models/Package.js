const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    data_limit: { type: Number, required: true },
    voice_limit: { type: Number, required: true },
    sms_limit: { type: Number, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('Package', PackageSchema);
