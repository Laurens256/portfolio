import { PUBLIC_API_URL } from '$env/static/public';

export const load = async (loadEvent) => {
	const { fetch } = loadEvent;
	const response: any = (await (await fetch(`${PUBLIC_API_URL}projects?populate=deep`)).json()).data;
	return {
		response
	};
};
