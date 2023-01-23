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
		--size-person: auto;
		--size-title: 1fr;
		--size-price: auto;
		--size-date: 4.5rem;

		--template-columns: var(--size-title) var(--size-price);

		align-items: baseline;
		display: grid;
		grid-template-columns: var(--template-columns);

		&.withPerson {
			--template-columns: var(--size-person) var(--size-title) var(--size-price);

			a {
				padding-inline-start: 0.5em;
			}
		}

		&.unsynched {
			opacity: 0.6;
		}
	}

	a {
		overflow: hidden;
		padding-inline-end: 0.5em;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	b,
	small {
		text-align: right;
	}

	small {
		display: none;
		font-size: 0.5em;
	}

	@media screen and (min-width: 25em) {
		li {
			--template-columns: var(--size-title) var(--size-price) var(--size-date);

			&.withPerson {
				--template-columns: var(--size-person) var(--size-title)
					var(--size-price) var(--size-date);
			}
		}

		small {
			display: inline-block;
		}
	}
</style>
