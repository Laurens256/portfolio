import Splash from '@/components/splash/Splash';
import type NavLink from '@/types/NavLinks';
import strapiFetch from '@/utils/fetchWithHeaders';

export default function Home({ navLinks }: { navLinks: NavLink[] }) {
	return <>
	<Splash navLinks={navLinks} />
	</>;
}


export async function getStaticProps() {
	const response = await strapiFetch('navlinks');
	// const response = await fetch(`${process.env.API_URL}navlinks`);
	// const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}navlinks`);
	const navLinks: NavLink[] = response.data;

	navLinks.sort((a, b) => {
		return a.attributes.order - b.attributes.order;
	});

	return {
		props: {
			navLinks
		}
	};
}
