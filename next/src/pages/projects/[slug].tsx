import strapiFetch from '@/utils/fetchWithHeaders';

import Head from 'next/head';

import styles from './project.module.css';

import type IProject from '@/types/Project';

import { markdownToHtml } from '@/utils/markdownToHtml';

export default function Project({ project }: { project: IProject }) {
	const {
		short_title,
		long_title,
		slug,
		roles,
		case_description,
		story,
		quicklinks,
		meta_description
	} = project.attributes;
	
	const imgUrl = project.attributes.cover.data?.attributes.url;
	const imgAlt = project.attributes.cover.data?.attributes.alternativeText;

	const title = `${short_title} | Laurens Duin`;
	
	return (
		<>
			<Head>
				<title key="title">{title}</title>
				<meta key="og-title" name="og:title" content={`${short_title} | Laurens Duin`} />
				<meta name="description" content={meta_description || ''} />
				<meta name="og:description" content={meta_description || ''} />
			</Head>

			<nav className={styles.nav}>
				<a className="underline" href="/#projects">
					Back
				</a>
			</nav>
			<main className={`${styles.project} ${styles[slug]}`}>
				<header>
					<div>
						<h1>{long_title}</h1>
						{/* weird glitch but somehow the question mark makes animated webp videos play in firefox */}
						<img src={`${imgUrl}?`} alt={imgAlt} />
					</div>

					<section>
						<div className={styles.case}>
							<h2>Case</h2>
							<p>{case_description}</p>
						</div>

						{roles && roles.length > 0 && (
							<div className={styles.role}>
								<h2>My role</h2>
								<ul>
									{roles.map((role, i) => (
										<li key={i}>{role}</li>
									))}
								</ul>
							</div>
						)}

						{quicklinks && (
							<div className={styles.quicklinks}>
								<h2>Quick links</h2>
								<ul>
									{quicklinks.split('\n').map((quickLink, i) => (
										<li key={i}>
											<a href={quickLink.split(';')[1]} target="_blank">
												{quickLink.split(';')[0]}
											</a>
										</li>
									))}
								</ul>
							</div>
						)}
					</section>
				</header>

				<section
					className={styles.story}
					dangerouslySetInnerHTML={{
						__html: story
					}}></section>
			</main>
		</>
	);
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
	const slug = params.slug;

	const project: IProject = (
		await strapiFetch(`projects?filters[slug][$eq]=${slug}&populate=deep`)
	).data[0];
	// const project = (await strapiFetch(`projects/${slug}?populate=deep`)).data;
	project.attributes.story = await markdownToHtml(project.attributes.story);

	return {
		props: {
			project: project
		}
	};
}

export async function getStaticPaths() {
	const projects: IProject[] = (await strapiFetch('projects')).data;

	const paths = projects.map((project) => {
		return { params: { slug: project.attributes.slug } };
	});

	return {
		paths: paths,
		fallback: false
	};
}
