export function getDateString(date: Date) {
	return date.toUTCString()
}

export function getHtmlDateString(date: Date) {
	return date.toISOString().slice(0, -8)
}
