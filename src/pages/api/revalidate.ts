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
	if (req.query.secret !== revalidateToken) {
		return res.status(401).json({ message: 'Invalid token' });
	}

	const { paths, error } = await getPathsToRevalidate();

	if (error) {
		return res.status(error.code).json({ message: error.message });
	}

	try {
		await Promise.all(paths.map((path) => res.revalidate(path)));

		return res.status(200).json({ revalidated: true });
	} catch (err) {
		console.error(err);
		return res.status(500).send(`Error revalidating: ${err}`);
	}
}

const getPathsToRevalidate = async () => {
	const { mdxFiles, error } = await getChangedMdxFiles();
  
	// use set so we dont have to worry about duplicates
	const pathsSet: Set<string> = new Set();
  
	mdxFiles.forEach((file) => {
	  const url = file.filename.split('mdx/')[1].replace('.mdx', '');
  
	  // if file is in root mdx folder, revalidate index page
	  // if file is in any subfolder, revalidate that page
	  pathsSet.add(url.includes('/') ? `/${url}` : '/');
	});
  
	const indexRevalidate = mdxFiles.some(
	  (file) =>
		['added', 'removed', 'renamed'].includes(file.status) &&
		file.filename.includes('mdx/projects')
	);
	if (indexRevalidate) {
	  pathsSet.add('/');
	}
  
	const paths = Array.from(pathsSet);
  
	return { paths, error };
  };

const getChangedMdxFiles = async () => {
	let mdxFiles: File[] = [];
	let error: { code: number; message: string } | null = null;

	try {
		const latestCommit: Commit = await (
			await fetch('https://api.github.com/repos/Laurens256/portfolio/commits/main')
		).json();

		const changedFiles: File[] = latestCommit.files;
		mdxFiles = changedFiles.filter((file) => file.filename.endsWith('.mdx') && file.filename.includes('mdx/'));

		// if changes are made to any file other than mdx files, entire site will be rebuilt
		const alreadyBuilt = mdxFiles.some((file) => !file.filename.endsWith('.mdx'));

		if (mdxFiles.length === 0) {
			error = { code: 200, message: 'No changes to mdx files' };
		} else if (alreadyBuilt) {
			error = { code: 200, message: 'Changes already built' };
		}
	} catch (err) {
		console.error(err);
		error = { code: 500, message: 'Error fetching latest commit' };
	}

	return { mdxFiles, error };
};
