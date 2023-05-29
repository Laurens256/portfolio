export default interface IAbout {
	attributes: {
		heading?: string;
		main: string;
		img: {
			data: {
				attributes: {
					alternativeText: string;
					height: number;
					url: string;
					width: number;
				};
			};
		};
	};
}
