import * as utils from "@utils"
import fs from "fs"


export function both(inputFile: string) {
	let [p1, p2] = [0, 0]
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r
			return row
		})


	let t = true
	rows.map((r, index) => {
		const matches = [...r.matchAll(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g)]

		for (const match of matches) {
			if (match[0] === "do()") {
				t = true
			} else if (match[0] === "don't()") {
				t = false
			} else {
				const [a, b] = match[0].match(/\d+/g)
				const product = parseInt(a) * parseInt(b)
				p1 += product
				p2 += t ? product : 0
			}
		}
	})

	return [p1, p2]
}
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


	rows.map((r, index) => {
		const matches = [...r.matchAll(/mul\(\d+,\d+\)/g)]

		for (const match of matches) {
			const [a, b] = match[0].match(/\d+/g)
			result += parseInt(a) * parseInt(b)
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


	let t = true
	rows.map((r, index) => {
		const matches = [...r.matchAll(/mul\(\d+,\d+\)|do\(\)|don't\(\)/g)]

		for (const match of matches) {
			if (match[0] === "do()") {
				t = true
				continue
			}
			else if (match[0] === "don't()") {
				t = false
				continue
			}
			else if (t) {
				const [a, b] = match[0].match(/\d+/g)
				result += parseInt(a) * parseInt(b)
			}


		}
	})

	return result
}

export const expectedResult = {
	debug: [161, 48],
	input: [191183308, 92082041],
}
