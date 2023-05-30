type Options = Omit<RequestInit, 'headers'> & {
	headers?: Record<string, string>;
};

const strapiFetch = async (query: string, options?: Options): Promise<any> => {
	const headers = {
		Authorization: `bearer ${process.env.STRAPI_API_TOKEN}`
	};
	// Merge the existing headers with the custom headers
	const customOptions: Options = {
		...options,
		headers: {
			...headers,
			...options?.headers
		}
	};

	return await (await fetch(process.env.NEXT_PUBLIC_API_URL + query, customOptions)).json();
};

export default strapiFetch;
