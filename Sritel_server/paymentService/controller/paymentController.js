const Payment = require('../models/Payment');
const stripe = require('stripe')('sk_test_51O934qEl5EhYFgAyD66NQJFZB1ylROUeSjdLugkk7wk6wUfyBp8ZxVZs3ZvcHHSCEG52rUFHqEMAl3rlkq4xiDjP00ZJsS81kX');

// Process Payment
exports.processPayment = async (req, res) => {
    const { amount, id } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'lkr',
            payment_method: id,
            confirm: true,
        });

        if (paymentIntent.status === 'succeeded') {
            // Save payment to MongoDB
            const newPayment = new Payment({
                amount: amount,
                paymentId: paymentIntent.id,
                status: paymentIntent.status
            });

            await newPayment.save();

            res.status(200).json({ message: 'Payment successful', paymentIntent });
        } else {
            res.status(400).json({ message: 'Payment unsuccessful', paymentIntent });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Payment error', error: error.message });
    }
};
