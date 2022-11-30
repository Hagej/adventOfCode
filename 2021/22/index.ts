import fs from "fs"

export function one(inputFile: string) {
	let result = 0
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows: [string, [[number, number], [number, number], [number, number]]][] = file
		.trim()
		.split("\n")
		.map((r) => {
			const [i, v] = r.split(" ")
			const [x, y, z] = v.split(",")
			const [xmin, xmax] = x.split("..")
			const [ymin, ymax] = y.split("..")
			const [zmin, zmax] = z.split("..")

			return [
				i,
				[
					[parseInt(xmin.substr(2)), parseInt(xmax)],
					[parseInt(ymin.substr(2)), parseInt(ymax)],
					[parseInt(zmin.substr(2)), parseInt(zmax)],
				],
			]
		})

	const xmin = -50
	const xmax = 50

	const ymin = -50
	const ymax = 50

	const zmin = -50
	const zmax = 50

	const reactor = new Set<string>()

	for (const row of rows) {
		const [xx, yy, zz] = row[1]
		xx[0] = Math.max(xmin, xx[0])
		xx[1] = Math.min(xmax, xx[1])
		yy[0] = Math.max(ymin, yy[0])
		yy[1] = Math.min(ymax, yy[1])
		zz[0] = Math.max(zmin, zz[0])
		zz[1] = Math.min(zmax, zz[1])

		if (row[0] === "on") {
			for (let x = xx[0]; x <= xx[1]; x++) {
				for (let y = yy[0]; y <= yy[1]; y++) {
					for (let z = zz[0]; z <= zz[1]; z++) {
						reactor.add(`${x},${y},${z}`)
					}
				}
			}
		} else {
			for (let x = xx[0]; x <= xx[1]; x++) {
				for (let y = yy[0]; y <= yy[1]; y++) {
					for (let z = zz[0]; z <= zz[1]; z++) {
						reactor.delete(`${x},${y},${z}`)
					}
				}
			}
		}
	}

	result = reactor.size
	return result
}

type Cube = [[number, number], [number, number], [number, number]]

export function two(inputFile: string) {
	const file = fs.readFileSync(inputFile, "utf-8")
	const rows: [string, Cube][] = file
		.trim()
		.split("\n")
		.map((r) => {
			const [i, v] = r.split(" ")
			const [x, y, z] = v.split(",")
			const [xmin, xmax] = x.split("..")
			const [ymin, ymax] = y.split("..")
			const [zmin, zmax] = z.split("..")

			return [
				i,
				[
					[parseInt(xmin.substr(2)), parseInt(xmax)],
					[parseInt(ymin.substr(2)), parseInt(ymax)],
					[parseInt(zmin.substr(2)), parseInt(zmax)],
				],
			]
		})

	let cubes: Cube[] = []

	for (let i = 0; i < rows.length; i++) {
		const newCubes: Cube[] = []
		const [instruction, cube] = rows[i]
		for (let j = 0; j < cubes.length; j++) {
			if (cubeContains(cube, cubes[j])) {
				continue
			}
			const intersection = cubeIntersection(cube, cubes[j])
			if (intersection) {
				const other = cubes[j]
				const split = splitCube(other, intersection)
				split.shift()
				newCubes.push(...split)
			} else {
				newCubes.push(cubes[j])
			}
		}
		if (instruction === "on") {
			newCubes.push(cube)
		}
		cubes = newCubes
	}

	return cubes.reduce((sum, c) => sum + cubeVolume(c), 0)
}

function cubeContains(a: Cube, b: Cube) {
	const [ax, ay, az] = a
	const [bx, by, bz] = b

	if (bx[0] < ax[0] || bx[1] > ax[1]) return false
	if (by[0] < ay[0] || by[1] > ay[1]) return false
	if (bz[0] < az[0] || bz[1] > az[1]) return false
	return true
}

function cubeVolume(cube: Cube) {
	const [x, y, z] = cube
	const dx = x[1] - x[0] + 1
	const dy = y[1] - y[0] + 1
	const dz = z[1] - z[0] + 1
	return dx * dy * dz
}

function cubeIntersection(cube1: Cube, cube2: Cube): Cube | undefined {
	const [c1x, c1y, c1z] = cube1
	const [c2x, c2y, c2z] = cube2

	// No overlap in any axis
	if (c1x[1] < c2x[0] || c2x[1] < c1x[0] || c1y[1] < c2y[0] || c2y[1] < c1y[0] || c1z[1] < c2z[0] || c2z[1] < c1z[0]) {
		return
	}
	const [xmin, xmax] = [Math.max(c1x[0], c2x[0]), Math.min(c1x[1], c2x[1])]
	const [ymin, ymax] = [Math.max(c1y[0], c2y[0]), Math.min(c1y[1], c2y[1])]
	const [zmin, zmax] = [Math.max(c1z[0], c2z[0]), Math.min(c1z[1], c2z[1])]

	return [
		[xmin, xmax],
		[ymin, ymax],
		[zmin, zmax],
	]
}

function splitCube(outer: Cube, inner: Cube) {
	const [ox, oy, oz] = outer
	const [ix, iy, iz] = inner
	const result: Cube[] = []

	result.push([[...ix], [...iy], [...iz]])

	const minX = Math.min(ox[0], ix[0])
	const maxX = Math.max(ox[1], ix[1])
	const minY = Math.min(oy[0], iy[0])
	const maxY = Math.max(oy[1], iy[1])
	const minZ = Math.min(oz[0], iz[0])
	const maxZ = Math.max(oz[1], iz[1])

	if (maxX !== ix[1]) {
		result.push([
			[ix[1] + 1, maxX],
			[minY, maxY],
			[minZ, maxZ],
		])
	}
	if (minX !== ix[0]) {
		result.push([
			[minX, ix[0] - 1],
			[minY, maxY],
			[minZ, maxZ],
		])
	}

	if (maxY !== iy[1]) {
		result.push([[...ix], [iy[1] + 1, maxY], [minZ, maxZ]])
	}
	if (minY !== iy[0]) {
		result.push([[...ix], [minY, iy[0] - 1], [minZ, maxZ]])
	}

	if (maxZ !== iz[1]) {
		result.push([[...ix], [...iy], [iz[1] + 1, maxZ]])
	}
	if (minZ !== iz[0]) {
		result.push([[...ix], [...iy], [minZ, iz[0] - 1]])
	}

	return result
}

export const expectedResult = {
	debug: [590784, 2758514936282235],
	input: [580810, 1265621119006734],
}
