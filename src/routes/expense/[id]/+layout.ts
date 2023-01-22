import type { LayoutLoad } from './$types'

export const load = (({ params }) => {
	return { expenseId: params.id }
}) satisfies LayoutLoad
