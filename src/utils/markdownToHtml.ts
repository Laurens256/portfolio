import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkPettyCode from 'rehype-pretty-code';

// @ts-ignore
import getMediaDimensions from 'get-media-dimensions';

const videoExt = new Set(['mp4', 'webm', 'ogg', 'avi', 'flv', 'mov']);

const markdownToHtml = async (markdown: string) => {
	const HTMLString = String(
		await unified()
			.use(remarkParse)
			.use(remarkRehype)
			.use(rehypeStringify)
			.use(remarkPettyCode, {
				theme: 'css-variables'
			})
			.process(markdown)
	);

	const modifiedHTMLString = findVideo(
		await setMediaAspectRatio(setAnchorBlank(HTMLString))
	);
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

// find any media tags and set their aspect ratio, prevents layout shifting
const setMediaAspectRatio = async (htmlString: string) => {
	const regex = /<img.*?src="(.+?)".*?>/g;
	// since videos are still in an img tag at this point, no need to check for video tags
	// videos get put in a video tag later on, see findVideo()
	const subst = (url: string, aspectRatio: string) => {
		return `<img src="${url}" style="aspect-ratio: ${aspectRatio};">`;
	};

	const modifiedString = await replaceAsync(htmlString, regex, async (match, url) => {
		const extension = url.split('.').pop();
		const format = videoExt.has(extension) ? 'video' : 'image';
		try {
			const dimensions = await getMediaDimensions(`public/${url}`, format);

			if (dimensions && dimensions.width && dimensions.height) {
				const aspectRatio = (dimensions.width / dimensions.height).toFixed(10);
				const replacedSubst = subst(url, aspectRatio);
				return match.replace(regex, replacedSubst);
			}
		} catch (error) {
			console.error(`Error while setting media aspect ratio: ${error}`);
		}

		return match;
	});
	return modifiedString;
};

// find any video extensions that are inside an img tag (dumb markdown parser) and replaces them with a video tag
const findVideo = (markdown: string) => {
	const regex = /<img([\w\W]*?)src="(.+?)"([\w\W]*?)>/g;
	const subst = '<video$1src="$2"$3 controls></video>';

	return markdown.replace(regex, (match, attributes, url, closingTag) => {
		const extension = url.split('.').pop();
		if (videoExt.has(extension)) {
			return match.replace(regex, subst);
		}
		return match;
	});
};

// source: https://stackoverflow.com/questions/33631041/javascript-async-await-in-replace/48032528#48032528
// because my ego is too big to use .then()
const replaceAsync = async (
	str: string,
	regex: RegExp,
	asyncFn: (match: any, ...args: any) => Promise<any>
) => {
	const matches = Array.from(str.matchAll(regex));
	const replacements = await Promise.all(
		matches.map(([match, ...args]) => asyncFn(match, ...args))
	);

	let i = 0;
	return str.replace(regex, () => replacements[i++]);
};

export { markdownToHtml };
