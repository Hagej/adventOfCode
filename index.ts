import clipboard from "clipboardy"
import { fstat, watch } from "fs"
import { exit } from "process"
import yargs from "yargs-parser"

async function main() {
	const now = new Date()
	const raw = Bun.argv.includes("run") ? Bun.argv.slice(3) : Bun.argv.slice(2)
	const args = yargs(raw)
	const day = args.d ?? now.getDate()
	const year = args.y ?? now.getFullYear()

	const path = `${year}/${day}`
	const part = args._[0] ? (args._[0] as number) : 1
	const file = args.f ?? "index.ts"
	const input = args.i
	const debug = !!args.b
	let puzzle = await import(`./${path}/${file}`)
	console.log(`Running puzzle ${year} day ${day}${!!puzzle.both ? "" : ` part ${part}!`}`)
	runPuzzle(puzzle, path, part, debug, input)
	if (!!args.w) {
		console.log(">>>> Entering Watch Mode <<<<")
		let version = 0
		watch(`${path}/${file}`, async (event, filename) => {
			version += 1
			puzzle = await import(`./${path}/${file}?version=${version}`)
			console.log(puzzle)
			runPuzzle(puzzle, path, part, debug, input)
		})
	}
}

const duration = new Intl.DurationFormat("en-US", {
	style: "short",
})
async function runPuzzle(puzzle: any, path: string, part: number, debug = true, input?: string) {
	if (input) {
		console.log(`Running with ${input} data`)
		const result = part === 2 ? await puzzle.two(`${path}/${input}`) : await puzzle.one(`${path}/${input}`)
		console.log(result)
		return
	}
	if (!debug) {

		console.log("Running with debug data\n")
		let before = performance.now()
		let debugResult
		try {
			if (!!puzzle.both) {
				debugResult = await puzzle.both(`${path}/debug`)
			}
			else if (part === 2) {
				if (await Bun.file(`${path}/debug2`).exists()) {
					debugResult = await puzzle.two(`${path}/debug2`)
				} else {
					debugResult = await puzzle.two(`${path}/debug`)
				}
			} else {
				debugResult = await puzzle.one(`${path}/debug`)
			}
		} catch (e) {
			console.error(e)
			exit()
		}
		let time = performance.now() - before
		let t = duration.format(getTimeObject(time))

		console.log(`#=========  DEBUG  =========#\n`)
		console.log(Array.isArray(debugResult) ? debugResult.map((r, i) => `Part ${i + 1}: ${r}`).join("\n") : debugResult)
		console.log(`\n#======  ${t}  ======#\n`)

		if (!!puzzle.both) {
			let failed = false
			if (puzzle.expectedResult?.debug?.[0] && puzzle.expectedResult.debug[0] !== debugResult[0]) {
				console.log(`Debug failed. Expected ${puzzle.expectedResult.debug[0]}, got ${debugResult[0]}`)
				failed = true
			}
			if (puzzle.expectedResult?.debug?.[1] && puzzle.expectedResult.debug[1] !== debugResult[1]) {
				console.log(`Debug failed. Expected ${puzzle.expectedResult.debug[1]}, got ${debugResult[1]}`)
				failed = true
			}
			if (failed) return
		} else if (puzzle.expectedResult?.debug?.[part - 1] && puzzle.expectedResult.debug[part - 1] !== debugResult) {
			console.log(`Debug failed. Expected ${puzzle.expectedResult.debug[part - 1]}, got ${debugResult}`)
			return
		}
	}

	console.log("Running with input data\n")
	let before = performance.now()
	try {
		if (!!puzzle.both) {
			var result = await puzzle.both(`${path}/input`)
		} else {
			var result = part === 2 ? await puzzle.two(`${path}/input`) : await puzzle.one(`${path}/input`)
		}
	} catch (e) {
		console.error(e)
		exit()
	}
	let time = performance.now() - before
	let t = duration.format(getTimeObject(time))
	console.log(`#=========  RESULT  =========#\n`)
	console.log(Array.isArray(result) ? result.map((r, i) => `Part ${i + 1}: ${r}`).join("\n") : result)
	console.log(`\n#======  ${t}  ======#`)

	clipboard.writeSync(`${result}`)

	if (!!puzzle.both) {
		if (puzzle.expectedResult?.input?.[0] && puzzle.expectedResult.input[0] !== result[0]) {
			console.log(`Run failed. Expected ${puzzle.expectedResult.input[0]}, got ${result[0]}`)
		}
		if (puzzle.expectedResult?.input?.[1] && puzzle.expectedResult.input[1] !== result[1]) {
			console.log(`Run failed. Expected ${puzzle.expectedResult.input[1]}, got ${result[1]}`)
		}
	} else if (puzzle.expectedResult?.input?.[part - 1] && puzzle.expectedResult.input[part - 1] !== result) {
		console.log(`Run failed. Expected ${puzzle.expectedResult.input[part - 1]}, got ${result}`)
		return
	}
}

function getTimeObject(ms: number) {
	const minutes = Math.trunc(ms / 1000 / 60)
	const seconds = minutes < 1000 ? Math.trunc(ms / 1000) : 0
	const milliseconds = seconds < 1000 ? Math.trunc(ms) : 0
	const microseconds = milliseconds < 1000 ? Math.trunc(ms * 1000) : 0
	return {
		microseconds: microseconds % 1000,
		milliseconds: milliseconds % 1000,
		seconds: seconds % 1000,
		minutes,
	}
}

await main()
