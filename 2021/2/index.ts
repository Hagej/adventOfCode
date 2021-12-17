export function one(inputFile: string) {
	let result = 0
	const file = Deno.readTextFileSync(inputFile)
	const rows: Array<[string, number]> = file.split("\n").map((r) => {
		const row = r.split(" ")
		return [row[0], parseInt(row[1])]
	})

	let hp = 0
	let vp = 0

	rows.map(([instruction, amount]) => {
		if (instruction === "forward") {
			hp += amount
		}
		if (instruction === "down") {
			vp += amount
		}
		if (instruction === "up") {
			vp -= amount
		}
	})

	result = vp * hp

	return result
}

export function two(inputFile: string) {
	let result = 0
	const file = Deno.readTextFileSync(inputFile)
	const rows: Array<[string, number]> = file.split("\n").map((r) => {
		const row = r.split(" ")
		return [row[0], parseInt(row[1])]
	})

	let hp = 0
	let vp = 0
	let aim = 0

	rows.map(([instruction, amount]) => {
		if (instruction === "forward") {
			hp += amount
			vp += aim * amount
		}
		if (instruction === "down") {
			aim += amount
		}
		if (instruction === "up") {
			aim -= amount
		}
	})

	result = vp * hp

	return result
}

export const expectedResult = {
	debug: [150, 900],
	input: [2070300, 2078985210],
}
