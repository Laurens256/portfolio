import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { projectApi } from '$resources/project';

export const load: PageLoad = async () => {
	try {
		const projects = await projectApi.listProjects({
			sorting: (aMeta, bMeta) => aMeta.rank - bMeta.rank,
		});
		const projectsMeta = projects.map(({ metadata }) => metadata);

		return { projectsMeta };
	} catch {
		error(500);
	}
};
