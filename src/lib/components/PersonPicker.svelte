<script lang="ts">
	import type { Person } from '$lib/types/app.types'
	import PersonIcon from './PersonIcon.svelte'

	export let name: string
	export let persons: Person[]
	export let title: string | undefined = undefined
	export let selectMultiple: boolean = false
	export let showNames: boolean = false
	export let group: string | string[] | undefined
</script>

<fieldset>
	{#if title}
		<legend>{title}</legend>
	{/if}

	{#each persons as person}
		<label>
			{#if selectMultiple}
				<input {name} type="checkbox" value={person.id} bind:group />
			{:else}
				<input {name} type="radio" value={person.id} bind:group />
			{/if}

			<span class="icon"><PersonIcon {person} /></span>

			{#if showNames}
				<span class="name">
					{person.name}
				</span>
			{/if}
		</label>
	{/each}
</fieldset>

<style lang="scss">
	input {
		display: none;
	}

	fieldset {
		border: 0;
		display: flex;
		gap: 1em;
		padding: 0;
	}

	label {
		align-items: center;
		display: inline-flex;
		flex-direction: column;
		gap: 0.25em;
		transition: transform 200ms;

		&:active {
			transform: scale(0.85);
			transition-duration: 0;
		}
	}

	.icon {
		border: 0.15em solid transparent;
		border-radius: 50%;
		display: flex;
		flex: 0;
		padding: 0.1em;
		transition: border-color 100ms;
	}

	.name {
		font-size: 0.5em;
	}

	label:has(input:checked) {
		.icon {
			border-color: var(--color--selected);
		}
	}
</style>
