import { promisify } from 'util';
import { exec } from 'child_process';

const execPromisified = promisify(exec);

async function getMediaDimensions(mediaPath: string) {
	let dimensions = { width: 0, height: 0 };
	let error: any | null = null;

	try {
		const { stdout } = await execPromisified(
			`ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of json ${mediaPath}`
		);

		// Parse the JSON output
		const metadata = JSON.parse(stdout);

		// Extract the dimensions
		const { width, height } = metadata.streams[0];

		dimensions = { width: Number(width), height: Number(height) };
	} catch (err) {
		error = err;
	}

	return { dimensions, error };
}

export { getMediaDimensions };
