<script lang="ts">
	import type { ExpenseWithItems, Person } from '$lib/types/app.types'
	import { getPerson } from '$lib/utils/personUtils'
	import ExpenseListItem from './ExpenseListItem.svelte'

	export let expenses: ExpenseWithItems[]
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
