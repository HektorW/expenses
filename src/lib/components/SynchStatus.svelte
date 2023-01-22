<script lang="ts">
	import { onMount } from 'svelte'
	import { synchronizeAllState } from '$lib/api/synchronize'
	import { appStore } from '$lib/stores/appStore'
	import SynchIndicator from './SynchIndicator.svelte'

	onMount(() => {
		synchronizeAllState()

		window.addEventListener('offline', () => {
			$appStore.synchStatus = 'offline'
		})

		window.addEventListener('online', () => {
			synchronizeAllState()
		})
	})
</script>

<article>
	<SynchIndicator status={$appStore.synchStatus} />
</article>

<style lang="scss">
	article {
		display: flex;
		font-size: 0.75rem;
		position: fixed;
		right: 0.5rem;
		top: 0.5rem;
	}
</style>
