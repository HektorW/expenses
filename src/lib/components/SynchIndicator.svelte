<script lang="ts">
	import type { AppSynchStatus } from '$lib/types/app.types'

	export let status: AppSynchStatus
</script>

<span
	class:synched={status === 'synched'}
	class:unsynched={status === 'unsynched'}
	class:synching={status === 'synching'}
	class:offline={status === 'offline'}
	title={status}
/>

<style lang="scss">
	span {
		aspect-ratio: 1 / 1;
		border: 1px solid var(--color--border);
		border-radius: 50%;
		display: inline-block;
		height: 1em;
	}

	.synched {
		background-color: var(--color--success);
	}

	.unsynched {
		background-color: var(--color--fail);
	}

	.synching {
	}

	.offline {
		background-color: var(--color--text);
		opacity: 0.5;
	}
</style>
