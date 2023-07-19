import { NextApiRequest, NextApiResponse } from 'next';

interface Commit {
	files: File[];
}

interface File {
	sha: string;
	filename: string;
	status: string;
}

const revalidateToken = process.env.REVALIDATE_TOKEN;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// if (req.method !== 'POST') {
	// 	return res.status(405).json({ message: `Method not allowed, allowed method: POST. Your method: ${req.method}` });
	// }
	// Check for secret to confirm this is a valid request
	if (req.query.secret !== revalidateToken) {
		return res
			.status(401)
			.json({ message: 'Invalid token', req: req, token: revalidateToken });
	}

	const { mdxFiles, error } = await getChangedMdxFiles();

	if (error) {
		return res.status(error.code).json({ message: error.message });
	}

	try {
		// Collect all the paths to revalidate in an array
		const revalidatePaths = mdxFiles.map((file) => {
			const url = file.filename.split('mdx/')[1].replace('.mdx', '');
			// if file is in root mdx folder, revalidate index page
			// if file is in any subfolder, revalidate that page
			return url.includes('/') ? `/${url}` : '/';
		});

		await Promise.all(revalidatePaths.map((path) => res.revalidate(path)));

		return res.status(200).json({ revalidated: true });
	} catch (err) {
		console.error(err);
		return res.status(500).send(`Error revalidating: ${err}`);
	}
}

const getChangedMdxFiles = async () => {
	let mdxFiles: File[] = [];
	let error: { code: number; message: string } | null = null;

	try {
		const latestCommit: Commit = await (
			await fetch('https://api.github.com/repos/Laurens256/portfolio/commits/main')
		).json();

		const changedFiles: File[] = latestCommit.files;
		mdxFiles = changedFiles.filter((file: any) => file.filename.endsWith('.mdx'));

		if (mdxFiles.length === 0) {
			error = { code: 200, message: 'No changes to mdx files' };
		}
	} catch (err) {
		console.error(err);
		error = { code: 500, message: 'Error fetching latest commit' };
	}

	return { mdxFiles, error };
};
