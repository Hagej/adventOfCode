export function strArrayCombine(a: string[], b: (number | string)[]): string[] {
	const result = []
	for (const aVal of a) {
		for (const bVal of b) {
			result.push(aVal + bVal)
		}
	}
	return result
}

export function numArrayCombine(a: number[], b: number[]) {
	const result = []
	for (const aVal of a) {
		for (const bVal of b) {
			result.push(aVal + bVal)
		}
	}
	return result
}

export function numArrayCombinations(numbers: number[]): number[] {
	const result = []
	for (let i = 0; i < numbers.length; i++) {
		for (let j = i + 1; j < numbers.length; j++) {
			result.push(numbers[i] + numbers[j])
		}
	}
	return result
}

// export function numArrayPermutations(numbers: number[]): Array<number[]> {
// 	const result = []
// 	for (let i = 0; i < numbers.length; i++) {
// 		for (let j = 0; j < numbers.length; j++) {

// 			result.push(numbers[i] + numbers[j])
// 		}
// 	}
// 	return result
// }

function union<T>(a: T[], b: T[]) {
	const result = a
	for (const val of b) {
		if (!result.includes(val)) {
			result.push(val)
		}
	}
	return result
}
