export default interface INavLink {
	attributes: {
		title: string;
		href: string;
		icon?: string;
		rank: number;
	};
}