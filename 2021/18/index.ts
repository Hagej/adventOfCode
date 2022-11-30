import fs from "fs"
export function one(inputFile: string) {
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			return r
		})

	let fish = rows[0]
	for (let i = 0; i < rows.length; i++) {
		if (i != rows.length - 1) {
			fish = addFish(fish, rows[i + 1])
		}
		let splits = true
		while (splits) {
			fish = findExplosions(fish)
			const r = findSplits(fish)
			fish = r[0]
			splits = r[1]
		}
	}

	return fishMagnitude(fish)[0]
}

export function two(inputFile: string) {
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows = file
		.trim()
		.split("\n")
		.map((r) => {
			return r
		})

	let maxMagnitude = 0
	for (let i = 0; i < rows.length - 1; i++) {
		for (let j = 0; j < rows.length; j++) {
			if (i === j) continue
			let fish = addFish(rows[i], rows[j])

			let splits = true
			while (splits) {
				fish = findExplosions(fish)
				const r = findSplits(fish)
				fish = r[0]
				splits = r[1]
			}
			maxMagnitude = Math.max(maxMagnitude, fishMagnitude(fish)[0])
		}
	}

	return maxMagnitude
}

function addFish(fish1: string, fish2: string) {
	return `[${fish1},${fish2}]`
}

function findExplosions(fish: string) {
	let recDepth = 0
	for (let j = 0; j < fish.length; j++) {
		if (fish[j] === "[") {
			recDepth++
			if (recDepth > 4) {
				fish = explode(fish, j)
				j = -1
				recDepth = 0
				continue
			}
		} else if (fish[j] === "]") {
			recDepth--
		}
	}
	return fish
}

function findSplits(fish: string): [string, boolean] {
	for (let j = 0; j < fish.length; j++) {
		const num = parseInt(fish.substr(j))
		if (!isNaN(num) && num > 9) {
			fish = split(fish, j)
			return [fish, true]
		}
	}
	return [fish, false]
}

function split(fish: string, index: number) {
	const number = parseInt(fish.substr(index, 2))
	const half = number / 2
	const left = Math.floor(half)
	const right = number - left
	return `${fish.substring(0, index)}[${left},${right}]${fish.substring(index + 2)}`
}

function explode(fish: string, index: number) {
	const first = parseInt(fish.substr(index + 1))
	const pair = [first, first > 9 ? parseInt(fish.substr(index + 4)) : parseInt(fish.substr(index + 3))]
	const firstLen = pair[0] > 9 ? 2 : 1
	const secondLen = pair[1] > 9 ? 2 : 1
	const pairWidth = firstLen + secondLen + 3
	let leftSum = 0
	let leftIndex
	let leftOldLength = 1
	for (let i = index; i > 0; i--) {
		if (!isNaN(parseInt(fish[i]))) {
			if (!isNaN(parseInt(fish[i - 1]))) {
				leftSum = parseInt(fish.substr(i - 1, 2)) + pair[0]
				leftIndex = i - 1
				leftOldLength = 2
			} else {
				leftSum = parseInt(fish[i]) + pair[0]
				leftIndex = i
			}
			break
		}
	}
	let rightSum = 0
	let rightIndex
	let rightOld = 0
	for (let i = index + pairWidth; i < fish.length; i++) {
		rightOld = parseInt(fish.substr(i))
		if (!isNaN(rightOld)) {
			rightSum = rightOld + pair[1]
			rightIndex = i
			break
		}
	}

	let rightOldLength = rightOld > 9 ? 2 : 1
	let right = fish.substr(index + pairWidth)
	if (rightIndex) {
		right = `${fish.substring(index + pairWidth, rightIndex)}${rightSum}${fish.substring(rightIndex + rightOldLength)}`
	}

	let left = fish.substring(0, index)
	if (leftIndex) {
		left = `${fish.substring(0, leftIndex)}${leftSum}${fish.substring(leftIndex + leftOldLength, index)}`
	}

	return `${left}0${right}`
}

function fishMagnitude(fish: string): [number, number] {
	const pair = []
	let index = 0
	while (index < fish.length) {
		const char = fish[index]
		if (char === "[") {
			const r = fishMagnitude(fish.substr(index + 1))
			index = index + r[1]
			pair.push(r[0])
		} else if (!isNaN(parseInt(char))) {
			pair.push(parseInt(char))
		}
		index += 1
		if (pair.length === 2) {
			return [pair[0] * 3 + pair[1] * 2, index + 1]
		}
	}
	return pair as [number, number]
}

export const expectedResult = {
	debug: [4140, 3993],
	input: [],
}
