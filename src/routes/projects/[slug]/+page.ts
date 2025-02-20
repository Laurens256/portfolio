import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { projectApi } from '$resources/project';

export const load: PageLoad = async ({ params: { slug } }) => {
	try {
		const project = await projectApi.getProject(slug);

		return {
			metadata: project.metadata,
			Content: project.default,
		};
	} catch (e) {
		console.log(e);
		error(404, 'Project not found');
	}
};
