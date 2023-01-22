<script lang="ts">
	import type { ClientExpense, Person } from '$lib/types/app.types'
	import { getExpenseTitle } from '$lib/utils/expenseUtils'
	import ExpenseTotal from './ExpenseTotal.svelte'
	import PersonIcon from './PersonIcon.svelte'
	import RelativeDate from './RelativeDate.svelte'

	export let expense: ClientExpense
	export let person: Person | null | undefined = undefined
</script>

<li
	class:withPerson={Boolean(person)}
	class:unsynched={expense.synchStatus === 'unsynched'}
>
	{#if person}
		<PersonIcon {person} />
	{/if}

	<a href={`/expense/${expense.id}`}>{getExpenseTitle(expense)}</a>

	<b><ExpenseTotal {expense} /></b>

	<small><RelativeDate date={expense.date} /></small>
</li>

<style lang="scss">
	li {
		align-items: baseline;
		display: grid;
		grid-template-columns: 3fr 1fr 4rem;

		&.withPerson {
			grid-template-columns: auto 3fr 1fr 4rem;

			a {
				padding-inline-start: 0.5em;
			}
		}

		&.unsynched {
			opacity: 0.6;
		}
	}

	a {
		grid-column: -4 / span 2;
		overflow: hidden;
		padding-inline-end: 0.5em;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	b,
	small {
		text-align: right;
	}

	b {
		grid-column: -2;
	}

	small {
		display: none;
		font-size: 0.5em;
		grid-column: -2;
	}

	@media screen and (min-width: 25em) {
		a {
			grid-column: -4 / span 1;
		}

		b {
			grid-column: -3;
		}

		small {
			display: inline-block;
		}
	}
</style>
