<script lang="ts">
	import type { ExpenseWithItems } from '$lib/types/app.types'
	import { getExpenseTotal } from '$lib/utils/expenseUtils'
	import Money from './Money.svelte'

	export let expense: ExpenseWithItems
</script>

<Money amount={getExpenseTotal(expense)} />
