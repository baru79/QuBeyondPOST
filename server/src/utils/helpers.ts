const isNumeric = (value: any): boolean => /^-?\d+$/.test(value)

export const compare = (a: string, b: string, order: string): number => {
	if (isNumeric(a) && isNumeric(b)) {
		if (order === 'asc') return parseInt(a, 10) - parseInt(b, 10)
		if (order === 'desc') return parseInt(b, 10) - parseInt(a, 10)
	}
	if (order === 'asc') return a.localeCompare(b)
	if (order === 'desc') return b.localeCompare(a)
	return 0
}
