export async function one(inputFile: string) {
	let result = 0
	const file = Deno.readTextFileSync(inputFile)
	const rows = file.split("\n").map((r) => {
		const row = r
		return r
	})

	let gammaRate = ""
	let epsilonRate = ""

	const amount = rows.length
	const l = rows[0].length

	for (let i = 0; i < l; i++) {
		let sum = 0
		rows.forEach((r) => {
			sum += parseInt(r.charAt(i))
		})

		if (sum > amount / 2) {
			gammaRate = `${gammaRate}1`
			epsilonRate = `${epsilonRate}0`
		} else {
			gammaRate = `${gammaRate}0`
			epsilonRate = `${epsilonRate}1`
		}
	}

	result = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)

	return result
}

export function two(inputFile: string) {
	const file = Deno.readTextFileSync(inputFile)
	const rows = file.split("\n").map((r) => {
		const row = r
		return r
	})

	let oxygenGenRating = [...rows]
	let waterRating = [...rows]

	const l = rows[0].length

	for (let i = 0; i < l; i++) {
		let oones = 0
		let ozeros = 0
		let wones = 0
		let wzeros = 0
		oxygenGenRating.forEach((r, index) => {
			if (parseInt(r.charAt(i)) === 1) {
				oones++
			} else {
				ozeros++
			}
		})
		waterRating.forEach((r, index) => {
			if (parseInt(r.charAt(i)) === 1) {
				wones++
			} else {
				wzeros++
			}
		})
		if (oxygenGenRating.length > 1) {
			if (oones >= ozeros) {
				oxygenGenRating = oxygenGenRating.filter((r) => parseInt(r.charAt(i)) === 1)
			} else if (oones < ozeros) {
				oxygenGenRating = oxygenGenRating.filter((r) => parseInt(r.charAt(i)) === 0)
			}
		}
		if (waterRating.length > 1) {
			if (wones >= wzeros) {
				waterRating = waterRating.filter((r) => parseInt(r.charAt(i)) === 0)
			} else if (wones < wzeros) {
				waterRating = waterRating.filter((r) => parseInt(r.charAt(i)) === 1)
			}
		}
	}

	const result = parseInt(oxygenGenRating[0], 2) * parseInt(waterRating[0], 2)

	return result
}

export const expectedResult = {
	debug: [198, 230],
	input: [2595824, 2135254],
}
