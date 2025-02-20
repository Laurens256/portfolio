import type { EntryGenerator } from './$types';
import { projectApi } from '$resources/project';

export const entries: EntryGenerator = async() => {
	const projects = await projectApi.listProjects();
	const slugs = projects.map(({ metadata: { slug } }) => ({ slug }));

	return slugs;
};
