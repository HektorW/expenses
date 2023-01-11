import type { Payment, PersonId } from '../types/app.types'
import { getDateString } from './dateUtils'
import { generateClientId } from './tbdUtils'

export function createNewPayment(byPerson: PersonId, toPerson: PersonId): Payment {
	return {
		clientId: generateClientId(),
		serverId: null,
		synchStatus: null,
		amount: 0,
		currency: 'SEK',
		date: getDateString(new Date()),
		byPerson,
		toPerson
	}
}
