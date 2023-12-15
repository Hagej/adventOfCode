import * as utils from "@utils"
import { CryptoHasher } from "bun"
import fs from "fs"

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	let rows = file.trim().split(",")

	rows.map((r, index) => {
		const t = hash(r)
		result += t
	})

	return result
}

function hash(str: string) {
	let ascii = 0
	for (let i = 0; i < str.length; i++) {
		ascii = ((ascii + str.charCodeAt(i)) * 17) % 256
	}
	return ascii
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	let rows = file.trim().split(",")

	const boxes = Array.from(Array(256), () => new Array())

	rows.map((r, index) => {
		const label = hash(r.replace("-", "").split("=")[0])

		if (r.match("-")) {
			boxes[label] = boxes[label].filter((b) => b[0] !== r.replace("-", ""))
		} else {
			const lens = r.split("=")

			const f = boxes[label].findIndex((b) => b[0] === lens[0])
			if (f !== -1) {
				boxes[label][f][1] = lens[1]
			} else {
				boxes[label].push(lens)
			}
		}
	})

	for (const [bi, b] of boxes.entries()) {
		const s = b.reduce((bsum, box, i) => bsum + (bi + 1) * (i + 1) * parseInt(box[1]), 0)
		result += s
	}

	return result
}

export const expectedResult = {
	debug: [1320, 145],
	input: [],
}
