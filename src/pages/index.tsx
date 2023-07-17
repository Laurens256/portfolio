import './index.module.css';

import Head from 'next/head';

import Header from '@/components/header/Header';
import Splash from '@/components/splash/Splash';
import About from '@/components/about/About';
import Projects from '@/components/projects/Projects';
import Contact from '@/components/contact/Contact';

import {
	SplashMdx,
	allSplashMdxes,
	AboutMdx,
	allAboutMdxes,
	ProjectMDX,
	allProjectMDXes
} from 'contentlayer/generated';


export default function Home({
	splashData,
	projects,
	about
}: {
	splashData: SplashMdx;
	projects: ProjectMDX[];
	about: AboutMdx;
}) {
	return (
		<>
			<Head>
				<title key="title">Portfolio | Laurens Duin</title>
				<meta key="og-title" name="og:title" content="Portfolio | Laurens Duin" />
				<meta
					name="description"
					content="I'm a Dutch front-end developer based in Amersfoort, Netherlands. I love creating fun and accessible web experiences"
				/>
				<meta
					name="og:description"
					content="I'm a Dutch front-end developer based in Amersfoort, Netherlands. I love creating fun and accessible web experiences"
				/>
			</Head>

			<Header />
			<Splash splashData={splashData} />
			<Projects projects={projects} />
			<About about={about} />
			<Contact />
		</>
	);
}

export const getStaticProps = async () => {
	const splashData = allSplashMdxes[0];

	const projects = allProjectMDXes
		.filter((project) => project.published)
		.sort((a, b) => a.rank - b.rank);

	const about = allAboutMdxes[0];

	return {
		props: {
			splashData,
			projects,
			about
		}
	};
};
