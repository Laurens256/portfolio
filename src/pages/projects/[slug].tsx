import styles from './project.module.css';

import { allProjectMDXes } from 'contentlayer/generated';
import { convertHtmlToReact } from '@hedgedoc/html-to-react';

import Head from 'next/head';
import Link from 'next/link';

import SpotifyLoader from '@/parts/spotifyLoader/SpotifyLoader';
import { markdownToHtml } from '@/utils/markdownToHtml';

const getProjectBySlug = (slug: string) => {
	return allProjectMDXes.find((project) => project.slug === slug);
};

export default function Project({ projectData }: { projectData: ProjectData }) {
	const {
		slug,
		documentTitle,
		documentDescription,
		longTitle,
		coverHTML,
		caseDescription,
		quickLinks,
		storyHTML
	} = projectData;

	return (
		<>
			<Head>
				<title key="title">{documentTitle}</title>
				<meta name="description" key="description" content={documentDescription} />

				<meta property="og:title" key="og:title" content={documentTitle} />
				<meta
					property="og:description"
					key="og:description"
					content={documentDescription}
				/>
			</Head>

			<nav className={styles.nav}>
				<Link className="underline" href="/#projects">
					Back
				</Link>
			</nav>
			<main className={`${styles.project} ${styles[slug]}`}>
				<header>
					<h1 dangerouslySetInnerHTML={{ __html: longTitle }}></h1>

					{convertHtmlToReact(coverHTML)}
					{!coverHTML && slug === 'discofy' && (
						<div className={styles.spotifyloader}>
							<SpotifyLoader />
						</div>
					)}

					<section>
						<div className={styles.case}>
							<h2>Case</h2>
							<p dangerouslySetInnerHTML={{ __html: caseDescription }}></p>
						</div>

						{quickLinks && (
							<div className={styles.quicklinks}>
								<h2>Quick links</h2>
								<ul>
									{quickLinks.map((quickLink, i) => (
										<li key={i}>
											<a href={quickLink.url} target="_blank">
												{quickLink.name}
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
					dangerouslySetInnerHTML={{ __html: storyHTML }}></section>
			</main>
		</>
	);
}

interface ProjectData {
	slug: string;
	documentTitle: string;
	documentDescription: string;
	longTitle: string;
	coverHTML: string;
	caseDescription: string;
	quickLinks:
		| {
				name: string;
				url: string;
		  }[]
		| undefined;
	storyHTML: string;
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
	const project = getProjectBySlug(params.slug);

	if (!project) {
		throw new Error(`No project found for slug: ${params.slug}`);
	}

	const [longTitle, coverHTML, caseHTML, storyHTML] = await Promise.all([
		project.long_title ? markdownToHtml(project.long_title) : '',
		project.cover_img ? markdownToHtml(project.cover_img) : '',
		project.case_description ? markdownToHtml(project?.case_description) : '',
		project.body.raw ? markdownToHtml(project.body.raw, false) : ''
	]);

	const projectData: ProjectData = {
		slug: project!.slug,
		documentTitle: `${project?.document_title || ''} | Laurens Duin`,
		documentDescription: project?.document_description || '',
		longTitle: longTitle,
		coverHTML: coverHTML,
		caseDescription: caseHTML,
		quickLinks: project?.quick_links,
		storyHTML: storyHTML
	};

	return {
		props: {
			projectData
		}
	};
}

// create paths for all published projects
export async function getStaticPaths() {
	const paths = allProjectMDXes
		.filter((project) => project.published === true)
		.map((project) => {
			return { params: { slug: project.slug } };
		});

	return {
		paths: paths,
		fallback: false
	};
}
