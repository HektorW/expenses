<script lang="ts">
	import Fab from '$lib/components/Fab.svelte'
	import Money from '$lib/components/Money.svelte'
	import { locale } from '$lib/constants/locale'
	import { getExpenseTitle, getExpenseTotal } from '$lib/utils/expenseUtils'
	import type { PageData } from './$types'

	export let data: PageData
</script>

<a href="/">← Tillbaka till start</a>

<h1>
	<span>Utlägg -</span>
	<span>{getExpenseTitle(data.expense)}</span>
</h1>

<p>
	Totalt: <b><Money amount={getExpenseTotal(data.expense)} /></b>
</p>
<p>
	Datum: {new Intl.DateTimeFormat(locale, {
		dateStyle: 'full',
		timeStyle: 'short'
	}).format(data.expense.date)}
</p>

{#if data.expense.expenseItems.length > 1}
	<h2>Artiklar</h2>
	<ul>
		{#each data.expense.expenseItems as expenseItem}
			<li>{expenseItem.title} <b><Money amount={expenseItem.amount} /></b></li>
		{/each}
	</ul>
{/if}

<form method="post" action="?/deleteExpense">
	<input name="expenseId" type="hidden" value={data.expense.id} />

	<button type="submit">Ta bort utlägg</button>
</form>

<Fab href="/expense/create">Nytt<br />Utlägg</Fab>
