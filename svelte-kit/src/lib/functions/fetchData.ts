import { PUBLIC_API_URL } from '$env/static/public';

const fetchData = async (query: keyof typeof queries) => {
	const data = await (await fetch(`${PUBLIC_API_URL}${queries[query]}`)).json();
	return data;
};

const queries = {
	navLinks: 'navlinks'
};

export default fetchData;