# Expenses app

## Features

- Add expense
  - Amount
    - Calculation
  - Title
  - By person
  - Date
  - Items?
  - Image?
  - Place?
  - For persons?
- List expenses
- See standing
- See person details
  - Expenses
  - Payments
  - Standing
- See expense details
- Add payment

## Requirements

- Offline capable
  - Synch when able to
- Free hosting

## UI Requirements

- Easy and quick to add expense
  - Sensible default values
- Highlight unsynched items

## State

```ts
type AppState = {
	expenses: Expense[]
	payments: Payment[]
	persons: Person[]
	lastExpensePersonId?: PersonId | null
	lastPaymentPersonId?: PersonId | null
}

type PersonId = string
type ExpenseClientId = string
type ExpenseServerId = string
type PaymentClientId = string
type PaymentServerId = string
type DateString = string
type ImageBase64 = string
type ColorString = string

type Person = {
	id: PersonId
	name: string
	color: ColorString
}

type Expense = {
	clientId: ExpenseClientId
	serverId: ExpenseServerId | null
	calculation?: string
	expenseItems: ExpenseItem[]
	currency: string
	title: string
	date: DateString
	image: ImageBase64 | null
	byPerson: PersonId
	forPersons: PersonId[]
}

type ExpenseItem = {
	id: string
	title: string
	amount: number
	forPersons: PersonId
}

type Payment = {
	clientId: PaymentClientId
	serverId: PaymentServerId | null
	amount: number
	currency: string
	date: DateString
	byPerson: PersonId
	toPerson: PersonId
}
```

```ts
function createNewExpense(byPerson: PersonId): Expense {
	return {
		clientId: generateClientId(),
		serverId: null,
		expenseItems: [],
		title: '',
		currency: 'SEK',
		date: getDateString(new Date()),
		image: null,
		byPerson,
		forPersons: []
	}
}
```

```ts
function getExpenseTotal(expense: Expense) {
	return expense.expenseItems.reduce((total, item) => total + item.amount, 0)
}

function getDateString(date: Date) {
	return date.toUTCString()
}

function generateClientId() {
	const randomStr = `${Math.random()}`.substring(2)
	return `${Date.now()}-${randomStr}`
}
```

## Synch state

### Add

- Assign client id
- Add locally
- Post to server
  -> On success -> Combine with local
  -> On fail -> Mark as failed synch -> Store error message

### Edit

TBD

### Delete

- If not synched
  - Delete locally
- If synched
  - Mark in local deleted list
  - Post to server
    -> On success -> Delete locally
    -> On fail -> Mark in delete list as failed synch -> Store error message

### Synchronize

- Fetch latest server state
- Merge with local state
- Post all none synched

#### Merge with local state

```ts
const latestServerState = await fetch('/state')
const clientState = getFromSomewhere()

const mergedState = latestServerState.map((serverEntity) => {
	if (hasClientEntity(serverEntity)) {
		return mergeEntity(serverEntity, getClientEntity(serverEntity))
	}

	return createClientEntity(serverEntity)
})

clientState.forEach((clientEntity) => {
	if (!mergedState.includes(clientEntity)) {
		mergedState.push(clientEntity)
	}
})

mergedState.sort()

$appState = derived($)
```

#### Post all none synched

```ts

```
