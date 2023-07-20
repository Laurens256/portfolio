import sharp from 'sharp';
import fs from 'fs';

const generateStaticImage = async (path: string) => {
	try {
		const filename = path.split('/').pop()?.replace('animated-', 'static-');
		const outputPath = 'public/assets/generated-img/';

		if (!fs.existsSync(outputPath)) {
			fs.mkdirSync(outputPath, { recursive: true });
		}

		await sharp(path)
			.jpeg({ quality: 100 })
			.webp({ quality: 100, force: false, lossless: true, effort: 6 })
			.toFile(outputPath + filename);

		console.log('Generated static image:', filename);
		return `/assets/generated-img/${filename}`;
	} catch (err) {
		console.error('Error generating static image:', err);
		return null;
	}
};

export default generateStaticImage;
