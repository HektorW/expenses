<script lang="ts">
	import ExpenseList from '$lib/components/ExpenseList.svelte'
	import Fab from '$lib/components/Fab.svelte'
	import Money from '$lib/components/Money.svelte'
	import PersonIcon from '$lib/components/PersonIcon.svelte'
	import { getPersonStanding } from '$lib/utils/tbdUtils'
	import type { PageData } from './$types'

	export let data: PageData
</script>

<a href="/">Back to Start</a>

<h1>
	<PersonIcon person={data.person} />
	{data.person.name}
</h1>

<h2>Balans</h2>
<p>
	Totalt: <b
		><Money amount={getPersonStanding(data.allExpenses, data.person.id)} /></b
	>
</p>

<ExpenseList expenses={data.person.expenses}>
	<h2 slot="title">Utlägg</h2>
	<p slot="no-expenses">
		<b>Inte gjort några utlägg än.</b>
	</p>
</ExpenseList>

<Fab href="/expense/create" state={{ byPersonId: data.person.id }}
	>Nytt<br />Utlägg</Fab
>
