export default interface IImage {
	data?: {
		attributes: {
			alternativeText: string;
			caption: string;
			ext: string;
			url: string;
			height: number;
			width: number;
		};
	};
}
