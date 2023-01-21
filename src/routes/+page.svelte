<script lang="ts">
	import Fab from '$lib/components/Fab.svelte'

	import ExpenseList from '$lib/components/ExpenseList.svelte'
	import Money from '$lib/components/Money.svelte'
	import PersonIcon from '$lib/components/PersonIcon.svelte'
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

<ExpenseList expenses={data.expenses} persons={data.persons}>
	<h2 slot="title">Alla utlägg</h2>

	<p slot="no-expenses">
		<b>Ingenting här än</b>
	</p>
</ExpenseList>

<Fab href="/expense/create">Nytt<br />Utlägg</Fab>

<style lang="scss">
	p,
	h1 {
		margin: 0;
	}
</style>
