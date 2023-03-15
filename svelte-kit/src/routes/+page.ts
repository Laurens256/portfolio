import { PUBLIC_API_URL } from '$env/static/public';

export const load = async ({fetch}) => {
	console.log('before fetch');
	const data = await (await fetch(`${PUBLIC_API_URL}navlinks`)).json();
	console.log('after fetch');

	return data;
};