import { PUBLIC_API_URL } from '$env/static/public';

const fetchData = async (query: keyof typeof queries) => {
	console.log('fetchdata called');

	const test = 'https://portfolio-production-edef.up.railway.app/api/';

	try {
		console.log(PUBLIC_API_URL);
		const data = await (await fetch(`${test}${queries[query]}`)).json();
		console.log(data, PUBLIC_API_URL);
		console.log('GEEN ERORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
		return data;
	} catch {
		console.log('ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
		return {};
	}

	// try {
	// 	console.log('try called');
	// 	const data = await (await fetch(`${PUBLIC_API_URL}${queries[query]}`)).json();
	// 	console.log(data, PUBLIC_API_URL);
	// 	console.log('GEEN ERORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
	// 	return data;
	// } catch {
	// 	console.log('ERRORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR');
	// 	return {};
	// }
};

const queries = {
	navLinks: 'navlinks'
};

export default fetchData;
