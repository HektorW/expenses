<script lang="ts">
	import type { ExpenseWithItems, Person } from '$lib/types/app.types'
	import { getExpenseTitle } from '$lib/utils/expenseUtils'
	import ExpenseTotal from './ExpenseTotal.svelte'
	import PersonIcon from './PersonIcon.svelte'
	import RelativeDate from './RelativeDate.svelte'

	export let expense: ExpenseWithItems
	export let person: Person | null | undefined = undefined
</script>

<li>
	{#if person}
		<PersonIcon {person} />
	{/if}

	<a href={`/expense/${expense.id}`}>
		{getExpenseTitle(expense)}:
	</a>

	<b><ExpenseTotal {expense} /></b>

	<small><RelativeDate date={expense.date} /></small>
</li>

<style lang="scss">
	small {
		font-size: 0.5em;
	}
</style>
