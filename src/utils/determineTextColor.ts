const hexToLuminance = (hexColor: string) => {
	hexColor = hexColor.replace('#', '');

	// Convert hex color to RGB
	const r = parseInt(hexColor.substring(0, 2), 16) / 255;
	const g = parseInt(hexColor.substring(2, 4), 16) / 255;
	const b = parseInt(hexColor.substring(4, 6), 16) / 255;

	// Calculate relative luminance
	const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

	return luminance;
}

const getContrastColor = (hexColor: string) => {
	const blackLuminance = hexToLuminance('#000000');
	const whiteLuminance = hexToLuminance('#FFFFFF');

	console.log(blackLuminance, whiteLuminance);

	const inputLuminance = hexToLuminance(hexColor);

	// Calculate contrast difference with black and white
	const contrastWithBlack = (inputLuminance + 0.05) / (blackLuminance + 0.05);
	const contrastWithWhite = (inputLuminance + 0.05) / (whiteLuminance + 0.05);

	return contrastWithBlack >= contrastWithWhite ? '#000000' : '#ffffff';
}

export default getContrastColor;
