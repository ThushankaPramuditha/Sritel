const Package = require('../models/Package');
const UserPackage = require('../models/UserPackage');

// Add a new package
exports.addPackage = async (req, res) => {
    const { name, description, data, voice, sms, price, type } = req.body;

    try {
        const newPackage = new Package({
            name,
            description,
            type,
            data_limit: parseFloat(data),
            voice_limit: parseInt(voice),
            sms_limit: parseInt(sms),
            price: parseFloat(price)
        });

        await newPackage.save();
        res.status(200).send('Package added successfully');
    } catch (error) {
        res.status(500).send('Error adding package: ' + error.message);
    }
};

// Get all packages
exports.getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find({});
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).send('Error fetching packages: ' + error.message);
    }
};

// Activate a package for a user
exports.activatePackage = async (req, res) => {
    const { user, id } = req.body;

    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(futureDate.getDate() + 30); // Expiration date 30 days from now

    try {
        const newUserPackage = new UserPackage({
            package_id: id,
            user_id: user,
            activated_date: currentDate,
            expiration_date: futureDate
        });

        await newUserPackage.save();
        res.status(200).send('Package activated successfully');
    } catch (error) {
        res.status(500).send('Error activating package: ' + error.message);
    }
};
