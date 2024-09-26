const mongoose = require('mongoose');

const UserPackageSchema = new mongoose.Schema({
    package_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming there is a User model
    activated_date: { type: Date, required: true },
    expiration_date: { type: Date, required: true }
});

module.exports = mongoose.model('UserPackage', UserPackageSchema);
