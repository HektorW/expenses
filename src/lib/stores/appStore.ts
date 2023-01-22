import { localStorageWritable } from '$lib/utils/storeUtils'

import type { AppSynchStatus, PersonId } from '../types/app.types'

type AppStoreState = {
	lastExpensePersonId?: PersonId | null
	lastPaymentPersonId?: PersonId | null

	synchStatus: AppSynchStatus
}

const localStorageKey = 'app'
const defaultState: AppStoreState = {
	lastExpensePersonId: null,
	lastPaymentPersonId: null,

	synchStatus: 'offline'
}

export const appStore = localStorageWritable(localStorageKey, defaultState)
