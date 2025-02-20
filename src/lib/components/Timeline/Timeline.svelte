<script lang="ts">
	type Props = {
		entries: {
			dateString: string;
			title: string;
			subtitle?: string;
			description?: string;
		}[];
	};

	const { entries }: Props = $props();
</script>

<ol class="root">
	{#each entries as { dateString, title, subtitle, description }}
		<li class="entry">
			<div class="dateWrapper">
				<div class="dateMarker"></div>
				<p class="date">{dateString}</p>
			</div>

			<div class="entryInner">
				<h3 class="title">{title}</h3>
				{#if subtitle}
					<p class="subtitle">{subtitle}</p>
				{/if}
				{#if description}
					<p class="description">{description}</p>
				{/if}
			</div>
		</li>
	{/each}
</ol>

<style>
  .root {
    --gutter-size: 1.75rem;
    --border-width: 1px;

    border-left: var(--border-width) solid var(--secondary-text);
    padding-left: var(--gutter-size);
    padding-block: 1rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    position: relative;
  }
  .entry {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .dateWrapper {
    display: flex;
    align-items: center;
  }
  .dateMarker {
    --size: 0.5rem;
    position: absolute;
    left: calc(-1 * (var(--size) / 2 + var(--border-width) / 2));
    width: var(--size);
    height: var(--size);
    background-color: var(--primary-text);
    border-radius: 50%;
  }
  .date {
    font-weight: 600;
  }

  .entryInner {
    background-color: var(--secondary-bg);
    padding: 1rem;
    border-radius: 0.375rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .title {
    font-size: 1.1rem;
    font-weight: 500;

  }
  .subtitle {
    font-size: 0.9rem;
  }
	.description {
		font-size: 0.85rem;
		color: var(--secondary-text);
		margin-top: 0.25rem;
	}
</style>
