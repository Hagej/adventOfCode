export function strArrayCombine(a: string[], b: (number | string)[]): string[] {
	const result = []
	for (const aVal of a) {
		for (const bVal of b) {
			result.push(`${aVal}${bVal}`)
		}
	}
	return result
}

/**
 * @returns an array containing all the sums of all the possible pairs of values between the arrays
 */
export function numArrayCombine(a: number[], b: number[]) {
	const result = []
	for (const aVal of a) {
		for (const bVal of b) {
			result.push(aVal + bVal)
		}
	}
	return result
}

/**
 * @returns an array containing all the possible sums of values within the array
 */
export function numArrayCombinations(numbers: number[]): number[] {
	const result = []
	for (let i = 0; i < numbers.length; i++) {
		for (let j = i + 1; j < numbers.length; j++) {
			result.push(numbers[i] + numbers[j])
		}
	}
	return result
}

export function permutations(numbers: number[]): Array<number[]> {
	let result: Array<number[]> = []
	if (numbers.length === 0) return result
	if (numbers.length === 1) return [numbers]

	for (let i = 0; i < numbers.length; i++) {
		const currentNum = numbers[i]
		const remainingNums = numbers.slice(0, i).concat(numbers.slice(i + 1))
		const remainingNumsPermuted = permutations(remainingNums)
		for (let j = 0; j < remainingNumsPermuted.length; j++) {
			const permutedArray = [currentNum, ...remainingNumsPermuted[j]]
			result.push(permutedArray)
		}
	}
	return result
}

export function union(a: Array<string | number | boolean>, b: Array<string | number | boolean>) {
	return [...new Set([...a, ...b])]
}

export function partition<T>(array: T[], filter: (t: T) => boolean) {
	const [hit, miss]: [T[], T[]] = [[], []]
	for (const item of array) {
		if (filter(item)) {
			hit.push(item)
		} else {
			miss.push(item)
		}
	}
	return [hit, miss]
}