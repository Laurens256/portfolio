import strapiFetch from '@/utils/fetchWithHeaders';
import styles from './project.module.css';

import type Project from '@/types/Project';

export default function Project({ project }: { project: Project }) {
	// const { title } = project.attributes;
	// const { url: imgUrl, alternativeText: imgAlt } = cover?.data?.attributes;

	const {
		short_title,
		long_title,
		slug,
		cover: {
			data: {
				attributes: { url: imgUrl, alternativeText: imgAlt }
			}
		}
	} = project.attributes;

	return (
		<main className={`${styles.project} ${styles[slug]}`}>
			<header>
				<h1>{long_title}</h1>
				<img src={imgUrl} alt={imgAlt} />
			</header>
		</main>
	);
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
	const slug = params.slug;

	const project = (await strapiFetch(`projects/${slug}?populate=deep`)).data;

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
