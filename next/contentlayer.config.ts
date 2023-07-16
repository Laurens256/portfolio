import {
	defineDocumentType,
	defineNestedType,
	makeSource
} from 'contentlayer/source-files';
import rehypePrettyCode from 'rehype-pretty-code';

export const SplashMdx = defineDocumentType(() => ({
	name: 'SplashMdx',
	filePathPattern: 'splash.mdx',
	contentType: 'mdx',
	fields: {
		adjectives: { type: 'list', of: { type: 'string' }, required: false }
	}
}));

export const AboutMdx = defineDocumentType(() => ({
	name: 'AboutMdx',
	filePathPattern: 'about.mdx',
	contentType: 'mdx'
}));

// project data type
export const ProjectMDX = defineDocumentType(() => ({
	name: 'ProjectMDX',
	filePathPattern: 'projects/**/*.mdx',
	contentType: 'mdx',
	fields: {
		slug: { type: 'string', required: true },
		published: { type: 'boolean', default: false },
		rank: { type: 'number', required: true },

		document_title: { type: 'string', required: true },
		document_description: { type: 'string', required: true },

		background_color: { type: 'string', required: true },
		icon_url: { type: 'string', required: false },

		cover_url: { type: 'string', required: false },
		cover_alt: { type: 'string', required: false },
		cover_aspect_ratio: { type: 'number', required: false },

		long_title: { type: 'string', required: true },
		short_title: { type: 'string', required: true },
		case_description: { type: 'string', required: true },
		quick_links: {
			type: 'list',
			of: defineNestedType(() => ({
				fields: {
					name: { type: 'string', required: true },
					url: { type: 'string', required: true }
				}
			})),
			required: false
		}
	}
}));

export default makeSource({
	contentDirPath: 'src/mdx',
	documentTypes: [SplashMdx, AboutMdx, ProjectMDX],
	mdx: {
		rehypePlugins: [
			// [
			// 	rehypePrettyCode,
			// 	{
			// 		theme: 'github-dark',
			// 		onVisitLine(node) {
			// 			if (node.children.length === 0) {
			// 				node.children = [{ type: 'text', value: ' ' }];
			// 			}
			// 		}
			// 	}
			// ]
		]
	}
});
