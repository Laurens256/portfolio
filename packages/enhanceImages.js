import { visit } from 'unist-util-visit';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';

// ! if ever preprocessing images outside of project page, should add dynamic width
const MAX_WIDTH_PX = 1200; // based on 800px page width

const EXCLUDED_FORMATS = ['svg'];

const GENERATE_OPTIONS = {
	avif: {
		quality: 85,
		chromaSubsampling: '4:4:4',
	},
	webp: {
		quality: 85,
	},
	jpeg: {
		quality: 85,
		progressive: true,
	},
};

const generateImage = async ({ imagePath, format, options, outputPath, lossless }) => {
	let processor = sharp(imagePath)
		.resize({
			width: MAX_WIDTH_PX,
			withoutEnlargement: true,
		});

	switch (format) {
	case 'avif':
		processor = processor.avif({ ...options, lossless });
		break;
	case 'webp':
		processor = processor.webp({ ...options, lossless });
		break;
	case 'jpeg':
		processor = processor.jpeg(options);
		break;
	default:
		throw new Error(`Unsupported format: ${format}`);
	}

	await processor.toFile(outputPath);
};

const enhanceImages = () => {
	return async (tree) => {
		const staticPath = path.join(process.cwd(), 'static');
		const absoluteGeneratedPath = path.join(staticPath, 'generated');

		if (!fs.existsSync(absoluteGeneratedPath)) {
			fs.mkdirSync(absoluteGeneratedPath);
		}

		const promises = [];

		visit(tree, 'image', (node) => {
			const [url, paramsString] = node.url.split('?');
			const isInternal = url.startsWith('/');

			if (!isInternal) {
				return false;
			}

			const promise = (async () => {
				try {
					const filename = path.parse(url).name;
					const absoluteImagePath = path.join(staticPath, url);
					const metadata = await sharp(absoluteImagePath).metadata();
					const withFallback = !EXCLUDED_FORMATS.includes(metadata.format.toLowerCase());

					const sourcePaths = {};

					if (withFallback) {
						for (const [format, options] of Object.entries(GENERATE_OPTIONS)) {
							const generatedPath = path.join('/', 'generated', `${filename}.${format}`);
							const publicGeneratedPath = path.join('static', generatedPath);

							const fileExists = fs.existsSync(publicGeneratedPath);

							if (fileExists) {
								sourcePaths[format] = generatedPath;
								continue;
							}

							await generateImage({
								imagePath: absoluteImagePath,
								format,
								options,
								outputPath: publicGeneratedPath,
								lossless: metadata.width < MAX_WIDTH_PX,
							});

							sourcePaths[format] = generatedPath;
						}
					}

					const paramsObject = Object.fromEntries(new URLSearchParams(paramsString));

					const { jpeg: jpegGeneratedPath, ...progressivePaths } = sourcePaths;

					const clampedWidth = Math.min(metadata.width, MAX_WIDTH_PX);
					const clampedHeight = Math.round((clampedWidth / metadata.width) * metadata.height);

					node.type = 'element';
					node.data = {
						hName: 'picture',
						hChildren: [
							...Object.entries(progressivePaths).map(([type, sourcePath]) => ({
								type: 'element',
								tagName: 'source',
								properties: {
									srcSet: sourcePath,
									type: `image/${type}`,
								},
								data: { hName: 'source' },
							})),
							{
								type: 'element',
								tagName: 'img',
								properties: {
									src: withFallback ? jpegGeneratedPath : url,
									alt: node.alt || '',
									width: clampedWidth,
									height: clampedHeight,
									loading: 'lazy',
									decoding: 'async',
									...paramsObject,
								},
								data: { hName: 'source' },
							},
						],
					};
				} catch (error) {
					console.warn(`Could not process image: ${url}`, error);
				}
			})();

			promises.push(promise);
		});

		await Promise.all(promises);
	};
};

export default enhanceImages;
