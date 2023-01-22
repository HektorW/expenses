<script lang="ts">
	import Fab from '$lib/components/Fab.svelte'

	import ExpenseList from '$lib/components/ExpenseList.svelte'
	import Money from '$lib/components/Money.svelte'
	import PersonIcon from '$lib/components/PersonIcon.svelte'
	import { getPersonStanding } from '$lib/utils/tbdUtils'
	import { persons } from '$lib/stores/personsStore'
	import { expenses } from '$lib/stores/expensesStore'
</script>

<p>Westrup Wallin</p>
<h1>Pengar å sånt</h1>

<section>
	<h2>Balans</h2>

	<ul>
		{#each $persons as person}
			{@const balance = getPersonStanding($expenses, person.id)}

			<li>
				<a href={`/person/${person.id}`}>
					<PersonIcon {person} />
					<span>{person.name}</span>
					<b
						>{#if balance > 0}+{/if}<Money amount={balance} /></b
					>
				</a>
			</li>
		{/each}
	</ul>
</section>

<ExpenseList expenses={$expenses} persons={$persons}>
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

	p {
		font-size: 0.6rem;
	}

	h2 {
		font-size: 1rem;
	}

	ul {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));
		list-style: none;
		margin: 0;
		padding: 0;

		a {
			align-items: center;
			display: flex;
			flex-direction: column;
			gap: 0.25em;
			text-decoration: none;

			span {
				text-decoration: underline;
			}
		}
	}
</style>
