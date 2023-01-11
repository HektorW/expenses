<script lang="ts">
	import Money from '$lib/components/Money.svelte'
	import PersonIcon from '$lib/components/PersonIcon.svelte'
	import { getExpenseTitle, getExpenseTotal } from '$lib/utils/expenseUtils'
	import { getPersonStanding } from '$lib/utils/tbdUtils'
	import type { PageData } from './$types'

	export let data: PageData
</script>

<a href="/">Back to Start</a>

<h1>
	<PersonIcon person={data.person} />
	{data.person.name}
</h1>

<h2>Standing</h2>
<p>
	Total: <b
		><Money amount={getPersonStanding(data.allExpenses, data.person.id)} /></b
	>
</p>

<h2>Expenses made</h2>
<ul>
	{#each data.person.expenses as expense}
		<li>
			{getExpenseTitle(expense)}
			<b><Money amount={getExpenseTotal(expense)} /></b>
		</li>
	{/each}
</ul>
