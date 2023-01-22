<script lang="ts">
	import ExpenseList from '$lib/components/ExpenseList.svelte'
	import Fab from '$lib/components/Fab.svelte'
	import Money from '$lib/components/Money.svelte'
	import PersonIcon from '$lib/components/PersonIcon.svelte'
	import { expenses } from '$lib/stores/expensesStore'
	import { persons } from '$lib/stores/personsStore'
	import { getPersonStanding } from '$lib/utils/tbdUtils'
	import type { PageData } from './$types'

	export let data: PageData

	const person = $persons.find((person) => person.id === data.personId)!
	const personExpenses = $expenses.filter(
		(expense) => expense.byPersonId === data.personId
	)
</script>

<a href="/">← Tillbaka till Start</a>

<h1>
	<PersonIcon {person} />
	{person.name}
</h1>

<h2>Balans</h2>
<p>
	Totalt: <b><Money amount={getPersonStanding($expenses, person.id)} /></b>
</p>

<ExpenseList expenses={personExpenses}>
	<h2 slot="title">Utlägg</h2>
	<p slot="no-expenses">
		<b>Inte gjort några utlägg än.</b>
	</p>
</ExpenseList>

<Fab href="/expense/create" state={{ byPersonId: person.id }}
	>Nytt<br />Utlägg</Fab
>
