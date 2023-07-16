import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import sizeOf from 'image-size';

const markdownToHtml = async (markdown: string) => {
	const HTMLString = String(
		await unified()
			.use(remarkParse)
			.use(remarkRehype)
			.use(rehypeStringify)
			.process(markdown)
	);

	const modifiedHTMLString = setImgAspectRatio(setAnchorBlank(findVideo(HTMLString)));
	return modifiedHTMLString;
};

// find any anchor tags and set them to open in a new tab
const setAnchorBlank = (markdown: string) => {
	const regex = /<a.*?href="(.+?)".*?>(.*?)<\/a>/g;
	const subst = '<a target="_blank" href="$1">$2</a>';

	return markdown.replace(regex, (match, url, text) => {
		const anchorElement = subst.replace('$1', url).replace('$2', text);

		if (!(url.includes('laurensduin') || url.includes('localhost'))) {
			return anchorElement;
		}
		return match;
	});
};

// find any video extensions that are inside an img tag (dumb markdown parser) and replaces them with a video tag
const videoExt = new Set(['mp4', 'webm', 'ogg', 'avi', 'flv', 'mov']);
const findVideo = (markdown: string) => {
	const regex = /<img.*?src="(.+?)".*?>/g;
	const subst = '<video src="$1" controls></video>';

	return markdown.replace(regex, (match, url) => {
		const extension = url.split('.').pop();
		if (videoExt.has(extension)) {
			return match.replace(regex, subst);
		}
		return match;
	});
};

// find any img tags and set their aspect ratio, prevents layout shift
const setImgAspectRatio = (htmlString: string) => {
	const regex = /<img.*?src="(.+?)".*?>/g;
	const subst = (url: string, aspectRatio: number) =>
		`<img src="${url}" style="aspect-ratio: ${aspectRatio};">`;

	return htmlString.replace(regex, (match, url) => {
		const dimensions = getImgDimensions(`public/${url}`);

		if (dimensions && dimensions.width && dimensions.height) {
			const aspectRatio = dimensions.width / dimensions.height;
			const replacedSubst = subst(url, aspectRatio);
			return match.replace(regex, replacedSubst);
		}
		return match;
	});
};

// only works server side
const getImgDimensions = (filePath: string) => {
	try {
		const dimensions = sizeOf(filePath);
		return dimensions;
	} catch (error) {
		return null;
	}
};

export { markdownToHtml };
