import styles from './index.module.css';

import Splash from '@/components/splash/Splash';
import About from '@/components/about/About';
import Projects from '@/components/projects/Projects';
import Contact from '@/components/contact/Contact';

import ThemeSwitcher from '@/modules/themeSwitcher/ThemeSwitcher';

import type INavLink from '@/types/NavLink';
import type IProject from '@/types/Project';
import type IAbout from '@/types/About';

import strapiFetch from '@/utils/fetchWithHeaders';

const scrollToHeading = (e: React.MouseEvent<HTMLAnchorElement>) => {
	e.preventDefault();
	const href = e.currentTarget.getAttribute('href')?.replace('#', '');
	const heading = document.querySelector(`#${href}`);

	heading?.scrollIntoView({
		behavior: 'smooth'
	});
};

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
			<ThemeSwitcher customClass={styles['theme-switcher']} />
			<Splash navLinks={navLinks} />
			<About about={about} />
			<a
				href='#projects'
				aria-label="scroll to my projects"
				className={styles.scrollbtn}
				onClick={scrollToHeading}>
				My Projects
			</a>
			<Projects projects={projects} />
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
