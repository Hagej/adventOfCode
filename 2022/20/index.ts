import fs from "fs"

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = parseInt(r)
			return row
		})

	const moves = [...rows]
	let locations = moves.map((m, i) => i)
	for (const [index, m] of moves.entries()) {
		if (m === 0) continue
		let prevIndex = locations[index]
		let newIndex = prevIndex + m

		if (m < 0 && newIndex <= 0) {
			const r = newIndex % (moves.length - 1)
			newIndex = r + (moves.length - 1)
		}
		if (m > 0) {
			newIndex = newIndex % (moves.length - 1)
		}
		const item = rows[prevIndex]
		rows.splice(prevIndex, 1)
		rows.splice(newIndex, 0, item)
		if (newIndex > prevIndex) {
			locations = locations.map((l) => (l >= prevIndex && l <= newIndex ? l - 1 : l))
		} else if (newIndex < prevIndex) {
			locations = locations.map((l) => (l <= prevIndex && l >= newIndex ? l + 1 : l))
		}

		locations[index] = newIndex
	}
	const zero = rows.findIndex((r) => r === 0)

	let r1 = (zero + 1000) % rows.length
	let r2 = (zero + 2000) % rows.length
	let r3 = (zero + 3000) % rows.length

	result = rows[r1] + rows[r2] + rows[r3]

	return result
}

export function two(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	let rows = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = parseInt(r)
			return row
		})

	const decryption = 811589153
	rows = rows.map((r) => r * decryption)
	const moves = [...rows]
	let locations = moves.map((m, i) => i)
	for (let x = 0; x < 10; x++) {
		for (const [index, m] of moves.entries()) {
			if (m === 0) continue
			let prevIndex = locations[index]
			let newIndex = prevIndex + m

			if (m < 0 && newIndex <= 0) {
				const r = newIndex % (moves.length - 1)
				newIndex = r + (moves.length - 1)
			}
			if (m > 0) {
				newIndex = newIndex % (moves.length - 1)
			}
			const item = rows[prevIndex]
			rows.splice(prevIndex, 1)
			rows.splice(newIndex, 0, item)
			if (newIndex > prevIndex) {
				locations = locations.map((l) => (l >= prevIndex && l <= newIndex ? l - 1 : l))
			} else if (newIndex < prevIndex) {
				locations = locations.map((l) => (l <= prevIndex && l >= newIndex ? l + 1 : l))
			}

			locations[index] = newIndex
		}
	}
	const zero = rows.findIndex((r) => r === 0)

	let r1 = (zero + 1000) % rows.length
	let r2 = (zero + 2000) % rows.length
	let r3 = (zero + 3000) % rows.length

	result = rows[r1] + rows[r2] + rows[r3]

	return result
}

export const expectedResult = {
	debug: [3],
	input: [],
}
