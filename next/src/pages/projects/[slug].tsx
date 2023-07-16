import styles from './project.module.css';

import { ProjectMDX, allProjectMDXes } from 'contentlayer/generated';

import Head from 'next/head';
import Link from 'next/link';

import SpotifyLoader from '@/modules/spotifyLoader/SpotifyLoader';
import { markdownToHtml } from '@/utils/markdownToHtml';

const getProjectBySlug = (slug: string) => {
	return allProjectMDXes.find((project) => project.slug === slug);
};

export default function Project({
	project,
	storyHTML
}: {
	project: ProjectMDX;
	storyHTML: string;
}) {
	const { document_title, document_description, long_title, slug, case_description } =
		project;

	const quickLinks = project.quick_links;
	const cover_url = project.cover_url;
	const cover_alt = project.cover_alt;

	return (
		<>
			<Head>
				<title key="title">{document_title}</title>
				<meta name="description" key="description" content={document_description} />
			</Head>

			<nav className={styles.nav}>
				<Link className="underline" href="/#projects">
					Back
				</Link>
			</nav>
			<main className={`${styles.project} ${styles[slug]}`}>
				<header>
					<div>
						<h1>{long_title}</h1>
						{cover_url && (
							<img
								src={cover_url}
								alt={cover_alt}
								// style={imgWidth && imgHeight ? { aspectRatio: imgWidth / imgHeight } : {}}
							/>
						)}
						{!cover_url && slug === 'discofy' && (
							<div className={styles.spotifyloader}>
								<SpotifyLoader />
							</div>
						)}
					</div>

					<section>
						<div className={styles.case}>
							<h2>Case</h2>
							<p>{case_description}</p>
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

export async function getStaticProps({ params }: { params: { slug: string } }) {
	const project = getProjectBySlug(params.slug);

	const storyHTML = project?.body.raw ? await markdownToHtml(project.body.raw) : '';

	return {
		props: {
			project: project,
			storyHTML: storyHTML
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
