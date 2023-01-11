<script lang="ts">
	import ExpenseTotal from '$lib/components/ExpenseTotal.svelte'
	import Money from '$lib/components/Money.svelte'
	import PersonIcon from '$lib/components/PersonIcon.svelte'
	import { getExpenseTitle } from '$lib/utils/expenseUtils'
	import { getPerson } from '$lib/utils/personUtils'
	import { getPersonStanding } from '$lib/utils/tbdUtils'
	import type { PageData } from './$types'

	export let data: PageData
</script>

<h1>Westrup Wallin - Expenses</h1>

<section>
	<h2>Persons</h2>
	<ul>
		{#each data.persons as person}
			<li>
				<PersonIcon {person} />
				<a href={`/person/${person.id}`}>{person.name}</a>, Total:
				<b><Money amount={getPersonStanding(data.expenses, person.id)} /></b>
			</li>
		{/each}
	</ul>
</section>

<section>
	<h2>Expenses</h2>

	{#if data.expenses.length > 0}
		<ul>
			{#each data.expenses as expense}
				{@const person = getPerson(data.persons, expense.byPersonId)}

				{#if person}
					<li>
						<PersonIcon {person} />

						<a href={`/expense/${expense.id}`}>
							{getExpenseTitle(expense)}: <b><ExpenseTotal {expense} /></b>
						</a>
					</li>
				{/if}
			{/each}
		</ul>
	{:else}
		<p>
			<b>No expenses yet</b>
		</p>
	{/if}
</section>
