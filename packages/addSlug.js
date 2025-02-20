function addSlugFrontmatter() {
	return function transformer(tree, file) {
		const { filename } = file;
		const slug = filename.split('/').pop().split('.').shift();

		file.data.fm = { ...file.data.fm, slug };
	};
}

export default addSlugFrontmatter;
