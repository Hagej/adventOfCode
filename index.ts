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
	let puzzle = await import(`./${path}/${file}`)
	console.log(`Running puzzle ${year} day ${day} part ${part}!`)
	runPuzzle(puzzle, path, part, input)
	if (!!args.w) {
		console.log(">>>> Entering Watch Mode <<<<")
		let version = 0
		watch(`${path}/${file}`, async (event, filename) => {
			version += 1
			puzzle = await import(`./${path}/${file}?version=${version}`)
			console.log(puzzle)
			runPuzzle(puzzle, path, part, input)
		})
	}
}

const duration = new Intl.DurationFormat("en-US", {
	style: "short",
})
async function runPuzzle(puzzle: any, path: string, part: number, input?: string) {
	if (input) {
		console.log(`Running with ${input} data`)
		const result = part === 2 ? await puzzle.two(`${path}/${input}`) : await puzzle.one(`${path}/${input}`)
		console.log(result)
		return
	}
	console.log("Running with debug data\n")
	let before = performance.now()
	let debugResult
	try {
		if (part === 2) {
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
	console.log(debugResult)
	console.log(`\n#======  ${t}  ======#\n`)

	if (puzzle.expectedResult?.debug?.[part - 1] && puzzle.expectedResult.debug[part - 1] !== debugResult) {
		console.log(`Debug failed. Expected ${puzzle.expectedResult.debug[part - 1]}, got ${debugResult}`)
		return
	}

	console.log("Running with input data\n")
	before = performance.now()
	try {
		var result = part === 2 ? await puzzle.two(`${path}/input`) : await puzzle.one(`${path}/input`)
	} catch (e) {
		console.error(e)
		exit()
	}
	time = performance.now() - before
	t = duration.format(getTimeObject(time))
	console.log(`#=========  RESULT  =========#\n`)
	console.log(result)
	console.log(`\n#======  ${t}  ======#`)

	clipboard.writeSync(`${result}`)

	if (puzzle.expectedResult?.input?.[part - 1] && puzzle.expectedResult.input[part - 1] !== result) {
		console.log(`Run failed. Expected ${puzzle.expectedResult.debug[part - 1]}, got ${result}`)
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
