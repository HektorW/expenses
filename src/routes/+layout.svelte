<script lang="ts">
	import { pwaInfo } from 'virtual:pwa-info'
	import CreateExpenseFab from '$lib/components/CreateExpenseFab.svelte'

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : ''

	$: {
		console.log({ webManifest })
	}
</script>

<svelte:head>
	{@html webManifest}
</svelte:head>

<main>
	<slot />
</main>

<CreateExpenseFab />

<style lang="scss">
	:global(html) {
		font-size: 175%;
	}

	:global(body) {
		background-color: hsl(34, 78%, 91%);
		color: hsl(0, 0%, 13%);
	}

	:global(a) {
		color: inherit;
	}

	main {
		padding-bottom: 5rem; // Space for FAB
	}
</style>
