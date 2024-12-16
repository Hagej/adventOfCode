import * as utils from "@utils"
import fs from "fs"

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const robots = file
		.trim()
		.split("\n")
		.map((r) => {
			let row = r.split(" ")
			row = row.map((r) => r.split("=")[1])
			const nums = row.map((r) => r.split(",").map((s) => parseInt(s)))

			const robot = {
				position: [nums[0][0], nums[0][1]],
				velocity: [nums[1][0], nums[1][1]]
			}



			return robot
		})



	let width = 101
	let height = 103
	if (inputFile.endsWith("debug")) {
		width = 11
		height = 7
	}

	for (let i = 0; i < 100; i++) {
		for (const bot of robots) {
			bot.position = [
				(((bot.position[0] + bot.velocity[0]) % width) + width) % width,
				(((bot.position[1] + bot.velocity[1]) % height) + height) % height
			]
		}
	}


	let [q1, q2, q3, q4] = [0, 0, 0, 0]
	const hw = Math.floor(width / 2)
	const hh = Math.floor(height / 2)

	for (const bot of robots) {
		if (bot.position[0] < hw) {
			if (bot.position[1] < hh) {
				console.log("q1", bot.position)
				q1++
			} else if (bot.position[1] > hh) {
				console.log("q3", bot.position)
				q3++
			}
		} else if (bot.position[0] > hw) {
			if (bot.position[1] < hh) {
				console.log("q2", bot.position)
				q2++
			} else if (bot.position[1] > hh) {
				console.log("q4", bot.position)
				q4++
			}
		}
	}

	result = q1 * q2 * q3 * q4

	return result
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const robots = file
		.trim()
		.split("\n")
		.map((r) => {
			let row = r.split(" ")
			row = row.map((r) => r.split("=")[1])
			const nums = row.map((r) => r.split(",").map((s) => parseInt(s)))

			const robot = {
				position: [nums[0][0], nums[0][1]],
				velocity: [nums[1][0], nums[1][1]]
			}



			return robot
		})



	let width = 101
	let height = 103
	if (inputFile.endsWith("debug")) {
		width = 11
		height = 7
		return 0
	}

	let map = []
	for (let h = 0; h < height; h++) {
		map.push([])
		for (let w = 0; w < width; w++) {
			map[h].push(".")
		}
	}
	let i = 0
	while (true) {
		i++
		const m: string[][] = JSON.parse(JSON.stringify(map))
		for (const bot of robots) {
			bot.position = [
				(((bot.position[0] + bot.velocity[0]) % width) + width) % width,
				(((bot.position[1] + bot.velocity[1]) % height) + height) % height
			]
			m[bot.position[1]][bot.position[0]] = "#"
		}
		const key = m.map((c) => c.join("")).join("")
		if (key.includes("############")) {
			result = i
			utils.logImage(m)
			break
		}
	}

	return result
}

export const expectedResult = {
	debug: [12, 0],
	input: [],
}
