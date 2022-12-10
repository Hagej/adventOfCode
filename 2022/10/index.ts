import * as utils from "@utils"
import fs from "fs"

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

	let c = 0
	let x = 1

	rows.map((r, index) => {
		const [op, n] = r.split(" ")
		if (op === "noop") {
			c += 1
			if ((c - 20) % 40 === 0) {
				console.log(c, x)
				result += c * x
			}
		} else {
			for (let i = 2; i > 0; i--) {
				c++
				if ((c - 20) % 40 === 0) {
					console.log(c, x)
					result += c * x
				}
			}

			x += parseInt(n)
		}
	})

	return result
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})

	const image = []
	for (let i = 6; i > 0; i--) image.push([])

	let c = 0
	let x = 1

	rows.map((r, index) => {
		const [op, n] = r.split(" ")
		let print = "."
		if (op === "noop") {
			print = c % 40 >= x - 1 && c % 40 <= x + 1 ? "#" : "."
			image[Math.floor(c / 40)][c % 40] = print
			c += 1
		} else {
			for (let i = 2; i > 0; i--) {
				print = c % 40 >= x - 1 && c % 40 <= x + 1 ? "#" : "."
				image[Math.floor(c / 40)][c % 40] = print
				c++
			}

			x += parseInt(n)
		}
	})

	utils.logImage(image)

	return result
}

export const expectedResult = {
	debug: [13140],
	input: [],
}
