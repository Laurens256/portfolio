import IImage from './Image';

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
		icon: IImage;
		cover: IImage;
	};
}
