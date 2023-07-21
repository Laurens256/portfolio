import {
	defineDocumentType,
	defineNestedType,
	makeSource
} from 'contentlayer/source-files';

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
		published: { type: 'boolean', default: false },
		rank: { type: 'number', required: true },

		document_title: { type: 'string', required: true },
		document_description: { type: 'string', required: true },

		panel_bg_color: { type: 'string', default: 'var(--secondary-bg)' },
		panel_text_color: { type: 'string', default: 'var(--text-white)' },
		icon_url: { type: 'string', required: false },

		cover_img: { type: 'string', required: false },

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
	},
	computedFields: {
		slug: {
			type: 'string',
			resolve: (post) => {
				const parts = post._raw.flattenedPath.split('/');
				return parts[parts.length - 1];
			}
		}
	}
}));

export default makeSource({
	contentDirPath: 'src/mdx',
	documentTypes: [SplashMdx, AboutMdx, ProjectMDX]
});
