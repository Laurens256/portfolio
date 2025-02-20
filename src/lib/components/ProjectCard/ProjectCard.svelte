<script lang="ts">
	import type { SvxProjectMeta } from '$types';

	const {
		title, slug, previewImage, previewImageAlt, previewDescription,
	}: SvxProjectMeta = $props();
</script>

<a class="root" href="/projects/{slug}">
	<img src={previewImage} alt={previewImageAlt} class="image" />

	<div class="textContainer">
		<h3 class="title">{title}</h3>
		<p class="description">{previewDescription}</p>
	</div>
</a>

<style>
	.root {
		display: flex;
		text-decoration: none;
		color: inherit;
		padding: 1rem;
		border-radius: 0.5rem;
		width: 100%;
		background-color: var(--secondary-bg);
		gap: 1rem;
		transition: scale 0.15s ease-in-out;

		&:where(:hover, :focus-visible) {
			scale: 1.01;

			& .title {
				text-decoration: underline;
			}
		}

		@media screen and (max-width: 40rem) {
			flex-direction: column;

			& .image {
				width: 100%;
			}
		}
	}
	.image {
		width: 40%;
		height: 12.5rem;
		object-fit: cover;
		border-radius: 0.25rem;
		flex-shrink: 0;
	}

	.title {
		font-size: 1.2rem;
	}
	.description {
		margin-top: 1rem;
		font-size: 1.1rem;
		color: var(--secondary-text);
	}
</style>
