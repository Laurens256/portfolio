import type { Component } from 'svelte';

type SvxModuleBase <Metadata extends Record<string, any>> = {
	default: Component;
	metadata: Metadata;
};

export type SvxProjectMeta = {
	slug: string;
	rank: number;
	published: boolean;
	title: string;
	previewImage: string;
	previewImageAlt: string;
	previewDescription: string;
};

export type SvxProjectFull = SvxModuleBase<SvxProjectMeta>;
