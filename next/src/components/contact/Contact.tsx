import styles from './contact.module.css';

import { FormEvent } from 'react';

const validateForm = (e: FormEvent<HTMLFormElement>) => {
	return;
	e.preventDefault();

	const form = e.currentTarget;
	const formData = new FormData(form);

	const formInputs: NodeListOf<HTMLInputElement | HTMLTextAreaElement> =
		form.querySelectorAll('form input, form textarea');
	const formFieldNames = Array.from(formInputs).map((field) => field.name);

	formFieldNames.forEach((fieldName) => {
		const value = formData.get(fieldName);
		const label = document.querySelector(`label[for="${fieldName}"]`);

		label?.classList.toggle(styles.error, !value);
	});

	const formIsValid = form.checkValidity();
	
	if (formIsValid) {
		sendForm(formData);
	}
};

const sendForm = async (formData: FormData) => {
	try {
		const response = await fetch('/api/contact', {
			method: 'POST',
			headers: {
				Accept: 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		});

		console.log('Response received');
		if (response.status === 200) {
			console.log('Response succeeded!');
		}
	} catch (error) {
		console.error('An error occurred:', error);
	}
};

export default function Contact() {
	return (
		<section className={styles.contact}>
			<h2 id="contact">Contact</h2>

			<form action="https://submit-form.com/Z2XMPegq" method='POST' onSubmit={validateForm} noValidate>
				<section>
					<div>
						<label htmlFor="name">
							Naam <span>*Naam is vereist</span>
						</label>
						<input type="text" name="name" id="name" placeholder="Naam" required />
					</div>

					<div>
						<label htmlFor="email">
							E-mailadres <span>*Email is vereist</span>
						</label>
						<input
							type="email"
							name="email"
							id="email"
							inputMode="email"
							placeholder="E-mail"
							required
						/>
					</div>
				</section>

				<div>
					<label htmlFor="message">
						Bericht <span>*Vul een bericht in</span>
					</label>
					<textarea name="message" id="message" placeholder="Bericht" required></textarea>
				</div>

				<button type="submit">Verstuur</button>
			</form>
		</section>
	);
}
