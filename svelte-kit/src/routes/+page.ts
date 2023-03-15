import fetchData from '$lib/functions/fetchData';

export const load = async ({fetch}) => {
	const navLinks = await fetchData('navLinks');

	return {
		navLinks: navLinks.data
	}
};