type FormFields = {
  name: string;
  email: string;
  message: string;
}

type ValidationResult = {
  isValid: boolean;
  errors: {
    [K in keyof FormFields]?: string;
  };
}

const validateFormData = (data: Partial<FormFields>): ValidationResult => {
	const errors: ValidationResult['errors'] = {};

	if ('name' in data && !data.name!.trim()) {
		errors.name = 'Please enter your name';
	}

	const emailRegex = /^\S+@\S+\.\S+$/;
	if ('email' in data && !emailRegex.test(data.email!.trim())) {
		errors.email = 'Please enter a valid email address';
	}

	if ('message' in data && !data.message!.trim()) {
		errors.message = 'Please enter a message';
	}

	const isValid = Object.keys(errors).length === 0;

	return {
		isValid,
		errors,
	};
};

export default validateFormData;
export type { FormFields };
