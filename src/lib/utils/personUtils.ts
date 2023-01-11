import type { Person, PersonId } from '$lib/types/app.types'

export function getPersonInitials(person: Person) {
	return person.name[0].toUpperCase()
}

export function getPerson(allPersons: Person[], personId: PersonId) {
	return allPersons.find((person) => person.id === personId) ?? null
}
