<script lang="ts">
	import Fab from '$lib/components/Fab.svelte'
	import ExpenseTotal from '$lib/components/ExpenseTotal.svelte'
	import Money from '$lib/components/Money.svelte'
	import PersonIcon from '$lib/components/PersonIcon.svelte'
	import { getExpenseTitle } from '$lib/utils/expenseUtils'
	import { getPerson } from '$lib/utils/personUtils'
	import { getPersonStanding } from '$lib/utils/tbdUtils'
	import type { PageData } from './$types'

	export let data: PageData
</script>

<p>Westrup Wallin</p>
<h1>Pengar å sånt</h1>

<section>
	<h2>Balans</h2>

	<ul>
		{#each data.persons as person}
			<li>
				<PersonIcon {person} />
				<a href={`/person/${person.id}`}>{person.name}</a>, Totalt:
				<b><Money amount={getPersonStanding(data.expenses, person.id)} /></b>
			</li>
		{/each}
	</ul>
</section>

<section>
	<h2>Alla utlägg</h2>

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
			<b>Ingenting här än</b>
		</p>
	{/if}
</section>

<Fab href="/expense/create">Nytt<br />Utlägg</Fab>

<style lang="scss">
	p,
	h1 {
		margin: 0;
	}
</style>
