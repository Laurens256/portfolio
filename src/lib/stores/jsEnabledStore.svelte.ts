let isEnabled = $state(false);

export default {
	get isEnabled () {
		return isEnabled;
	},
	set isEnabled(newIsEnabled) {
		isEnabled = newIsEnabled;
	},
};
