import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files';
import { url } from 'inspector';
import rehypePrettyCode from 'rehype-pretty-code';

const QuickLink = defineNestedType(() => ({
	name: 'QuickLink',
	fields: {
		name: { type: 'string', required: true },
		url: { type: 'string', required: true }
	}
}));

// project data type
export const ProjectMDX = defineDocumentType(() => ({
	name: 'ProjectMDX',
	filePathPattern: 'projects/**/*.mdx',
	contentType: 'mdx',
	fields: {
		slug: { type: 'string', required: true },
		published: { type: 'boolean', default: false },
		document_title: { type: 'string', required: true },
		document_description: { type: 'string', required: true },
		cover_url: { type: 'string', required: false },
		cover_alt: { type: 'string', required: false },
		long_title: { type: 'string', required: true },
		short_title: { type: 'string', required: true },
		case_description: { type: 'string', required: true },
		quick_links: { type: 'list', of: QuickLink, required: false },
	}
}));

export default makeSource({
	contentDirPath: 'src/mdx',
	documentTypes: [ProjectMDX],
	mdx: {
		rehypePlugins: [
			[
				rehypePrettyCode,
				{
					theme: 'github-dark',
					onVisitLine(node) {
						if (node.children.length === 0) {
							node.children = [{ type: 'text', value: ' ' }];
						}
					}
				}
			]
		]
	}
});
