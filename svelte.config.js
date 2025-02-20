import { mdsvex, escapeSvelte } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import addSlugFrontmatter from './packages/addSlug.js';
import { codeToHtml } from 'shiki';

const ignoredWarnings = ['script_context_deprecated', 'a11y_img_redundant_alt', 'a11y_media_has_caption'];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			remarkPlugins: [
				addSlugFrontmatter,
			],
			rehypePlugins: [rehypeUnwrapImages],
			highlight: {
				highlighter: async (code, lang = 'text') => {
					const html = escapeSvelte(await codeToHtml(code, {
						lang,
						themes: { dark: 'github-dark', light: 'github-light' },
						defaultColor: false,
					}));
					return `{@html \`${html}\` }`;
				},
			},
		}),
	],

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		alias: Object.fromEntries([
			'components',
			'svx',
			'types',
			'util',
			'resources',
			'stores',
			'assets',
		].map((entry) => ([`$${entry}`, `src/lib/${entry}`]))),
		prerender: {
			handleMissingId: 'warn',
			handleHttpError: 'warn',
		},
	},

	compilerOptions: {
		runes: true,
		warningFilter: (warning) => !ignoredWarnings.includes(warning.code),
	},

	extensions: ['.svelte', '.svx'],
};

export default config;
