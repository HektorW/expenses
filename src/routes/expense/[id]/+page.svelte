<script lang="ts">
	import { goto } from '$app/navigation'
	import { deleteExpense } from '$lib/api/synchronize'
	import Fab from '$lib/components/Fab.svelte'
	import Money from '$lib/components/Money.svelte'
	import RelativeDate from '$lib/components/RelativeDate.svelte'
	import RouteTitle from '$lib/components/RouteTitle.svelte'
	import { expenses } from '$lib/stores/expensesStore'
	import type { WithTarget } from '$lib/types/utils.types'
	import { getFullDateFormatted } from '$lib/utils/dateUtils'
	import { getExpenseTitle, getExpenseTotal } from '$lib/utils/expenseUtils'

	import type { PageData } from './$types'

	export let data: PageData

	$: expense = $expenses.find((expense) => expense.id === data.expenseId)
	$: title = expense ? getExpenseTitle(expense) : 'Kunde inte hitta utlägget'

	function handleDeleteSubmit(event: WithTarget<HTMLFormElement>) {
		deleteExpense(data.expenseId)
		goto('/')
	}
</script>

<RouteTitle title={`Utlägg - ${title}`} />

<a href="/">← Tillbaka till start</a>

{#if expense}
	<h1>
		<span>Utlägg -</span>
		<span>{title}</span>
	</h1>

	<p>
		Totalt: <b><Money amount={getExpenseTotal(expense)} /></b>
	</p>
	<p>
		Datum: <RelativeDate date={expense.date} />
		<small>{getFullDateFormatted(expense.date)}</small>
	</p>

	{#if expense.expenseItems.length > 1}
		<h2>Artiklar</h2>
		<ul>
			{#each expense.expenseItems as expenseItem}
				<li>
					{expenseItem.title} <b><Money amount={expenseItem.amount} /></b>
				</li>
			{/each}
		</ul>
	{/if}

	<form method="delete" on:submit|preventDefault={handleDeleteSubmit}>
		<input name="expenseId" type="hidden" value={expense.id} />

		<button type="submit">Ta bort utlägg</button>
	</form>
{/if}

<Fab href="/expense/create">Nytt<br />Utlägg</Fab>

<style lang="scss">
	small {
		font-size: 0.5em;
	}
</style>
