<script lang="ts">
	import EditExpenseItem from '$lib/components/EditExpenseItem.svelte'
	import PersonPicker from '$lib/components/PersonPicker.svelte'
	import { appStore } from '$lib/stores/appStore'
	import type { PartialNewExpenseItem } from '$lib/types/app.types'
	import { getHtmlDateString } from '$lib/utils/dateUtils'
	import {
		createNewExpenseItem,
		generateExpenseClientId,
		getExpenseTotal
	} from '$lib/utils/expenseUtils'
	import {
		fcnByPersonId,
		fcnDate,
		fcnImage,
		fcnClientId,
		fcnTitle
	} from '$lib/utils/formControlNames'
	import RouteTitle from '$lib/components/RouteTitle.svelte'
	import Money from '$lib/components/Money.svelte'
	import type { WithTarget } from '$lib/types/utils.types'
	import { addExpense } from '$lib/api/synchronize'
	import { goto } from '$app/navigation'
	import { persons } from '$lib/stores/personsStore'

	const clientId = generateExpenseClientId()

	let date = getHtmlDateString(new Date())
	let byPersonId = getInitialByPersonId()

	let expenseItems: PartialNewExpenseItem[] = [createNewExpenseItem($persons)]

	$: total = getExpenseTotal({
		expenseItems: expenseItems
	})

	function getInitialByPersonId() {
		if (
			typeof window !== 'undefined' &&
			window.history &&
			window.history.state &&
			typeof window.history.state.byPersonId === 'string'
		) {
			return window.history.state.byPersonId
		}

		return $appStore.lastExpensePersonId ?? $persons[0]?.id
	}

	function addPreviewExpenseItem() {
		expenseItems.push(createNewExpenseItem($persons, expenseItems))
		expenseItems = expenseItems
	}

	function handleSubmit(event: WithTarget<HTMLFormElement>) {
		const formData = new FormData(event.currentTarget)
		addExpense(formData)
		goto('/')
	}
</script>

<RouteTitle title="Nytt utlägg" />

<a href="/">← Tillbaka till start</a>

<h1>Nytt utlägg</h1>

<form method="post" autocomplete="off" on:submit|preventDefault={handleSubmit}>
	<input name={fcnClientId} type="hidden" value={clientId} />

	<label class="title">
		Titel <span>(valfritt)</span>
		<input
			name={fcnTitle}
			type="text"
			placeholder="Coop, eller nåt..."
			data-lpignore="true"
		/>
	</label>

	<PersonPicker
		title="Betalat av"
		name={fcnByPersonId}
		persons={$persons}
		bind:group={byPersonId}
	/>

	<div class="expense-items">
		<h2>
			<span>Namn</span>
			<span>Pris</span>
		</h2>

		{#each expenseItems as expenseItem, index}
			{@const isPreview = index > 0 && index === expenseItems.length - 1}
			{@const shouldCreateNewPreviewOnInteraction =
				isPreview || (index === 0 && expenseItems.length === 1)}

			<EditExpenseItem
				bind:expenseItem
				{isPreview}
				persons={$persons}
				on:interaction={shouldCreateNewPreviewOnInteraction
					? addPreviewExpenseItem
					: undefined}
			/>
		{/each}
	</div>

	<h2>Totalt: <Money amount={total} /></h2>

	<fieldset>
		<div>
			<label for={fcnDate}>Datum</label>
			<input
				id={fcnDate}
				name={fcnDate}
				type="datetime-local"
				required
				bind:value={date}
			/>
		</div>

		<div>
			<label for={fcnImage}>Bild</label>
			<input
				id={fcnImage}
				name={fcnImage}
				type="file"
				accept="image/*"
				capture="environment"
			/>
		</div>
	</fieldset>

	<button type="submit">Lägg till</button>
</form>

<style lang="scss">
	h1 {
		font-size: 1rem;
	}

	.title {
		display: block;
		margin-block: 1rem;

		span {
			font-size: 0.75em;
		}

		input {
			background: none;
			border: 0;
			border-bottom: 1px solid currentColor;
			padding: 0.5em;
			width: 100%;

			&:focus-visible {
				border-bottom-color: var(--color--focus);
				box-shadow: 0 1px var(--color--focus);
				outline: none;
			}
		}
	}

	.expense-items {
		margin-block: 1rem;

		h2 {
			display: grid;
			font-size: 0.5rem;
			grid-template-columns: 1fr 1fr;
			margin: 0;
		}
	}

	input[type='file'] {
		width: 100%;
	}

	button[type='submit'] {
		background-color: var(--color--primary);
		border: 0;
		border-radius: 8px;
		font-size: inherit;
		margin-top: 1rem;
		padding: 0.5em;
		width: 100%;
	}
</style>
