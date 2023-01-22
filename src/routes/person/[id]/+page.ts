import type { PageLoad } from './$types'

export const load = (({ params }) => {
	return { personId: params.id }
}) satisfies PageLoad
