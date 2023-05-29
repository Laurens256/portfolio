import strapiFetch from '@/utils/fetchWithHeaders';

import Head from 'next/head';

import styles from './project.module.css';

import type IProject from '@/types/Project';

import ThemeSwitcher from '@/modules/themeSwitcher/ThemeSwitcher';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

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
	
	const imgUrl = project.attributes.cover?.data.attributes.url;
	const imgAlt = project.attributes.cover?.data.attributes.alternativeText;
	
	return (
		<>
			<Head>
				<title key="title">{short_title} | Laurens Duin</title>
				<meta key="og-title" name="og:title" content={`${short_title} | Laurens Duin`} />
				<meta name="description" content={meta_description || ''} />
				<meta name="og:description" content={meta_description || ''} />
			</Head>

			<nav className={styles.nav}>
				<a className="underline" href="/#projects">
					Terug
				</a>
				<ThemeSwitcher />
			</nav>
			<main className={`${styles.project} ${styles[slug]}`}>
				<header>
					<div>
						<h1>{long_title}</h1>
						<img src={imgUrl} alt={imgAlt} />
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
									{roles.map((role) => (
										<li key={role}>{role}</li>
									))}
								</ul>
							</div>
						)}

						{quicklinks && (
							<div className={styles.quicklinks}>
								<h2>Quick links</h2>
								<ul>
									{quicklinks.split('\n').map((quickLink) => (
										<li>
											<a className='underline' href={quickLink.split(';')[1]} target="_blank">
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

// convert markdown to html string
const generateHTML = async (markdown: string) => {
	const HTMLString = String(
		await unified()
			.use(remarkParse)
			.use(remarkRehype)
			.use(rehypeStringify)
			.process(markdown)
	);

	// find any <a> tags and add target="_blank" to them
	const regex = /<a/gi;
	const subst = '<a target="_blank"';

	return HTMLString.replace(regex, subst);
};

export async function getStaticProps({ params }: { params: { slug: string } }) {
	const slug = params.slug;

	const project: IProject = (
		await strapiFetch(`projects?filters[slug][$eq]=${slug}&populate=deep`)
	).data[0];
	// const project = (await strapiFetch(`projects/${slug}?populate=deep`)).data;
	project.attributes.story = await generateHTML(project.attributes.story);

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
