import styles from './contact.module.css';

import { FormEvent } from 'react';
import { betterLinkScroll } from '@/components/header/Header';

const validateForm = (e: FormEvent<HTMLFormElement>) => {
	e.preventDefault();

	const form = e.currentTarget;

	updateForm(form);

	const formIsValid = form.checkValidity();
	if (formIsValid) {
		form.classList.add(styles.loading);
		form.submit();
	}
};

const updateForm = (form: HTMLFormElement) => {
	const formData = new FormData(form);
	const formInputs: NodeListOf<HTMLInputElement | HTMLTextAreaElement> =
		form.querySelectorAll('form input, form textarea');
	const formFieldNames = Array.from(formInputs).map((field) => field.name);

	formFieldNames.forEach((fieldName, i) => {
		const value = formData.get(fieldName);
		const label = document.querySelector(`label[for="${fieldName}"]`);

		label?.classList.remove(styles.error);

		if (!value) {
			label?.classList.add(styles.error);
			if (label instanceof HTMLLabelElement) {
				formInputs[i].addEventListener('input', () => {
					label.classList.toggle(styles.error, !formInputs[i].value);
				});
			}
		}
	});
};

export default function Contact() {
	return (
		<section className={styles.contact}>
			<div>
				<h2 id="contact">Contact</h2>
				<p>
					Want to get in contact? Use this form or contact me through one of my{' '}
					<a onClick={betterLinkScroll} href="#socials">
						socials
					</a>
				</p>

				<form action="/api/contact" method="POST" onSubmit={validateForm} noValidate>
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
						<textarea
							name="message"
							id="message"
							placeholder="Message"
							required></textarea>
					</div>

					<button type="submit">Send</button>
				</form>
			</div>
		</section>
	);
}
