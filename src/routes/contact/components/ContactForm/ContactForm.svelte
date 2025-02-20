<script lang="ts">
	import { page } from '$app/state';
	import { PUBLIC_WEB3_FORMS_KEY } from '$env/static/public';
	import type { HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements';
	import validateFormData, { type FormFields } from './validateFormData';
	import { jsEnabledStore } from '$stores';
	import { stringUtil } from '$util';

	let formErrors = $state<Partial<FormFields>>({});
	let amountOfFormErrors = $derived(Object.keys(formErrors).length);

	type InputProps = {
		label: string;
		id: keyof FormFields;
	} & (({
		asTextarea: true;
	} & HTMLTextareaAttributes) | ({
		asTextarea?: false;
	} & HTMLInputAttributes));

	const handleValidateField = (e: FocusEvent & {
		currentTarget: EventTarget & (HTMLInputElement | HTMLTextAreaElement);
	}) => {
		const value = e.currentTarget.value;

		if (value) {
			const fieldName = e.currentTarget.name as keyof FormFields;
			formErrors[fieldName] = validateFormData({ [fieldName]: value }).errors[fieldName];
		}
	};

	const handleFormSubmit = async (e: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement; }) => {
		const formData = new FormData(e.currentTarget);
		const { isValid, errors } = validateFormData(Object.fromEntries(formData));

		formErrors = errors;

		if (!isValid) {
			e.preventDefault();
		}
	};
</script>

{#snippet input({ label, id, asTextarea, ...rest }: InputProps)}
	{@const error = formErrors[id]}
	{@const inputProps: HTMLTextareaAttributes | HTMLInputAttributes = {
		name: id,
		id,
		class: 'input',
		'aria-invalid': !!error,
		'aria-describedby': `${id}-err`,
		[error ? 'oninput' : 'onblur']: handleValidateField,
		...rest,
	}}
	<div class="inputContainer">
		<label for={id}>{label}</label>
		{#if error}
			<span class="inputError" id="{id}-err">{error}</span>
		{/if}

		{#if asTextarea}
			<textarea {...inputProps as HTMLTextareaAttributes}></textarea>
		{:else}
			<input {...inputProps as HTMLInputAttributes}>
		{/if}
	</div>
{/snippet}

<form
	action="https://api.web3forms.com/submit"
	method="POST"
	class="root"
	onsubmit={handleFormSubmit}
	novalidate={jsEnabledStore.isEnabled}
>
	<input type="hidden" name="redirect" value="{page.url}/thanks">
	<input type="hidden" name="access_key" value={PUBLIC_WEB3_FORMS_KEY}>
	<input type="hidden" name="subject" value="Laurens Duin contact">
	<input type="hidden" name="from_name" value="Portfolio form">

	{#if amountOfFormErrors !== 0}
		<p aria-live="assertive" class="sr-only">
			Form was not submitted because it contains {stringUtil.pluralize(amountOfFormErrors, 'error')}
		</p>
	{/if}

	{@render input({
		label: 'Name',
		type: 'text',
		id: 'name',
		required: true,
	})}

	{@render input({
		label: 'Email',
		type: 'email',
		id: 'email',
		required: true,
	})}

	{@render input({
		label: 'Message',
		id: 'message',
		asTextarea: true,
		required: true,
		rows: 5,
	})}

	<input type="checkbox" name="botcheck" style="display:none;" defaultChecked={false}>

	<button type="submit" class="submitButton">Send</button>
</form>

<style>
	.root {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.inputContainer {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
		max-width: min(25rem, 100%);
	}
	.input {
		background-color: var(--input-bg);
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		border: 1px solid transparent;
		width: 100%;

		&textarea {
			resize: vertical;
			min-height: 2rem;
			field-sizing: content;
		}

		&:focus {
			outline: 2px solid var(--link);
		}

		&[aria-invalid="true"] {
			border-color: var(--error-highlight);
		}
	}
	.inputError {
		font-size: 0.9rem;
		color: var(--secondary-text);
	}

	.submitButton {
		width: fit-content;
		background-color: var(--secondary-bg);
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border: 2px solid transparent;
		transition: border-color 0.1s ease;

		&:hover, &:focus-visible {
			border-color: var(--link);
		}
	}
</style>
