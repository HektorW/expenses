<script lang="ts">
	import type { PartialNewExpenseItem, Person } from '$lib/types/app.types'
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

	function onAnyInputBlur(
		event: FocusEvent & { currentTarget: HTMLInputElement }
	) {
		if (event.currentTarget.value !== '') {
			dispatch('interaction')
		}
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
		<!-- <label for={fcnItemTitle}>Namn</label> -->
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
		<!-- <label for={fcnItemAmount}>Pris</label> -->
		<input
			id={fcnItemAmount}
			name={fcnItemAmount}
			type="number"
			placeholder="0"
			min="0"
			step="0.01"
			autocomplete="off"
			required={!isPreview}
			on:blur={onAnyInputBlur}
			bind:value={expenseItem.amount}
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
