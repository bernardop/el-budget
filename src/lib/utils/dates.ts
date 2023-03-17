import { Temporal } from '@js-temporal/polyfill'

export function yearMonthToLongString(
	yearMonth: string | Temporal.PlainYearMonth | Temporal.PlainYearMonthLike | null | undefined
) {
	try {
		const plainYearMonth = Temporal.PlainYearMonth.from(yearMonth || '')
		const { calendar } = plainYearMonth

		return plainYearMonth.toLocaleString('en-US', {
			calendar,
			month: 'long',
			year: 'numeric'
		})
	} catch {
		return ''
	}
}

export function plainDateToMMDDYYY(dateString: string | null) {
	return dateString ? Temporal.PlainDate.from(dateString).toLocaleString('en-US') : ''
}
