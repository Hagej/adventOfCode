import fs from "fs"

let width = 0
let height = 0

export function one(inputFile: string) {
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split("").map((r) => parseInt(r))
			return row
		})

	width = rows[0].length
	height = rows.length

	const weights = Array.from(Array(height), () => Array(width))
	weights[0][0] = 0

	const visited: Record<string, boolean> = {}
	const Q: Array<[number, number]> = [[0, 0]]

	const dirs = [
		[-1, 0],
		[0, -1],
		[1, 0],
		[0, 1],
	]

	while (Q.length > 0) {
		const curPos = Q.shift()
		if (!curPos) break
		visited[`${curPos[0]},${curPos[1]}`] = true
		for (const [dx, dy] of dirs) {
			const xx = curPos[0] + dx
			const yy = curPos[1] + dy
			const curWeight = weights[curPos[1]][curPos[0]]
			if (!visited[`${xx},${yy}`] && xx >= 0 && xx < width && yy >= 0 && yy < height) {
				if (typeof weights[yy][xx] === "number") {
					if (weights[yy][xx] > curWeight + rows[yy][xx]) {
						weights[yy][xx] = curWeight + rows[yy][xx]
						Q.push([xx, yy])
					}
				} else {
					weights[yy][xx] = curWeight + rows[yy][xx]
					Q.push([xx, yy])
				}
			}
		}
	}

	return weights[height - 1][width - 1]
}

export function two(inputFile: string) {
	const file = fs.readFileSync(inputFile, "utf-8")
	let rows = file
		.trim()
		.split("\n")
		.map((r) => {
			let values = r.split("").map((r) => parseInt(r))
			let row = values
			for (let i = 0; i < 4; i++) {
				values = values.map((v) => (v + 1 === 10 ? 1 : v + 1))
				row = [...row, ...values]
			}
			return row
		})
	let values = [...rows]
	for (let i = 0; i < 4; i++) {
		values = values.map((r) => r.map((v) => (v + 1 === 10 ? 1 : v + 1)))
		rows = [...rows, ...values]
	}

	width = rows[0].length
	height = rows.length

	const weights = Array.from(Array(height), () => Array(width))
	weights[0][0] = 0

	const visited: Record<string, boolean> = {}
	const Q: Array<[number, number]> = [[0, 0]]

	const dirs = [
		[-1, 0],
		[0, -1],
		[1, 0],
		[0, 1],
	]

	while (Q.length > 0) {
		const curPos = Q.pop()
		if (!curPos) break
		visited[`${curPos[0]},${curPos[1]}`] = true
		const curWeight = weights[curPos[1]][curPos[0]]
		for (const [dx, dy] of dirs) {
			const xx = curPos[0] + dx
			const yy = curPos[1] + dy
			if (xx >= 0 && xx < width && yy >= 0 && yy < height) {
				if (typeof weights[yy][xx] === "number") {
					if (weights[yy][xx] > curWeight + rows[yy][xx]) {
						weights[yy][xx] = curWeight + rows[yy][xx]
						Q.unshift([xx, yy])
					}
				} else {
					weights[yy][xx] = curWeight + rows[yy][xx]
					if (!visited[`${xx},${yy}`]) Q.unshift([xx, yy])
				}
			}
		}
	}

	return weights[height - 1][width - 1]
}

export const expectedResult = {
	debug: [40, 315],
	input: [707, 2942],
}
