export async function one(inputFile: string) {
	const file = await Deno.readTextFile(inputFile)
	const rows = file.split("\n").map((r) => {
		return parseInt(r)
	})

	let result = 0
	let cur
	let prev
	for (let i = 0; i < rows.length - 2; i++) {
		cur = rows[i]
		if (prev && cur > prev) {
			result++
		}
		prev = cur
	}

	return result
}

export async function two(inputFile: string) {
	const file = await Deno.readTextFile(inputFile)
	const rows = file.split("\n").map((r) => {
		return parseInt(r)
	})

	let result = 0
	let cur
	let prev
	for (let i = 0; i < rows.length - 2; i++) {
		cur = rows[i] + rows[i + 1] + rows[i + 2]
		if (prev && cur > prev) {
			result++
		}
		prev = cur
	}

	return result
}

export const expectedResult = {
	debug: [7, 5],
	input: [1139, 1103],
}
