<script lang="ts">
	import { page } from '$app/stores'
</script>

<a href="/">Back to Start</a>

{#if $page.status === 404}
	<h1>Page not found</h1>
	<p>{$page.error?.message}</p>
{:else}
	<h1>{$page.error?.message}</h1>
	<p>{$page.status}</p>
{/if}
