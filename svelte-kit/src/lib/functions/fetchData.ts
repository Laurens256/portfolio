import { PUBLIC_API_URL } from '$env/static/public';

const fetchData = async (
	query: keyof typeof queries,
	// fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>
) => {
	try {
		const data = await (await fetch(`${PUBLIC_API_URL}${queries[query]}`)).json();
		return data;
	} catch {
		console.log('errorrrrrrrrrrrrrrrrrrr');
		return {};
	}
};

const queries = {
	navLinks: 'navlinks'
};

export default fetchData;
