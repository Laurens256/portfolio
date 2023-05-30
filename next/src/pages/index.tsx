import styles from './index.module.css';

import Head from 'next/head';

import Header from '@/modules/header/Header';
import NewSplash from '@/components/newSplash/NewSplash';
import Splash from '@/components/splash/Splash';
import About from '@/components/about/About';
import Projects from '@/components/projects/Projects';
import Contact from '@/components/contact/Contact';

import ThemeSwitcher from '@/modules/themeSwitcher/ThemeSwitcher';

import type INavLink from '@/types/NavLink';
import type IProject from '@/types/Project';
import type IAbout from '@/types/About';

import strapiFetch from '@/utils/fetchWithHeaders';

export default function Home({
	navLinks,
	projects,
	about
}: {
	navLinks: INavLink[];
	projects: IProject[];
	about: IAbout;
}) {
	return (
		<>
			<Head>
				<title key="title">Portfolio | Laurens Duin</title>
				<meta key="og-title" name="og:title" content="Portfolio | Laurens Duin" />
				<meta name="description" content=""/>
				<meta name="og:description" content=""/>
			</Head>

<Header navLinks={navLinks} />
			{/* <ThemeSwitcher customClass={styles['theme-switcher']} /> */}
			<NewSplash />
			{/* <Splash navLinks={navLinks} /> */}
			<Projects projects={projects} />
			<About about={about} />
			<Contact />
		</>
	);
}

export const getStaticProps = async () => {
	const navLinks: INavLink[] = (await strapiFetch('navlinks?sort=rank:ASC')).data;
	const projects: IProject[] = (await strapiFetch('projects?sort=rank:ASC')).data;
	const about: IAbout = (await strapiFetch('about?populate=deep')).data;

	return {
		props: {
			navLinks,
			projects,
			about
		}
	};
};
