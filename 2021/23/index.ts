import * as utils from "../../utils/index.ts"

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

	return energyConsumed
}

export function two(inputFile: string) {
	const file = Deno.readTextFileSync(inputFile)
	homeSize = 4

	const board = file
		.trim()
		.split("\n")
		.map((r) => {
			const row = r.split("")
			return row
		})

	next(board, 0)
	return result
}

let energyConsumed = 0
let result = Infinity

const S1: Array<Set<number>> = []
const S2: Array<Set<number>> = []

function next(board: string[][], recDepth: number) {
	const moves: Array<[Vec2, Vec2]> = []
	for (let x = 1; x <= 11; x++) {
		if (Pods.includes(board[1][x] as Pod)) {
			const home = getHome(board, board[1][x] as Pod)
			if (blockedBy(board, [x, 1], home).length === 0) {
				moveToTarget(board, [x, 1], home)
				moves.push([[x, 1], [...home]])
				x = 0
			}
		}
	}
	let moveable
	S1.push(new Set<number>())
	const S1idx = S1.length - 1
	do {
		moveable = nextMovable(board, S1[S1idx])
		if (moveable) {
			S1[S1idx].add(moveable.pos[0])
			let nextPos
			S2.push(new Set<number>())
			const S2idx = S2.length - 1
			do {
				nextPos = nextHallwayPos(board, moveable.pos, S2[S2idx])
				if (typeof nextPos === "number") {
					S2[S2idx].add(nextPos)
					moveToTarget(board, moveable.pos, [nextPos, 1])
					const m = next(board, recDepth + 1)
					while (m.length > 0) {
						const r = m.pop() as [Vec2, Vec2]
						revert(board, r[1], r[0])
					}
					revert(board, [nextPos, 1], moveable.pos)
				}
			} while (typeof nextPos === "number")
		}
	} while (moveable)
	let complete = true
	outer: for (const [x, pod] of [
		[3, "A"],
		[5, "B"],
		[7, "C"],
		[9, "D"],
	] as Array<[number, string]>) {
		for (let y = 1 + homeSize; y > 1; y--) {
			if (board[y][x] !== pod) {
				complete = false
				break outer
			}
		}
	}
	if (complete) {
		result = Math.min(result, energyConsumed)
	}
	return moves
}

function isHome(board: string[][], pos: Vec2, pod: Pod) {
	const home = getHome(board, pod)
	return pos[0] === home[0] && pos[1] > home[1]
}

function nextMovable(board: string[][], excluded: Set<number>): { pod: Pod; pos: Vec2 } | undefined {
	for (const j of [3, 5, 7, 9].filter((n) => !excluded.has(n))) {
		for (let i = 2; i <= homeSize + 1; i++) {
			const p = board[i][j] as Pod
			if (Pods.includes(p) && !isHome(board, [j, i], p)) return { pod: p, pos: [j, i] }
		}
	}
}

const validHallwayPos = [1, 2, 4, 6, 8, 10, 11]
function nextHallwayPos(board: string[][], pos: Vec2, excluded: Set<number>) {
	for (const vhp of validHallwayPos) {
		if (blockedBy(board, pos, [vhp, 1]).length === 0 && !excluded.has(vhp)) return vhp
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
		console.assert(Pods.includes(pod), "Cannot move", pos)
		board[pos[1]][pos[0]] = "."
		board[pos[1] + dy][pos[0] + dx] = pod
		energyConsumed += energy[pod]
		return target
	}
	return pos
}

function revert(board: string[][], pos: Vec2, target: Vec2) {
	const pod = board[pos[1]][pos[0]] as Pod
	board[target[1]][target[0]] = pod
	board[pos[1]][pos[0]] = "."
	energyConsumed -= energy[pod] * (Math.abs(pos[0] - target[0]) + Math.abs(pos[1] - target[1]))
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
	for (let i = homeSize + 1; i > 1; i--) {
		if (board[i][x] !== pod) return [x, i]
	}
	return [x, 1]
}

export const expectedResult = {
	debug: [],
	input: [],
}
