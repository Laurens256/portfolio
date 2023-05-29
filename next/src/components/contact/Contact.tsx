import styles from './contact.module.css';

import { FormEvent } from 'react';

const validateForm = (e: FormEvent<HTMLFormElement>) => {
	e.preventDefault();

	const form = e.currentTarget;

	const formIsValid = form.checkValidity();

	if (formIsValid) {
		form.submit();
	}
	updateForm(form);
};

const updateForm = (form: HTMLFormElement) => {
	const formData = new FormData(form);
	const formInputs: NodeListOf<HTMLInputElement | HTMLTextAreaElement> =
		form.querySelectorAll('form input, form textarea');
	const formFieldNames = Array.from(formInputs).map((field) => field.name);

	formFieldNames.forEach((fieldName) => {
		const value = formData.get(fieldName);
		const label = document.querySelector(`label[for="${fieldName}"]`);

		label?.classList.toggle(styles.error, !value);
	});
};

export default function Contact() {
	return (
		<section className={styles.contact}>
			<h2 id="contact">Contact</h2>

			<form
				action="/api/contact"
				method="POST"
				onSubmit={validateForm}
				noValidate>
				<section>
					<div>
						<label htmlFor="name">
							Name <span>*Name is required</span>
						</label>
						<input type="text" name="name" id="name" placeholder="Name" required />
					</div>

					<div>
						<label htmlFor="email">
							E-mail <span>*Email is required</span>
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
						Message <span>*Please enter a message</span>
					</label>
					<textarea name="message" id="message" placeholder="Message" required></textarea>
				</div>

				<button type="submit">Verstuur</button>
			</form>
		</section>
	);
}
