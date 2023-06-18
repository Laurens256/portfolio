import styles from './index.module.css';

import Head from 'next/head';

import Header from '@/modules/header/Header';
import NewSplash from '@/components/newSplash/NewSplash';
import Splash from '@/components/splash/Splash';
import About from '@/components/about/About';
import Projects from '@/components/projects/Projects';
import Contact from '@/components/contact/Contact';

import type INavLink from '@/types/NavLink';
import type IProject from '@/types/Project';
import type IAbout from '@/types/About';
import type ISplash from '@/types/Splash';

import strapiFetch from '@/utils/fetchWithHeaders';

export default function Home({
	splashData,
	projects,
	about
}: {
	splashData: ISplash;
	projects: IProject[];
	about: IAbout;
}) {
	return (
		<>
			<Head>
				<title key="title">Portfolio | Laurens Duin</title>
				<meta key="og-title" name="og:title" content="Portfolio | Laurens Duin" />
				<meta name="description" content="I'm a Dutch front-end developer based in Amersfoort, Netherlands. I love creating fun and accessible web experiences" />
				<meta name="og:description" content="I'm a Dutch front-end developer based in Amersfoort, Netherlands. I love creating fun and accessible web experiences" />
			</Head>

			<Header />
			<NewSplash splashData={splashData} />
			{/* <Splash navLinks={navLinks} /> */}
			<Projects projects={projects} />
			<About about={about} />
			<Contact />
		</>
	);
}

export const getStaticProps = async () => {
	// const navLinks: INavLink[] = (await strapiFetch('navlinks?sort=rank:ASC')).data;
	const splashData = (await strapiFetch('splash')).data;
	const projects: IProject[] = (await strapiFetch('projects?sort=rank:ASC&populate=deep'))
		.data;
	const about: IAbout = (await strapiFetch('about?populate=deep')).data;

	return {
		props: {
			// navLinks,
			splashData,
			projects,
			about
		}
	};
};
