let prio
let [ore, clay, obs, geode] = [0, 0, 0, 0]
let [orr, cr, obr, gr] = [1, 0, 0, 0]
for (let i = 0; i < 24; i++) {
	const rtor = Math.ceil((r.oreCost - ore) / orpm)
	const rtc = Math.ceil((r.clayCost - ore) / orpm)
	const rtob = Math.ceil(Math.max((r.obsidianCost[0] - ore) / orpm, (r.obsidianCost[1] - clay) / cpm))
	const rtg = Math.ceil(Math.max((r.geodeCost[0] - ore) / orpm, (r.geodeCost[1] - obs) / obpm))

	test: if (rtg < Infinity) {
		// If buying obsidian
		let remaining = ore + rtob * orpm - r.obsidianCost[0]
		const buyObs = rtob + Math.ceil(Math.max((r.geodeCost[0] - remaining) / orpm, (r.geodeCost[1] - (obs + rtob * obpm)) / (obpm + 1)))
		console.log("Geode?", buyObs, rtg)

		// If buying clay and then obsidian
		remaining = ore + rtc * orpm - r.clayCost
		const buyClayAndObs = rtc + Math.ceil(Math.max((r.obsidianCost[0] - remaining) / orpm, (r.obsidianCost[1] - (clay + rtc * cpm)) / (cpm + 1)))
		const obsi = obs + obpm * buyClayAndObs
		remaining = remaining + (buyClayAndObs - rtc) * orpm - r.obsidianCost[0]
		const t = buyClayAndObs + Math.ceil(Math.max((r.geodeCost[0] - remaining) / orpm, (r.geodeCost[1] - obsi) / (obpm + 1)))

		if (buyObs < rtg) {
			if (t < buyObs) {
				prio = "clay"
			} else {
				prio = "obsidian"
			}
			break test
		}

		if (t < rtg) {
			prio = "clay"
			break test
		}

		// If buying ore
		remaining = ore + rtor * orpm - r.oreCost
		const buyOre = rtor + Math.ceil(Math.max((r.geodeCost[0] - remaining) / (orpm + 1), (r.geodeCost[1] - (obs + rtor * obpm)) / obpm))
		if (buyOre < rtg) {
			prio = "ore"
			break test
		}
		prio = "geode"
	} else if (rtob < Infinity) {
		// If buying clay
		let remaining = ore + rtc * orpm - r.clayCost
		const buyClay = rtc + Math.ceil(Math.max((r.obsidianCost[0] - remaining) / orpm, (r.obsidianCost[1] - (clay + rtc * cpm)) / (cpm + 1)))
		console.log("Obsidian?", buyClay, rtob)
		if (buyClay < rtob) {
			prio = "clay"
			break test
		}
		// If buying ore
		remaining = ore + rtor * orpm - r.oreCost
		const buyOre = rtor + Math.ceil(Math.max((r.obsidianCost[0] - remaining) / (orpm + 1), (r.obsidianCost[1] - (clay + rtc * cpm)) / cpm))
		if (buyOre < rtob) {
			prio = "ore"
			break test
		}
		prio = "obsidian"
	} else {
		// If buying ore
		const remaining = ore + rtor * orpm - r.oreCost
		const buyOre = rtor + Math.ceil(r.clayCost - remaining / (orpm + 1))
		console.log("Clay?", buyOre, rtc)
		if (buyOre < rtc) {
			prio = "ore"
		} else {
			prio = "clay"
		}
	}

	console.log("------------------------------", i + 1)
	console.log("Prio", prio, rtor, rtc, rtob, rtg)

	let newOrpm = orpm
	let newCpm = cpm
	let newObpm = obpm
	let newGpm = gpm

	if (prio === "geode" && obs >= r.geodeCost[1] && ore >= r.geodeCost[0]) {
		console.log("Buying geode robot")
		obs -= r.geodeCost[1]
		ore -= r.geodeCost[0]
		newGpm++
	} else if (prio === "obsidian") {
		if (clay >= r.obsidianCost[1] && ore >= r.obsidianCost[0]) {
			console.log("Buying obsidian robot")
			clay -= r.obsidianCost[1]
			ore -= r.obsidianCost[0]
			newObpm++
		}
	} else if (prio === "clay") {
		if (ore >= r.clayCost) {
			console.log("Buying clay robot")
			ore -= r.clayCost
			newCpm++
		}
	} else if (ore > r.oreCost) {
		console.log("Buying ore robot")
		ore -= r.oreCost
		newOrpm++
	}

	ore += orpm
	clay += cpm
	obs += obpm
	geode += gpm

	orpm = newOrpm
	cpm = newCpm
	obpm = newObpm
	gpm = newGpm
}
