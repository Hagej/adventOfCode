/**
 * @returns the sum of an number array
 */
export function sum(a: number[]) {
	return a.reduce((sum, cur) => sum + cur, 0)
}

/**
 * @returns the product of all number in an number array
 */
export function product(a: number[]) {
	return a.reduce((sum, cur) => sum * cur, 1)
}
