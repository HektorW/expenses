<script lang="ts">
	import { goto } from '$app/navigation'

	export let href: string
	export let state: any = undefined

	function onClick(event: MouseEvent) {
		if (state) {
			event.preventDefault()
			goto(href, { state })
		}
	}
</script>

<a {href} on:click={onClick}><slot /></a>

<style lang="scss">
	a {
		--size: 5em;

		align-items: center;
		background-color: var(--color--primary);
		border-radius: 50%;
		bottom: 1rem;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
		color: inherit;
		display: flex;
		font-weight: bold;
		height: var(--size);
		justify-content: center;
		position: fixed;
		right: 1rem;
		text-align: center;
		text-decoration: none;
		width: var(--size);
	}
</style>
