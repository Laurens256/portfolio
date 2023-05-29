export default interface Project {
	attributes: {
		short_title: string;
		long_title: string;
		slug: string;
		rank: number;
		background: string;
		roles?: string[];
		case_description: string;
		quicklinks?: string;
		story: string;
		meta_description?: string;
		cover?: {
			data: {
				attributes: {
					alternativeText: string;
					caption: string;
					ext: string;
					url: 'https://gjwthqvkkfklvhoqvqpw.supabase.co/storage/v1/object/public/strapi-uploads/spongb.jpg';
				};
			};
		};
	};
}
