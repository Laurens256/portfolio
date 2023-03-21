import Splash from '@/components/splash/Splash';
import type NavLink from '@/types/NavLinks';
import strapiFetch from '@/utils/fetchWithHeaders';

export default function Home({ navLinks }: { navLinks: NavLink[] }) {
	return (
		<>
			<Splash navLinks={navLinks} />
		</>
	);
}

export const getStaticProps = async () => {
	const response = await strapiFetch('navlinks?sort=rank:ASC');
	console.log(response);
	const navLinks: NavLink[] = response.data;

	return {
		props: {
			navLinks
		}
	};
};
