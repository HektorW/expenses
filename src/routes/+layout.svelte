<script>
	import CreateExpenseFab from '$lib/components/CreateExpenseFab.svelte'
</script>

<main>
	<slot />
</main>

<CreateExpenseFab />

<style lang="scss">
	:global(html) {
		font-size: 175%;
	}

	:global(body) {
		background-color: antiquewhite;
		color: #222;
	}

	:global(a) {
		color: inherit;
	}

	main {
		padding-bottom: 5rem; // Space for FAB
	}
</style>
