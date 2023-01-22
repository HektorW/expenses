<script lang="ts">
	import SynchStatus from '$lib/components/SynchStatus.svelte'
	import { pwaInfo } from 'virtual:pwa-info'
	import { registerSW } from 'virtual:pwa-register'

	if (typeof navigator !== 'undefined') {
		registerSW({ immediate: true })
	}

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : ''
</script>

<svelte:head>
	{@html webManifest}

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		rel="preconnect"
		href="https://fonts.gstatic.com"
		crossorigin="anonymous"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main>
	<slot />
</main>

<SynchStatus />

<style lang="scss">
	:root {
		--color--background: #fff2de;
		--color--text: #424242;
		--color--primary: #ffc1a0;
		--color--secondary: #b5d3e3;

		--color--focus: var(--color--primary);
		--color--selected: var(--color--text);

		--color--border: var(--color--text);

		--color--success: green;
		--color--fail: red;
	}

	:global(html) {
		box-sizing: border-box;
		font-family: Open Sans;
		font-size: 150%;
	}

	:global(*, *::after, *::before) {
		box-sizing: inherit;

		-webkit-tap-highlight-color: transparent;
	}

	:global(:focus-visible) {
		outline-color: var(--color--focus);
		outline-offset: 2px;
		outline-width: 2px;
		transition: outline-offset 100ms;
	}

	:global(body) {
		background-color: #fff2de;
		color: #424242;
		overflow-x: hidden;
	}

	:global(a, button, input) {
		color: inherit;
	}

	:global(input) {
		border-radius: 0;
		font-size: inherit;
	}

	:global(fieldset) {
		border: 0;
		padding: 0;
	}

	main {
		padding-bottom: 5rem; // Space for FAB
	}
</style>
