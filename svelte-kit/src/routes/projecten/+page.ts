export const load = async (loadEvent) => {
	const { fetch } = loadEvent;
	const response: any = (await (await fetch('http://localhost:1337/api/projects?populate=deep')).json()).data;
	return {
		response
	};
};
