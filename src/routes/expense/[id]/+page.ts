import type { PageLoad } from './$types'

export const load = (({ parent }) => {
	return parent()
}) satisfies PageLoad
