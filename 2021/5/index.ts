export function two(inputFile: string) {
	let result = 0
	const file = Deno.readTextFileSync(inputFile)
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

	let max = 0
	const lines = rows.map((r, index) => {
		const vals = r.split(" -> ")
		const [x1, y1] = vals[0].split(",").map((v) => parseInt(v))
		const [x2, y2] = vals[1].split(",").map((v) => parseInt(v))
		max = Math.max(max, x1, x2, y1, y2)
		return { from: [x1, y1], to: [x2, y2] }
	})

	let lineVals: number[][] = new Array<Array<number>>(max + 1)
	for (let i = 0; i < lineVals.length; i++) {
		lineVals[i] = new Array(max + 1).fill(0)
	}

	for (const line of lines) {
		if (line.from[0] === line.to[0]) {
			const x = line.from[0]
			for (let y = Math.min(line.from[1], line.to[1]); y <= Math.max(line.from[1], line.to[1]); y++) {
				lineVals[y][x] += 1
			}
		} else if (line.from[1] === line.to[1]) {
			const y = line.from[1]
			for (let x = Math.min(line.from[0], line.to[0]); x <= Math.max(line.from[0], line.to[0]); x++) {
				lineVals[y][x] += 1
			}
		} else if (Math.abs(line.from[0] - line.to[0]) === Math.abs(line.from[1] - line.to[1])) {
			const xdiff = line.to[0] - line.from[0]
			const ydiff = line.to[1] - line.from[1]

			let x = 0,
				y = 0
			for (x = line.from[0], y = line.from[1]; x !== line.to[0]; x += Math.sign(xdiff), y += Math.sign(ydiff)) {
				lineVals[y][x] += 1
			}
			lineVals[y][x] += 1
		}
	}

	lineVals.forEach((val) =>
		val.forEach((l) => {
			if (l >= 2) result++
		}),
	)
	return result
}

export const expectedResult = {
	debug: [5, 12],
	input: [6841, 19258],
}
