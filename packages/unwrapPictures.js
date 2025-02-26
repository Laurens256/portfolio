import { visit, SKIP } from 'unist-util-visit';

const unwrapPictures = () => {
	return (tree) => {
		visit(tree, 'element', (node, index, parent) => {
			if (node.tagName === 'p') {
				if (node.children && node.children.length === 1) {
					const child = node.children[0];

					if (child.type === 'element' && child.tagName === 'picture') {
						if (parent && index !== null) {
							parent.children.splice(index, 1, child);
							return [SKIP, index];
						}
					}
				}
			}
		});
	};
};

export default unwrapPictures;
