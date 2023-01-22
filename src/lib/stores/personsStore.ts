import type { Person } from '$lib/types/app.types'
import { localStorageWritable } from '$lib/utils/storeUtils'

const localStorageKey = 'persons'
const defaultState: Person[] = []

export const persons = localStorageWritable<Person[]>(
	localStorageKey,
	defaultState
)
