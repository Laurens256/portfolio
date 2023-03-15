import fetchData from '$lib/functions/fetchData';
import { browser } from '$app/environment';

export const load = async ({fetch}) => {
	if(!browser) {
		const navLinks = await fetchData('navLinks');

		return {
			navLinks: navLinks.data
		};
	}
};
