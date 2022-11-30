/**
 * Compare two arrays of strings
 * @returns The amount of strings that only exists in one array
 */
export function strArrayCompare(a: string[], b: string[]): number {
	const c = [...b]
	a.forEach((str) => {
		const index = c.findIndex((val) => val === str)
		if (index !== -1) c.splice(index)
	})

	return Math.max(a.length, b.length) - c.length
}

/**
 * Compare two arrays of strings
 * @returns True if the array contents are the same
 */
export function strArrayEquals(a: string[], b: string[]): boolean {
	return strArrayCompare(a, b) === Math.max(a.length, b.length)
}
