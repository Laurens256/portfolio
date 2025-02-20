const pluralize = (count: number, word: string, includeCount = true) => {
	if (count === 1) {
		return includeCount ? `${count} ${word}` : word;
	}

	const wordPlural = `${word}${count === 1 ? '' : 's'}`;
	return includeCount ? `${count} ${wordPlural}` : wordPlural;
};

export default {
	pluralize,
};
