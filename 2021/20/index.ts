import * as utils from "../../utils/index.ts"

export function one(inputFile: string) {
	let result = 0
	const file = Deno.readTextFileSync(inputFile)
	const [algo, inputData] = file
		.trim()
		.split("\n\n")
		.map((r) => {
			const row = r
			return row
		})

	let input = inputData
		.trim()
		.split("\n")
		.map((v) => v.split(""))

	const output: string[][] = Array.from(Array(input.length), () => new Array(input[0].length).fill("."))
	const inf = algo[0]
	for (let amount = 0; amount < 2; amount++) {
		const sign = amount % 2 === 1 ? inf : "."
		for (let i = 0; i < output.length; i++) {
			for (let add = 0; add < 2; add++) {
				output[i].unshift(sign)
				output[i].push(sign)
			}
		}

		for (let add = 0; add < 2; add++) {
			output.unshift(Array(output[0].length).fill(sign))
			output.push(Array(output[0].length).fill(sign))
		}

		let height = output.length
		let width = output[0].length
		for (let i = 0; i < height; i++) {
			for (let j = 0; j < width; j++) {
				let bin = ""
				for (const [dy, dx] of [
					[-1, -1],
					[-1, 0],
					[-1, 1],
					[0, -1],
					[0, 0],
					[0, 1],
					[1, -1],
					[1, 0],
					[1, 1],
				]) {
					const x = dx - 2 + j
					const y = dy - 2 + i
					if (x < 0 || x >= input[0].length || y < 0 || y >= input.length) {
						bin = `${bin}${sign === "#" ? 1 : 0}`
						continue
					}
					bin = `${bin}${input[y][x] === "#" ? "1" : "0"}`
				}

				const index = parseInt(bin, 2)
				output[i][j] = algo[index]
			}
		}

		const copy = []

		for (let i = 0; i < output.length; i++) {
			copy.push([...output[i]])
		}
		input = [...copy]
	}

	for (let i = 0; i < output.length - 0; i++) {
		for (let j = 0; j < output[i].length - 0; j++) {
			if (output[i][j] === "#") result++
		}
	}

	return result
}

export function two(inputFile: string) {
	let result = 0
	const file = Deno.readTextFileSync(inputFile)
	const [algo, inputData] = file
		.trim()
		.split("\n\n")
		.map((r) => {
			const row = r
			return row
		})

	let input = inputData
		.trim()
		.split("\n")
		.map((v) => v.split(""))

	const output: string[][] = Array.from(Array(input.length), () => new Array(input[0].length).fill("."))
	const inf = algo[0]
	for (let amount = 0; amount < 50; amount++) {
		const sign = amount % 2 === 1 ? inf : "."
		for (let i = 0; i < output.length; i++) {
			for (let add = 0; add < 2; add++) {
				output[i].unshift(sign)
				output[i].push(sign)
			}
		}

		for (let add = 0; add < 2; add++) {
			output.unshift(Array(output[0].length).fill(sign))
			output.push(Array(output[0].length).fill(sign))
		}

		let height = output.length
		let width = output[0].length
		for (let i = 0; i < height; i++) {
			for (let j = 0; j < width; j++) {
				let bin = ""
				for (const [dy, dx] of [
					[-1, -1],
					[-1, 0],
					[-1, 1],
					[0, -1],
					[0, 0],
					[0, 1],
					[1, -1],
					[1, 0],
					[1, 1],
				]) {
					const x = dx - 2 + j
					const y = dy - 2 + i
					if (x < 0 || x >= input[0].length || y < 0 || y >= input.length) {
						bin = `${bin}${sign === "#" ? 1 : 0}`
						continue
					}
					bin = `${bin}${input[y][x] === "#" ? "1" : "0"}`
				}

				const index = parseInt(bin, 2)
				output[i][j] = algo[index]
			}
		}

		const copy = []

		for (let i = 0; i < output.length; i++) {
			copy.push([...output[i]])
		}
		input = [...copy]
	}

	for (let i = 0; i < output.length - 0; i++) {
		for (let j = 0; j < output[i].length - 0; j++) {
			if (output[i][j] === "#") result++
		}
	}

	return result
}

export const expectedResult = {
	debug: [],
	input: [],
}
