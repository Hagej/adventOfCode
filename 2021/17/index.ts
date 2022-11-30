import fs from "fs"

export function one(inputFile: string) {
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file.trim().split(" ")
	let xtar = rows[2]
		.split("=")[1]
		.split("..")
		.map((s) => parseInt(s))
	let ytar = rows[3]
		.split("=")[1]
		.split("..")
		.map((s) => parseInt(s))

	console.log(xtar, ytar)

	let maxHeight = 0
	for (let i = 300; i < 1000; i++) {
		for (let j = 300; j < 1000; j++) {
			let pos = [0, 0]
			let vel = [i, j]
			let ymax = 0
			let hit = false
			while (pos[1] > ytar[1]) {
				pos = [pos[0] + vel[0], pos[1] + vel[1]]
				// if (j === 50) console.log(pos);
				ymax = Math.max(ymax, pos[1])

				if ((pos[0] >= xtar[0] && pos[0] <= xtar[1], pos[1] >= ytar[0] && pos[1] <= ytar[1])) {
					hit = true
					break
				}

				vel = [vel[0] - 1 <= 0 ? 0 : vel[0] - 1, vel[1] - 1]
			}
			if (hit) {
				maxHeight = Math.max(ymax, maxHeight)
			}
		}
	}

	return maxHeight
}

export function two(inputFile: string) {
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file.trim().split(" ")
	let xtar = rows[2]
		.split("=")[1]
		.split("..")
		.map((s) => parseInt(s))
	let ytar = rows[3]
		.split("=")[1]
		.split("..")
		.map((s) => parseInt(s))

	console.log(xtar, ytar)

	let hitVels = 0

	for (let i = 0; i < 1000; i++) {
		for (let j = -1000; j < 1000; j++) {
			let pos = [0, 0]
			let vel = [i, j]
			while (pos[1] >= ytar[0] && pos[0] <= xtar[1]) {
				pos = [pos[0] + vel[0], pos[1] + vel[1]]
				vel = [vel[0] - 1 <= 0 ? 0 : vel[0] - 1, vel[1] - 1]
				if (pos[0] >= xtar[0] && pos[0] <= xtar[1] && pos[1] >= ytar[0] && pos[1] <= ytar[1]) {
					hitVels++
					break
				}

				if (i == 6 && j == 0) console.log(pos)
			}
		}
	}

	return hitVels
}

export const expectedResult = {
	debug: [45, 112],
	input: [],
}
