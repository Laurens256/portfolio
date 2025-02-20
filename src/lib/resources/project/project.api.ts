import type { SvxProjectFull, SvxProjectMeta } from '$types';
export * as projectApi from './project.api';

type GetProjectsProps = Partial<{
	limit: number;
	offset: number;
	sorting: (metaA: SvxProjectMeta, metaB: SvxProjectMeta) => number;
	filter: (meta: SvxProjectMeta) => any;
}>;

const listProjects = async (options: GetProjectsProps = {}) => {
	const files = import.meta.glob<SvxProjectFull>('$svx/projects/*.svx');

	let response = await Promise.all(Object.values(files).map(async(file) => await file()));

	const { sorting, filter, limit, offset = 0 } = options;

	response = response.filter(({ metadata }) => {
		const { published } = metadata;

		if (filter) {
			return published && filter(metadata);
		}

		return published;
	});

	if (sorting) {
		response = response.toSorted((a, b) => sorting(a.metadata, b.metadata));
	}

	if (limit) {
		response = response.slice(offset, offset + limit);
	}

	return response;
};

const getProject = async (slug: string) => {
	const project: SvxProjectFull = await import(`$svx/projects/${slug}.svx`);

	if (!project.metadata.published) {
		throw new Error('Project not found');
	}

	return project;
};

export {
	listProjects,
	getProject,
};
