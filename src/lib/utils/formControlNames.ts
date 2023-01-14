export const fcnClientId = 'clientId'

export const fcnTitle = 'title'
export const fcnByPersonId = 'byPersonId'
export const fcnDate = 'date'
export const fcnImage = 'image'

export const fcnItemClientId = 'itemId'
export const getFcnItemTitle = (itemId: string) => `${itemId}-title`
export const getFcnItemAmount = (itemId: string) => `${itemId}-amount`
export const getFcnItemForPersonIds = (itemId: string) =>
	`${itemId}-itemForPersonIds`
