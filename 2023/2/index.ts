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

	rows.map((r, index) => {
		r = r.substring(5)
		const id = parseInt(r)

		const balls = r
			.split(":")[1]
			.split(";")
			.map((b) => b.split(","))

		let giltig = true
		for (const b of balls) {
			b.forEach((ball) => {
				const amount = parseInt(ball)
				if (ball.includes("red") && amount > 12) giltig = false
				if (ball.includes("green") && amount > 13) giltig = false
				if (ball.includes("blue") && amount > 14) giltig = false
			})
		}
		if (!giltig) return
		result += id
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

	rows.map((r, index) => {
		r = r.substring(5)

		const balls = r
			.split(":")[1]
			.split(";")
			.map((b) => b.split(","))

		let highest = [0, 0, 0]
		for (const b of balls) {
			b.forEach((ball) => {
				const amount = parseInt(ball)
				if (ball.includes("red")) highest[0] = Math.max(highest[0], amount)
				if (ball.includes("green")) highest[1] = Math.max(highest[1], amount)
				if (ball.includes("blue")) highest[2] = Math.max(highest[2], amount)
			})
		}
		let pow = 0
		for (const h of highest) {
			pow = pow === 0 ? h : pow * h
		}
		result += pow
	})

	return result
}

export const expectedResult = {
	debug: [8, 2286],
	input: [],
}
