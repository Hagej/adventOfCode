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

export function leastCommonMultiple(numbers: number[]) {
	let result = 1
	for (let i = 0; i < numbers.length; i++) {
		result = Math.abs(result * numbers[i]) / greatestCommonDenominator(result, numbers[i])
	}
}

export function greatestCommonDenominator(a: number, b: number) {
	while (b !== 0) {
		const temp = b
		b = a % b
		a = temp
	}
	return Math.abs(a)
}
