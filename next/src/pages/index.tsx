import Splash from '@/components/splash/Splash';
import type NavLink from '@/types/NavLinks';

export default function Home({ navLinks }: { navLinks: NavLink[] }) {
	return (
		<>
			<Splash navLinks={navLinks} />
		</>
	);
}

export async function getStaticProps() {
	const response = await fetch('https://admin.laurensduin.nl/api/navlinks');
	// const response = await fetch('http://localhost:1337/api/navlinks');
	const navLinks: NavLink[] = (await response.json()).data;

	navLinks.sort((a, b) => {
		return a.attributes.order - b.attributes.order;
	});

	return {
		props: {
			navLinks
		}
	};
}
