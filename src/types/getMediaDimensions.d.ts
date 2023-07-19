declare module 'get-media-dimensions';
type getMediaDimensions = (
	path: string,
	format: 'image' | 'video'
) => Promise<{ width: number; height: number } | undefined>;
