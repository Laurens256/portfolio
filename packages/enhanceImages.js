import { visit } from 'unist-util-visit';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';

const EXCLUDED_FORMATS = ['svg'];

const GENERATE_OPTIONS = {
	avif: {
		quality: 85,
		chromaSubsampling: '4:2:0',
	},
	webp: {
		quality: 85,
	},
	jpeg: {
		quality: 80,
		progressive: true,
	},
};

const generateImage = async ({ imagePath, format, options, outputPath }) => {
	let processor = sharp(imagePath);

	switch (format) {
	case 'avif':
		processor = processor.avif(options);
		break;
	case 'webp':
		processor = processor.webp(options);
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
			const [url, params] = node.url.split('?');
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
							if (format === metadata.format) {
								sourcePaths[format] = url;
								continue;
							}

							const generatedPath = path.join(
								'/',
								'generated',
								`${filename}.${format}`,
							);

							const publicGeneratedPath = path.join('static', generatedPath);

							await generateImage({
								imagePath: absoluteImagePath,
								format,
								options,
								outputPath: publicGeneratedPath,
							});

							sourcePaths[format] = generatedPath;
						}
					}

					const paramsHTMLAttributes = params
						? params.split('&').map((param) => {
							const [key, value] = param.split('=');
							return `${key}="${value}"`;
						}).join(' ')
						: '';

					const { jpeg: jpegGeneratedPath, ...progressivePaths } = sourcePaths;

					const sourceElements = Object.entries(progressivePaths)
						.map(([format, generatedPath]) => `<source type="image/${format}" srcset="${generatedPath}" >`);

					node.value = `
						<picture>
							${sourceElements.join('\n')}
							<img 
								src="${withFallback ? jpegGeneratedPath : url}" 
								alt="${node.alt || ''}" 
								width="${metadata.width}" 
								height="${metadata.height}" 
								loading="lazy" 
								decoding="async"
								${paramsHTMLAttributes}
							>
						</picture>`;
					node.type = 'html';
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
