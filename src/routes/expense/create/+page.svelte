<script lang="ts">
	import { enhance } from '$app/forms'
	import PersonIcon from '$lib/components/PersonIcon.svelte'
	import { appStore } from '$lib/stores/appStore'
	import type { PartialNewExpenseItem } from '$lib/types/app.types'
	import { getHtmlDateString } from '$lib/utils/dateUtils'
	import {
		createNewExpenseItem,
		generateExpenseClientId
	} from '$lib/utils/expenseUtils'
	import type { PageData } from './$types'
	import {
		fcnByPersonId,
		fcnDate,
		fcnImage,
		fcnClientId,
		fcnItemClientId,
		getFcnItemTitle,
		getFcnItemAmount,
		getFcnItemForPersonIds
	} from './formControlNames'

	export let data: PageData

	const clientId = generateExpenseClientId()

	let date = getHtmlDateString(new Date())
	let byPersonId = $appStore.lastExpensePersonId ?? data.persons[0]?.id

	let expenses: PartialNewExpenseItem[] = [createNewExpenseItem(data.persons)]

	function onAddExpenseItemClick() {
		expenses.push(createNewExpenseItem(data.persons, expenses))

		expenses = expenses
	}
</script>

<svelte:head>
	<title>Create new expense</title>
</svelte:head>

<a href="/">Back to home</a>

<h1>Create new expense</h1>

<form method="post" use:enhance>
	<input name={fcnClientId} type="hidden" value={clientId} />

	<fieldset>
		<legend>Meta</legend>
		<label for={fcnDate}>Date</label>
		<input
			id={fcnDate}
			name={fcnDate}
			type="datetime-local"
			required
			bind:value={date}
		/>

		<label for={fcnImage}>Image</label>
		<input
			id={fcnImage}
			name={fcnImage}
			type="file"
			accept="image/*"
			capture="environment"
		/>

		<fieldset>
			<legend>By</legend>

			{#each data.persons as person}
				<label>
					<input
						name={fcnByPersonId}
						type="radio"
						value={person.id}
						bind:group={byPersonId}
					/>
					<PersonIcon {person} />
					{person.name}
				</label>
			{/each}
		</fieldset>
	</fieldset>

	{#each expenses as expense}
		{@const fcnItemTitle = getFcnItemTitle(expense.clientId)}
		{@const fcnItemAmount = getFcnItemAmount(expense.clientId)}
		{@const fcnItemForPersonIds = getFcnItemForPersonIds(expense.clientId)}

		<fieldset>
			<input
				name={fcnItemClientId}
				type="hidden"
				bind:value={expense.clientId}
			/>

			<legend>{expense.title ?? ''}</legend>

			<label for={fcnItemTitle}>Title</label>
			<input
				id={fcnItemTitle}
				name={fcnItemTitle}
				type="text"
				required
				bind:value={expense.title}
			/>

			<label for={fcnItemAmount}>Amount</label>
			<input
				id={fcnItemAmount}
				name={fcnItemAmount}
				type="number"
				placeholder="100.00"
				min="0"
				step="1"
				required
				bind:value={expense.amount}
			/>

			<fieldset>
				<legend>For</legend>

				{#each data.persons as person}
					<label>
						<input
							name={fcnItemForPersonIds}
							type="checkbox"
							value={person.id}
							checked
							bind:group={expense.forPersonIds}
						/>
						<PersonIcon {person} />
						{person.name}
					</label>
				{/each}
			</fieldset>
		</fieldset>
	{/each}

	<button type="button" on:click={onAddExpenseItemClick}
		>Add expense item</button
	>

	<button type="submit">Save</button>
</form>
