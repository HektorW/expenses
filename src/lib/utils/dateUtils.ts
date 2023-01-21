import { locale } from '$lib/constants/locale'

export function getDateString(date: Date) {
	return date.toUTCString()
}

export function getHtmlDateString(date: Date) {
	return date.toISOString().slice(0, -8)
}

export function getFullDateFormatted(date: Date) {
	return new Intl.DateTimeFormat(locale, {
		dateStyle: 'full',
		timeStyle: 'short'
	}).format(date)
}

export function getRelativeDateFormatted(date: Date) {
	const formatter = new Intl.RelativeTimeFormat(locale, {
		style: 'short',
		numeric: 'auto'
	})

	const difference = Date.now() - date.getTime()

	if (difference < 60 * 1000) {
		return formatter.format(Math.floor(-difference / 1000), 'seconds')
	}

	if (difference < 60 * 60 * 1000) {
		return formatter.format(Math.floor(-difference / (60 * 1000)), 'minutes')
	}

	if (difference < 24 * 60 * 60 * 1000) {
		return formatter.format(Math.floor(-difference / (60 * 60 * 1000)), 'hours')
	}

	return formatter.format(
		Math.floor(-difference / (24 * 60 * 60 * 1000)),
		'days'
	)
}
