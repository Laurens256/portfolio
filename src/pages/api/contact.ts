import nodemailer from 'nodemailer';

import { NextApiRequest, NextApiResponse } from 'next';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.GMAIL_ACCOUNT,
		pass: process.env.GOOGLE_APP_PASS
	}
});

const requiredFields = ['name', 'email', 'message'];
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.redirect(308, '/#contact');
	}

	const { name, email, message } = req.body;

	const missingFields = requiredFields.filter((field) => !req.body[field]);
	if (missingFields.length > 0) {
		return res.status(400).json({ error: `Missing form fields: ${missingFields.join(', ')}` });
	}

	try {
		await transporter.sendMail({
			from: `"${name}" <${process.env.GMAIL_ACCOUNT}>`,
			to: process.env.GMAIL_ACCOUNT,
			subject: `Portfolio submission by: ${name}`,
			html: `
			<div style="margin:0 auto;">
				<h2 style="margin:0 0 0.2rem 0;">Naam:</h2><p style="margin: 0 0 1rem 0">${name}</p>
				<h2 style="margin:0 0 0.2rem 0;">Email:</h2><p style="margin: 0 0 1rem 0">${email}</p>
				<h2 style="margin:0 0 0.2rem 0;">Bericht:</h2><p style="margin: 0 0 1rem 0">${message}</p>
			</div>
			`
		});

		return res.redirect(301, '/contact/success');
	} catch (error) {
		return res.redirect(301, '/contact/error');
	}
}
