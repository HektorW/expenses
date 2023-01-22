<script lang="ts">
	import type { ClientExpense } from '$lib/types/app.types'
	import { getExpenseTotal } from '$lib/utils/expenseUtils'
	import Money from './Money.svelte'

	export let expense: Pick<ClientExpense, 'expenseItems'>
</script>

<Money amount={getExpenseTotal(expense)} />
