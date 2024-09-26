var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	auth: {
		// : 'sritelcommunications@gmail.com',
		// pass: 'rbyyouxkygpabtlw',
		user:'pawfectcarelk@gmail.com',
		pass: 'zdzf kfpa mfqb tktp',
	},
	tls: {
		rejectUnauthorized: false,
	},
	secure: false,
});
async function SendMail(otp, password, email) {
	return new Promise((resolve, reject) => {
		if (otp) {
			var mailOptions = {
				from: "pawfectcarelk@gmail.com",
				to: email,
				subject: "Verify your email",
				text: `Your OTP is ${otp} Account created successfully Your Password is "${password}"`,
			};
		}
		else {
			var mailOptions = {
                from: "pawfectcarelk@gmail.com",
                to: email,
                subject: "Verify your email",
                text: `Account created successfully Your Password is "${password}"`,
            };
		}
		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				resolve('error');
			} else {
				resolve('emailsent');
			}
		});
	});
}
module.exports = {SendMail};
