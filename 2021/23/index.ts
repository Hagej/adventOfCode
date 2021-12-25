import * as utils from "../../utils/index.ts"
import { logImage } from "../../utils/index.ts"

type Vec2 = [number, number]
type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT"
const Pods = ["D", "C", "B", "A"] as const
type Pod = typeof Pods[number]

const Dirs: Record<Dir, Vec2> = { UP: [0, -1], DOWN: [0, 1], LEFT: [-1, 0], RIGHT: [1, 0] }

const energy: Record<Pod, number> = {
	A: 1,
	B: 10,
	C: 100,
	D: 1000,
}

const homeX: Record<Pod, number> = {
	A: 3,
	B: 5,
	C: 7,
	D: 9,
}
let homeSize = 0
export function one(inputFile: string) {
	const file = Deno.readTextFileSync(inputFile)
	const board = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split("")
			return row
		})

	const moves: Array<[Vec2, Vec2]> = [
		[
			[7, 2],
			[1, 1],
		],
		[
			[9, 2],
			[10, 1],
		],
		[
			[9, 3],
			[4, 1],
		],
		[
			[5, 2],
			[9, 3],
		],
		[
			[7, 3],
			[9, 2],
		],
		[
			[5, 3],
			[7, 3],
		],
		[
			[4, 1],
			[5, 3],
		],
		[
			[10, 1],
			[5, 2],
		],
		[
			[3, 2],
			[2, 1],
		],
		[
			[3, 3],
			[7, 2],
		],
		[
			[2, 1],
			[3, 3],
		],
		[
			[1, 1],
			[3, 2],
		],
	]

	while (moves.length > 0) {
		const [pos, tar] = moves.shift() as [Vec2, Vec2]

		moveToTarget(board, pos, tar)
	}

	logImage(board)

	return energyConsumed
}

export function two(inputFile: string) {
	homeSize = 4
	const file = Deno.readTextFileSync(inputFile)
	const board = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split("")
			return row
		})

	while (true) {
		for (let x = 1; x <= 11; x++) {
			if (Pods.includes(board[1][x] as Pod)) {
				const home = getHome(board, board[1][x] as Pod)
				if (blockedBy(board, [x, 1], home).length === 0) {
					moveToTarget(board, [x, 1], home)
				}
			}
		}

		const cheapest = cheapestMovable(board)
		if (cheapest) {
			const home = getHome(board, cheapest.pod)
			const blockers = blockedBy(board, cheapest.pos, home)
			if (blockers.length === 0) {
				let posIndex = 0
				for(let i = 5; i > 1; i--) {
					const p = board[cheapest.pos[1]][i] as Pod
					if(Pods.includes(p) && p >= cheapest.pod && !isHome(board, [i,cheapest.pos[1]], p)) {
						posIndex++
					}
				}
				let xmin = 12
				let xmax = 0
				for(const b of blockers) {
					xmax = Math.max(xmax, homeX[b.pod] + 1, b.pos[0] + 1)
					xmin = Math.min(xmin, homeX[b.pod] - 1, b.pos[0] - 1)
				}
				const target = [homeX[cheapest.pod],1]
				target[0] = Math.abs(target[0] - xmin) > Math.abs(target[0] - xmax)
				for(let i = 0; i < posIndex;)
			} else {

				moveToTarget(board, cheapest.pos, home)
			}
		}
	}

	return energyConsumed
}

let energyConsumed = 0

function isHome(board: string[][], pos: Vec2, pod: Pod) {
	const home = getHome(board, pod)
	return pos[0] === home[0] && pos[1]>home[1]
}

function cheapestMovable(board: string[][]): { pod: Pod; pos: Vec2 } | undefined {
	let pod: { pod: Pod; pos: Vec2 } | undefined
	let cost = Infinity
	for (let i = board.length - 1; i > 1; i--) {
		for (let j = 3; j < 9; j++) {
			const p = board[i][j] as Pod
			if (Pods.includes(p)) {
				let moveable = true
				for (let k = j - 1; k > 1; k--) {
					if (board[i][k] !== ".") moveable = false
				}
				if (moveable && energy[p] < cost) {
					if (!pod || pod.pos[1] < j) {
						pod = { pod: p, pos: [i, j] }
						cost = energy[p]
					}
				}
			}
		}
		if (pod) return pod
	}
}


function blockedBy(board: string[][], pos: Vec2, target: Vec2): { pod: Pod; pos: Vec2 }[] {
	const inTheWay: { pod: Pod; pos: Vec2 }[] = []
	const [dx, dy] = [pos[0] - target[0], pos[1] - target[1]]
	if (dy <= 0) {
		for (let x = 1; x <= Math.abs(dx); x++) {
			const [py, px] = [pos[1], pos[0] - Math.sign(dx) * x]
			if (board[py][px] !== ".") {
				inTheWay.push({ pod: board[py][px] as Pod, pos: [px, py] })
			}
		}
		for (let y = 1; y <= Math.abs(dy); y++) {
			const [py, px] = [pos[1] + y, target[0]]
			if (board[py][px] !== ".") {
				inTheWay.push({ pod: board[py][px] as Pod, pos: [px, py] })
			}
		}
	} else {
		for (let y = 1; y <= dy; y++) {
			const [py, px] = [pos[1] - y, pos[0]]
			if (board[py][px] !== ".") {
				inTheWay.push({ pod: board[py][px] as Pod, pos: [px, py] })
			}
		}
		for (let x = 1; x <= Math.abs(dx); x++) {
			const [py, px] = [target[1], pos[0] - Math.sign(dx) * x]
			if (board[py][px] !== ".") {
				inTheWay.push({ pod: board[py][px] as Pod, pos: [px, py] })
			}
		}
	}
	return inTheWay
}

function move(board: string[][], pos: Vec2, dir: Dir) {
	const [dx, dy] = Dirs[dir]
	const target: Vec2 = [pos[0] + dx, pos[1] + dy]
	const boardPos = board[target[1]][target[0]]
	if (boardPos === ".") {
		const pod: Pod = board[pos[1]][pos[0]] as Pod
		console.assert(Pods.includes(pod))
		board[pos[1]][pos[0]] = "."
		board[pos[1] + dy][pos[0] + dx] = pod
		energyConsumed += energy[pod]
		return target
	}
	return pos
}

function moveToTarget(board: string[][], pos: Vec2, target: Vec2) {
	if (target[0] !== pos[0]) {
		const dy = pos[1] - 1
		for (let i = 0; i < dy; i++) {
			pos = move(board, pos, "UP")
		}
	}
	const dx = target[0] - pos[0]
	for (let i = 0; i < Math.abs(dx); i++) {
		pos = move(board, pos, dx > 0 ? "RIGHT" : "LEFT")
	}
	const dy = target[1] - 1
	for (let i = 0; i < dy; i++) {
		pos = move(board, pos, "DOWN")
	}
	return pos
}

function getHome(board: string[][], pod: Pod): Vec2 {
	const x = homeX[pod]
	for (let i = homeSize; i > 1; i--) {
		if (board[1 + i][x] !== pod) return [x, i + 1]
	}
	return [x, 1]
}

export const expectedResult = {
	debug: [],
	input: [],
}
