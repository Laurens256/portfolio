import strapiFetch from '@/utils/fetchWithHeaders';

import type Project from '@/types/Project';

export default function Project({ project }: { project: Project }) {
	const {
		title,
		cover: {
			data: {
				attributes: { url: imgUrl, alternativeText: imgAlt }
			}
		}
	} = project.attributes;

	return (
		<>
			<h1>{title}</h1>
			<img src="" alt={imgAlt} />
		</>
	);
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
	const slug = params.slug;

	const project = (await strapiFetch(`projects?filters[slug][$eq]=${slug}&populate=deep`))
		.data[0];

	return {
		props: {
			project: project
		}
	};
}

export async function getStaticPaths() {
	const projects: Project[] = (await strapiFetch('projects')).data;

	const paths = projects.map((project) => {
		return { params: { slug: project.attributes.slug } };
	});

	return {
		paths: paths,
		fallback: false
	};
}
