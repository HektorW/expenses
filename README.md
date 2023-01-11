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
