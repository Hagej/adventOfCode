import * as utils from "../../utils/index.ts"

type Vec3 = [number, number, number]

export function one(inputFile: string) {
	const file = Deno.readTextFileSync(inputFile)
	const rows: [number, number, number][][] = file
		.trim()
		.split("\n\n")
		.map((g) =>
			g
				.split("\n")
				.filter((r) => !r.startsWith("---"))
				.map((r) => {
					const [x, y, z] = r.split(",").map((i) => parseInt(i))
					return [x, y, z]
				}),
		)

	const positions: Record<string, Vec3> = { "0": [0, 0, 0] }
	const beacons = new Set<string>()
	for (const r of rows[0]) {
		beacons.add(`${r[0]},${r[1]},${r[2]}`)
	}

	const visited = new Set()
	visited.add(0)

	const i = 0
	while (Object.keys(positions).length < rows.length) {
		for (let j = 1; j < rows.length; j++) {
			if (visited.has(j)) continue

			const distances: number[][][] = []

			distances.push(Array.from(Array(rows[0].length), () => Array(rows[0].length).fill(0)))
			for (let r = 0; r < rows[0].length; r++) {
				for (let c = 0; c < rows[0].length; c++) {
					const d = distance(rows[0][r], rows[0][c])
					distances[0][r][c] = d
					distances[0][c][r] = d
				}
			}
			distances.push(Array.from(Array(rows[j].length), () => Array(rows[j].length).fill(0)))
			for (let r = 0; r < rows[j].length; r++) {
				for (let c = 0; c < rows[j].length; c++) {
					const d = distance(rows[j][r], rows[j][c])
					distances[1][r][c] = d
					distances[1][c][r] = d
				}
			}

			let ik, il
			let maxLength = 0
			for (let k = 0; k < rows[0].length; k++) {
				for (let l = 0; l < rows[j].length; l++) {
					const inter = intersection(distances[0][k], distances[1][l])
					if (inter.length >= 12 && maxLength < inter.length) {
						maxLength = inter.length
						ik = k
						il = l
					}
				}
			}
			if (typeof ik === "number" && typeof il === "number") {
				const mapping: [number, number][] = []
				for (let k = 0; k < rows[0].length; k++) {
					for (let l = 0; l < rows[j].length; l++) {
						if (distances[1][il][l] === distances[0][ik][k]) {
							let samesies = false
							xloop: for (let x = 0; x < distances[1][il].length; x++) {
								for (let y = x + 1; y < distances[1][il].length; y++) {
									if (distances[1][il][x] === distances[1][il][y]) {
										samesies = true
										break xloop
									}
								}
							}

							if (samesies) {
								const i1 = intersection(distances[0][k], distances[1][l]).length
								const temp = ik
								const index = distances[1][ik].slice(l).findIndex((v) => v === distances[1][temp][l]) as number
								const i2 = intersection(distances[0][index], distances[1][l]).length

								console.log(i1, i2)
								if (i1 >= i2) {
									mapping.push([k, l])
								} else {
									mapping.push([index, l])
								}
							} else {
								mapping.push([k, l])
							}
						}
					}
				}
				const [m1, m2] = mapping
				const r = findRotation(rows[i][m1[0]], rows[i][m2[0]], rows[j][m1[1]], rows[j][m2[1]])
				const pos = findScannerPosition(rows[i][m1[0]], rows[j][m1[1]], r)
				positions[j] = pos
				for (let k = 0; k < rows[j].length; k++) {
					const beaconPos = findBeaconPosition(pos, rows[j][k], r)
					rows[j][k] = beaconPos
					beacons.add(`${beaconPos[0]},${beaconPos[1]},${beaconPos[2]}`)
				}

				rows[i] = union(rows[i], rows[j])
				visited.add(j)
			}
		}
	}

	console.log(positions)
	console.log(rows[0].sort((a, b) => a[0] - b[0]))
	return rows[0].length
}

export function two(inputFile: string) {
	throw new Error("Not implemented")
}

function intersection<T>(a: T[], b: T[]) {
	return a.filter((x) => b.includes(x))
}

function union(a: Vec3[], b: Vec3[]) {
	const result = [...a]
	for (const bvec of b) {
		let included = false
		for (const avec of a) {
			if (avec[0] === bvec[0] && avec[1] === bvec[1] && avec[2] === bvec[2]) {
				included = true
			}
		}
		if (!included) result.push(bvec)
	}
	return result
}

function findRotation(a1: Vec3, a2: Vec3, b1: Vec3, b2: Vec3): [Relation, Relation, Relation] {
	const bcombs = vec3Permutations([0, 1, 2])

	let x: Relation | undefined, y: Relation | undefined, z: Relation | undefined
	for (let i = 0; i < bcombs.length; i++) {
		let xx: Relation | undefined, yy: Relation | undefined, zz: Relation | undefined
		const diff1 = vec3Subtract(a1, [b1[bcombs[i][0]], b1[bcombs[i][1]], b1[bcombs[i][2]]])
		const diff2 = vec3Subtract(a2, [b2[bcombs[i][0]], b2[bcombs[i][1]], b2[bcombs[i][2]]])
		const sum1 = vec3Add(a1, [b1[bcombs[i][0]], b1[bcombs[i][1]], b1[bcombs[i][2]]])
		const sum2 = vec3Add(a2, [b2[bcombs[i][0]], b2[bcombs[i][1]], b2[bcombs[i][2]]])

		if (diff1[0] === diff2[0]) xx = ["+", bcombs[i][0]]
		if (diff1[1] === diff2[1]) yy = ["+", bcombs[i][1]]
		if (diff1[2] === diff2[2]) zz = ["+", bcombs[i][2]]

		if (sum1[0] === sum2[0]) xx = ["-", bcombs[i][0]]
		if (sum1[1] === sum2[1]) yy = ["-", bcombs[i][1]]
		if (sum1[2] === sum2[2]) zz = ["-", bcombs[i][2]]

		if (xx && yy && zz) {
			x = xx
			y = yy
			z = zz
			break
		}
	}

	return [x, y, z] as [Relation, Relation, Relation]
}

type Relation = ["+" | "-", number]

function findScannerPosition(a: Vec3, b: Vec3, relation: [Relation, Relation, Relation]) {
	const result: Vec3 = [0, 0, 0]

	for (let i = 0; i < 3; i++) {
		result[i] = relation[i][0] === "+" ? a[i] - b[relation[i][1]] : a[i] + b[relation[i][1]]
	}
	return result
}

function findBeaconPosition(scannerPos: Vec3, beaconPos: Vec3, relation: [Relation, Relation, Relation]) {
	const result: Vec3 = [0, 0, 0]

	for (let i = 0; i < 3; i++) {
		result[i] = relation[i][0] === "+" ? scannerPos[i] + beaconPos[relation[i][1]] : scannerPos[i] - beaconPos[relation[i][1]]
	}
	return result
}

function vec3Permutations(v: Vec3) {
	const result: Array<Vec3> = []
	result.push([v[0], v[1], v[2]])
	result.push([v[0], v[2], v[1]])
	result.push([v[1], v[0], v[2]])
	result.push([v[1], v[2], v[0]])
	result.push([v[2], v[0], v[1]])
	result.push([v[2], v[1], v[0]])
	return result
}

function vec3Subtract(a: Vec3, b: Vec3) {
	return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
}

function vec3Add(a: Vec3, b: Vec3) {
	return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
}

function distance(a: Vec3, b: Vec3) {
	return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2))
}

export const expectedResult = {
	debug: [79],
	input: [],
}
