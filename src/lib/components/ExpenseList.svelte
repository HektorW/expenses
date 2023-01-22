<script lang="ts">
	import type { ClientExpense, Person } from '$lib/types/app.types'
	import { getPerson } from '$lib/utils/personUtils'
	import ExpenseListItem from './ExpenseListItem.svelte'

	export let expenses: ClientExpense[]
	export let persons: Person[] | undefined = undefined
</script>

<section>
	<slot name="title" />

	{#if expenses.length > 0}
		<ul>
			{#each expenses as expense}
				{@const person = persons
					? getPerson(persons, expense.byPersonId)
					: null}

				<ExpenseListItem {expense} {person} />
			{/each}
		</ul>
	{:else}
		<slot name="no-expenses">Finns inga utlägg</slot>
	{/if}
</section>

<style lang="scss">
	ul {
		display: flex;
		flex-direction: column;
		gap: 0.25em;
		list-style: none;
		margin: 0;
		padding: 0;
	}
</style>
