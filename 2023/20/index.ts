import * as utils from "@utils"
import { match } from "assert"
import fs from "fs"

type FlipFlop = {
	type: "ff"
	state: boolean
	targets: string[]
}

type Conjunction = {
	type: "cj"
	state: Record<string, boolean>
	targets: string[]
}

type Broadcaster = {
	type: "bc"
	targets: string[]
}

type Module = FlipFlop | Conjunction | Broadcaster

let low = 0
let high = 0
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

	const modules: Record<string, Module> = rows.reduce((prev, r) => {
		let [id, targets] = r.split(" -> ")
		let type: Module["type"]
		let state
		if (id.startsWith("broadcaster")) {
			type = "bc"
		} else if (id.startsWith("%")) {
			type = "ff"
			state = false
			id = id.slice(1)
		} else {
			type = "cj"
			state = {}
			id = id.slice(1)
		}
		return { ...prev, [id]: { type, state, targets: targets.split(", ") } }
	}, {})

	for (const [k, v] of Object.entries(modules)) {
		for (const t of v.targets) {
			const m = modules[t]
			if (!m) continue
			if (m.type === "cj") {
				m.state[k] = false
			}
		}
	}

	let low = 0
	let high = 0
	let Q: [string, string, boolean][]
	for (let i = 0; i < 1000; i++) {
		Q = [["", "broadcaster", false]]
		while (Q.length) {
			const [prev, target, pulse] = Q.shift()
			// console.log(prev, target, pulse)
			if (pulse) {
				high++
			} else {
				low++
			}
			const m = modules[target]
			if (!m) continue
			if (m.type === "bc") {
				for (const t of m.targets) {
					Q.push([target, t, pulse])
				}
			} else if (m.type === "ff") {
				if (pulse) continue
				m.state = !m.state
				for (const t of m.targets) {
					Q.push([target, t, m.state])
				}
			} else if (m.type === "cj") {
				m.state[prev] = pulse
				const nextPulse = !Object.values(m.state).every((v) => !!v)
				// if (!nextPulse) console.log(m.state)
				for (const t of m.targets) {
					Q.push([target, t, nextPulse])
				}
			}
		}
	}
	result = low * high

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

	const modules: Record<string, Module> = rows.reduce((prev, r) => {
		let [id, targets] = r.split(" -> ")
		let type: Module["type"]
		let state
		if (id.startsWith("broadcaster")) {
			type = "bc"
		} else if (id.startsWith("%")) {
			type = "ff"
			state = false
			id = id.slice(1)
		} else {
			type = "cj"
			state = {}
			id = id.slice(1)
		}
		return { ...prev, [id]: { type, state, targets: targets.split(", ") } }
	}, {})

	for (const [k, v] of Object.entries(modules)) {
		for (const t of v.targets) {
			const m = modules[t]
			if (!m) continue
			if (m.type === "cj") {
				m.state[k] = false
			}
		}
	}

	let low = 0
	let high = 0
	let rx = false
	let Q: [string, string, boolean][]
	let i = 0
	while (true) {
		i++
		if (i % 100000 === 0) {
			console.log(i)
		}
		Q = [["", "broadcaster", false]]
		while (Q.length) {
			const [prev, target, pulse] = Q.shift()
			if (pulse) {
				high++
			} else {
				low++
			}
			const m = modules[target]
			if (!m) {
				if (!pulse) {
					rx = true
				}
				continue
			}
			if (m.type === "bc") {
				for (const t of m.targets) {
					Q.push([target, t, pulse])
				}
			} else if (m.type === "ff") {
				if (pulse) continue
				m.state = !m.state
				for (const t of m.targets) {
					Q.push([target, t, m.state])
				}
			} else if (m.type === "cj") {
				m.state[prev] = pulse
				const nextPulse = !Object.values(m.state).every((v) => !!v)
				for (const t of m.targets) {
					Q.push([target, t, nextPulse])
				}
			}
		}
		if (rx) {
			console.log("Hello there")
			return i
		}
	}
}

export const expectedResult = {
	debug: [11687500],
	input: [],
}
