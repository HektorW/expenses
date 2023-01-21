<script lang="ts">
	import type { PartialNewExpenseItem, Person } from '$lib/types/app.types'
	import type { WithTarget } from '$lib/types/utils.types'
	import {
		fcnItemClientId,
		getFcnItemAmount,
		getFcnItemForPersonIds,
		getFcnItemTitle
	} from '$lib/utils/formControlNames'
	import { createEventDispatcher } from 'svelte'
	import PersonPicker from './PersonPicker.svelte'

	export let isPreview: boolean = false
	export let expenseItem: PartialNewExpenseItem
	export let persons: Person[]

	const dispatch = createEventDispatcher()

	$: fcnItemTitle = getFcnItemTitle(expenseItem.clientId)
	$: fcnItemAmount = getFcnItemAmount(expenseItem.clientId)
	$: fcnItemForPersonIds = getFcnItemForPersonIds(expenseItem.clientId)

	function onAmountInput(event: WithTarget<HTMLInputElement>) {
		expenseItem.amount = parseNumber(event.currentTarget.value)
		expenseItem = expenseItem
	}

	function onAnyInputBlur(
		event: FocusEvent & { currentTarget: HTMLInputElement }
	) {
		if (event.currentTarget.value !== '') {
			dispatch('interaction')
		}
	}

	function parseNumber(numberStr: string): number {
		if (numberStr.trim() === '') {
			return 0
		}

		let decimalFixed = numberStr.replace(',', '.')
		if (decimalFixed[0] === '.') {
			decimalFixed = `0${decimalFixed}`
		}

		return parseFloat(decimalFixed)
	}
</script>

<fieldset class:isPreview>
	{#if !isPreview}
		<input
			name={fcnItemClientId}
			type="hidden"
			bind:value={expenseItem.clientId}
		/>
	{/if}

	<div class="name">
		<input
			id={fcnItemTitle}
			name={fcnItemTitle}
			placeholder="..."
			type="text"
			autocomplete="off"
			data-lpignore="true"
			required={!isPreview}
			on:blur={onAnyInputBlur}
			bind:value={expenseItem.title}
		/>
	</div>

	<div class="amount">
		<input
			lang="dk"
			id={fcnItemAmount}
			name={fcnItemAmount}
			type="text"
			pattern="[0-9]*[,.]?[0-9]*"
			placeholder="0"
			autocomplete="off"
			inputmode="decimal"
			required={!isPreview}
			on:blur={onAnyInputBlur}
			on:input={onAmountInput}
		/>
		<span class="amount__currency">kr</span>
	</div>

	{#if !isPreview}
		<span style:font-size="0.5rem">
			<PersonPicker
				selectMultiple
				title="För"
				name={fcnItemForPersonIds}
				{persons}
				bind:group={expenseItem.forPersonIds}
			/>
		</span>
	{/if}
</fieldset>

<style lang="scss">
	.isPreview:not(:focus-within) {
		opacity: 0.5;
	}

	fieldset {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	input {
		border: 1px solid currentColor;
		font-size: inherit;
		padding: 0.25em;
		width: 100%;

		&:focus-visible {
			outline: 0;
			border-color: var(--color--focus);
		}
	}

	.amount {
		position: relative;

		input {
			border-left: 0;
			padding-right: 1em;
			text-align: right;
		}

		&__currency {
			bottom: 0.25em;
			font-size: 0.75em;
			position: absolute;
			right: 0.25em;
		}
	}
</style>
