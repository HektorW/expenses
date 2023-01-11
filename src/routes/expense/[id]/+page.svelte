<script lang="ts">
	import Money from '$lib/components/Money.svelte'
	import { getExpenseTitle, getExpenseTotal } from '$lib/utils/expenseUtils'
	import type { PageData } from './$types'

	export let data: PageData
</script>

<a href="/">Back to Start</a>

<h1>
	<span>Expense -</span>
	<span>{getExpenseTitle(data.expense)}</span>
</h1>

<p>
	Total: <b><Money amount={getExpenseTotal(data.expense)} /></b>
</p>
<p>
	Date: {new Intl.DateTimeFormat('en-SE', {
		dateStyle: 'full',
		timeStyle: 'short'
	}).format(data.expense.date)}
</p>

{#if data.expense.expenseItems.length > 1}
	<h2>Items</h2>
	<ul>
		{#each data.expense.expenseItems as expenseItem}
			<li>{expenseItem.title} <b><Money amount={expenseItem.amount} /></b></li>
		{/each}
	</ul>
{/if}

<form method="post" action="?/deleteExpense">
	<input name="expenseId" type="hidden" value={data.expense.id} />

	<button type="submit">Delete expense</button>
</form>
