<script lang="ts">
	export let href: string
</script>

<a {href}><slot /></a>

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
