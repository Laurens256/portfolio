import styles from './index.module.css';

import Splash from '@/components/splash/Splash';
import Projects from '@/components/projects/Projects';

import ThemeSwitcher from '@/modules/themeSwitcher/ThemeSwitcher';

import type NavLink from '@/types/NavLink';
import type Project from '@/types/Project';

import strapiFetch from '@/utils/fetchWithHeaders';

export default function Home({ navLinks, projects }: { navLinks: NavLink[], projects: Project[] }) {
	return (
		<>
			<ThemeSwitcher customClass={styles["theme-switcher"]} />
			<Splash navLinks={navLinks} />
			<Projects projects={projects} />
		</>
	);
}

export const getStaticProps = async () => {
	const navLinks: NavLink[] = (await strapiFetch('navlinks?sort=rank:ASC')).data;
	const projects: Project[] = (await strapiFetch('projects?sort=rank:ASC')).data;

	return {
		props: {
			navLinks,
			projects
		}
	};
};
