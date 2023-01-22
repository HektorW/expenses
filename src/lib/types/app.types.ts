import type {
	Expense as DBExpense,
	ExpenseItem as DBExpenseItem,
	Payment as DBPayment,
	Person as DBPerson
} from '@prisma/client'

export type PaymentId = DBPayment['id']
export type PaymentClientId = DBPayment['clientId']
export type DateString = string
export type ImageBase64 = string
export type ColorString = string
/** From `serializeFormData` */
export type SerializedFormData = string

export type SynchStatus = 'synched' | 'unsynched' | 'synching'
export type SynchFailMessage = { dateStr: string; message: string }

export type AppSynchStatus = SynchStatus | 'offline'

//
// Person
//
export type { DBPerson }
export type PersonId = DBPerson['id']

export type Person = DBPerson

//
// Expense
//
export type { DBExpense }
export type ExpenseId = DBExpense['id']
export type ExpenseClientId = DBExpense['clientId']

export type Expense = DBExpense
export type ExpenseWithItems = Expense & { expenseItems: ExpenseItem[] }

export type ClientExpense = Omit<Expense, 'id'> & {
	expenseItems: (NewExpenseItem | ExpenseItem)[]
	id?: ExpenseId
	serializedFormData?: SerializedFormData
	synchStatus: SynchStatus
	synchFailMessages: SynchFailMessage[]
}

export type JsonClientExpense = Omit<ClientExpense, 'date'> & {
	date: DateString
}

export type ApiExpense = Omit<ExpenseWithItems, 'date'> & {
	date: DateString
}

export type NewExpense = Pick<
	ExpenseWithItems,
	'clientId' | 'byPersonId' | 'title'
> & {
	dateStr: DateString
	expenseItems: NewExpenseItem[]
}

export type DeletedExpense = {
	id: ExpenseId
	dateStr: DateString
}

//
// ExpenseItem
//
export type { DBExpenseItem }
export type ExpenseItemId = DBExpenseItem['id']

export type ExpenseItem = DBExpenseItem

export type NewExpenseItem = Pick<
	DBExpenseItem,
	'amount' | 'forPersonIds' | 'title'
> & {
	clientId: string
}

export type PartialNewExpenseItem = Pick<NewExpenseItem, 'clientId'> &
	Partial<Omit<NewExpenseItem, 'clientId'>>

//
// Payment
//

// export type Person = {
// 	id: PersonId
// 	name: string
// 	color: ColorString
// }

// export type Expense = {
// 	clientId: ExpenseClientId
// 	serverId: ExpenseId | null
// 	synchStatus: SynchStatus
// 	calculation?: string
// 	expenseItems: ExpenseItem[]
// 	currency: string
// 	title: string
// 	date: DateString
// 	image: ImageBase64 | null
// 	byPerson: PersonId
// 	forPersons: PersonId[]
// }

// export type ExpenseItem = {
// 	id: string
// 	title: string
// 	amount: number
// 	forPersons: PersonId
// }

// export type Payment = {
// 	clientId: PaymentClientId
// 	serverId: PaymentId | null
// 	synchStatus: SynchStatus
// 	amount: number
// 	currency: string
// 	date: DateString
// 	byPerson: PersonId
// 	toPerson: PersonId
// }
