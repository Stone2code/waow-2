/**
 * Content for the 1366px itinerary template (itinerary-v2.js), keyed by slug.
 * Reference page: sunda-spices-and-snakes. Each of the other routes gets one
 * entry of the same shape (steps: up to 5, laid out by STEP_LAYOUT in the JS).
 *
 * TODO photos: hero/steps/explore images below are the closest existing site
 * photos — swap in the client's final ones (files in images/, any size).
 * Sea: images/fond-carnet-itineraire.webp (client photo) is the
 * full-width ocean photo behind the logbook card.
 */
const ITINERARY_V2 = {
  "sunda-spices-and-snakes": {
    subtitle: "Maumere → Ambon · 12 days",
    route: { from: "Maumere", to: "Ambon", days: "12 days", toRegion: "moluccas" },
    intro: "This route made its name on WAOW and returns unchanged on WAOW 2. For years, the stretch between <em>Alor</em> and <em>Banda</em> was treated as a crossing. Now the crossing is the point: twelve days moving through remote islands, volcanic outcrops and open water, with some of Indonesia’s most distinctive diving along the way.",
    map: "images/it-zoom-sunda-spices-and-snakes.png",
    mapBox: [771, 285, 340, 214],
    mapAlt: "Route of Spices and Snakes, from Maumere through the Banda Sea to Ambon.",
    sea: "images/fond-carnet-itineraire.webp",
    card: {
      title: "Spices and Snakes",
      days: "10-12 days", path: "Maumere → Maumere",
      when: "Late October → Early November 2028",
      route: ["Maumere", "Alor", "Solor", "Banda Sea", "Gunung Api", "Manuk", "Banda", "Ambon"],
      diving: ["Clean muck", "Sea snakes", "Hammerheads", "Pelagics", "Walls", "Black sand", "Mandarinfish", "Sperm whales", "Blue whales", "Pilot whales"]
    },
    // Measured layout (page coordinates). Pages without `layout` are placed automatically (see autoLayout in itinerary-v2.js).
    layout: [
      { side: "L", photo: [863, 1574, 372, 513], title: 1633, sub: 1723, text: 1796, tx: [174, 500] },
      { side: "R", photo: [76, 2388, 537, 426],  title: 2445, sub: 2534, text: 2600, tx: [720, 500] },
      { side: "L", photo: [860, 3250, 370, 367], title: 3174, sub: 3320, text: 3393, tx: [164, 500] },
      { side: "R", photo: [126, 3850, 487, 562], title: 3970, sub: 4046, text: 4116, tx: [700, 520] },
      { side: "L", photo: [750, 4577, 322, 444], title: 4692, sub: 4756, text: 4826, tx: [143, 480] }
    ],
    links: [
      { dir: "right", a: [575, 2099], b: [875, 2380] },
      { dir: "left",  a: [724, 2816], b: [620, 3174] },
      { dir: "right", a: [572, 3633], b: [877, 3913] },
      { dir: "left",  a: [634, 4327], b: [540, 4640] }
    ],
    storyEnd: 5311,
    steps: [
      { title: "Alor &amp; Solor", sub: "Where the reefs come alive", image: "images/it-sunda-spices-and-snakes-1.webp", alt: "A reef wall with orange coral.",
        text: "The journey begins around Alor and Solor, where cold, nutrient-rich water from the Ombai Strait feeds hard-coral slopes in exceptional condition.<br>Then there is the black sand. Alor’s version of muck diving is unusually clean: productive slopes without the rubbish, with Rhinopias, ornate ghost pipefish and nudibranchs hidden across them.<br>Ashore, the villages are just as much part of the stop. Children appear on the beach and often follow along for as long as you let them." },
      { title: "Into the Banda Sea", sub: "Beyond the usual route", image: "images/it-sunda-spices-and-snakes-2.webp", alt: "A green volcanic island rising from calm water.",
        text: "From Alor we leave Nusa Tenggara Timur for Maluku. The exact route depends on the sea, with possibilities including Wetar, Romang, Teun, Serua, Nil Desperandum and Karang Daisburgh.<br>Some are volcanic islands rising from very deep water; others are submerged atolls with nothing visible above the surface. The diving is walls, blue water and reefs that see very few boats." },
      { title: "Gunung Api<br>&amp; Manuk", sub: "The islands of snakes", image: "images/it-sunda-spices-and-snakes-3.webp", alt: "A sea snake over a fan coral.",
        text: "Gunung Api and Manuk give the itinerary the second half of its name.<br>These remote volcanic islands hold sea snakes in extraordinary numbers. They move through the water around divers with complete indifference, while seabirds gather overhead and sharks patrol below.<br>It is one of those dives that tends to change how people feel about snakes." },
      { title: "Blue Water", sub: "Waiting for the giants", image: "images/it-sunda-spices-and-snakes-4.webp", alt: "Scalloped hammerheads in blue water.",
        text: "The Banda Sea is also one of the places where schooling hammerheads can appear, and we cross during the seasonal window when the chances are at their best. Dogtooth tuna, jacks and occasional oceanic mantas work the walls, while the crossing follows an important cetacean corridor. Sperm whales are almost resident in these straits, blue whales migrate through at this time of year, and pilot whales are regularly seen around Banda. Nothing is guaranteed. The boat moves slowly, the horizon is watched, and when a blow appears, everything else stops." },
      { title: "Banda", sub: "Where the spice story began", image: "images/it-sunda-spices-and-snakes-5.webp", alt: "Spices, red and brown, in close-up.",
        text: "The final days belong to Banda, once the only place on earth where nutmeg grew. That history is still visible in Banda Neira: Dutch forts above the town, nutmeg plantations, drying racks outside houses and the volcano behind the anchorage.<br>Underwater, walls fall away from the shoreline and mandarinfish appear at dusk.<br>From there, one final passage takes us to Ambon." }
    ],
  }
};

ITINERARY_V2["sunda-volcanoes-and-villages"] = {
  subtitle: "Maumere → Maumere · 10-12 days",
  intro: "Most boats treat this archipelago as a stop on the way somewhere, dive four or five sites and carry on. This trip never leaves it.<br>Out of Maumere and back, ten to twelve days entirely inside Alor and Solor, long enough to actually know the place instead of sampling it.",
  map: "images/it-zoom-sunda-volcanoes-and-villages.png",
  mapBox: [680, 330, 532, 136],
  mapAlt: "Route of Volcanoes and Villages, a loop through Adonara, Solor, Lembata, Pantar, Pura and Alor.",
  sea: "images/fond-carnet-itineraire.webp",
  card: {
    title: "Volcanoes and Villages",
    days: "10-12 days", path: "Maumere → Maumere",
    when: "April → May",
    route: ["Maumere", "Adonara", "Solor", "Lembata", "Pantar", "Pura", "Alor", "Maumere"],
    diving: ["Hard coral gardens", "Soft coral walls", "Pinnacles & drop-offs", "Volcanic sand", "Macro", "Pelagics", "Muck diving"]
  },
  steps: [
    { title: "Maumere → Alor", sub: "Adonara · Solor · Lembata · Pantar · Pura · Alor", subColor: "blue", subFs: 22, subW: 620, side: "L", align: "right", link: false, gapAfter: 170,
      photo: [495, 560], titleDy: 95, image: "images/it-sunda-volcanoes-and-villages-1.webp", alt: "A volcano erupting above the water, seen from the boat.",
      text: "The islands run east from Flores in a line: Adonara, Solor, Lembata, Pantar, Pura, Alor. Between them, straits the ocean has to force its way through. That is the engine of the whole region. Cold water loaded with nutrients rises out of the deep and funnels through the gaps, and everything growing on these reefs lives off it. We go in April and May, and that is no accident. The upwelling has slackened, the sea has warmed, the visibility has opened right up." },
    { title: "Adonara &amp; Solor", sub: "Into the straits", side: "L", photo: [349, 484], image: "images/it-sunda-volcanoes-and-villages-2.webp", alt: "A green island above calm water.",
      text: "There is also the business of getting through those straits, which is worth being on deck for. The gaps between these islands are narrow, deep and fast. Whirlpools, standing waves, glassy patches of water moving at walking pace in the wrong direction. On a map it is a passage between two islands. From the rail it is a river running through the sea, with volcanoes on either side, close enough to pick out the goats." },
    { title: "Lembata", sub: "Volcanoes above water", photo: [366, 458], titleDy: 30, image: "images/it-sunda-volcanoes-and-villages-3.webp", alt: "A green volcano with a plume of smoke, seen from the rail.",
      text: "Above water it is volcanoes. Cones standing straight out of the sea, ridges with smoke coming off them, black beaches under steep green slopes. The islands are culturally dense in a way that catches people out. Each one has its own language and its own weaving, the ikat. It is worked here as a living craft rather than a souvenir, and you only have to walk into a village to see it happening. Traditional dances are still part of everyday life, not a performance invented for visiting boats." },
    { title: "Pantar &amp; Pura", sub: "North · South · and everything between", photo: [350, 484], image: "images/it-sunda-volcanoes-and-villages-4.webp", alt: "A crinoid on a colourful reef.",
      text: "North coasts, south coasts and the channels in between are nothing like each other, and all three are in the same trip. Shallow hard coral gardens in a state that stops people mid-sentence at the surface. Soft coral walls where the tide runs. Pinnacles and drop-offs, schooling jacks and barracuda, tuna passing through. On the exposed sites, a genuine chance of something larger: thresher sharks on the deeper corners, hammerheads along the outer walls, marlin out in the blue, and occasionally a mola turning up months outside its season. None of that is promised. All of it happens here." },
    { title: "Alor", sub: "Look closer", photo: [462, 565], titleDy: 150, image: "images/it-sunda-volcanoes-and-villages-5.webp", alt: "A weedy scorpionfish, close up.",
      text: "Then there is the sand. Black at one island, grey at the next, pale at another, and all of it clean and alive, a long way from the rubbish tips that the word muck usually drags behind it. This is where the guides earn their keep: rhinopias, frogfish, ghost pipefish, nudibranchs nobody can name without a book, and animals that have barely been photographed anywhere else." }
  ],
  storyPad: 100,
  band: {
    title: "The Villages", sub: "Life across the archipelago",
    text: "It is also a quiet rebuttal to a lot of what people assume about Indonesia from a distance. A village with a church, the next one with a mosque, side by side, and nobody here gives it a second thought.<br>Fishermen still work these reefs with traps and hand spears on a single breath, and meeting one at fifteen metres halfway through his working day is usually the story that comes out at dinner.<br>The kids paddle out to the boat in dugouts and stay as long as anyone will keep playing with them."
  },
};

ITINERARY_V2["papua-corals-and-cloves"] = {
  subtitle: "Sorong → Ternate · 11 days",
  route: { from: "Sorong", to: "Ternate", days: "11 days", toRegion: "moluccas" },
  intro: "Eleven days from Raja Ampat to the volcanic islands of Ternate and Tidore, following the length of Halmahera in between. Three regions, three very different kinds of diving, and a route that crosses both the equator and one of Indonesia’s great biological boundaries.",
  map: "images/it-zoom-papua-corals-and-cloves.png",
  mapBox: [754, 266, 363, 246],
  mapAlt: "Route of Coral and Cloves, from Sorong through Raja Ampat and along Halmahera to Ternate.",
  sea: "images/fond-carnet-itineraire.webp",
  card: {
    title: "Coral and Cloves",
    days: "11 days", path: "Sorong → Ternate",
    when: "March",
    route: ["Sorong", "Raja Ampat", "Pisang Islands", "Halmahera", "Bacan", "Guraici", "Makian", "Ternate"],
    diving: ["Mantas", "Wobbegongs", "Walking sharks", "Pinnacles", "Walls", "Black sand", "Exploratory diving"]
  },
  steps: [
    { title: "Raja Ampat", sub: "Beyond the usual route", photo: [349, 483], image: "images/it-papua-corals-and-cloves-1.webp", alt: "A school of barracuda in blue water.",
      text: "The Raja Ampat days focus on Fam, Yanggefo, Yeben and Kofiau, away from the busier Dampier Strait.<br>The diving covers the full Raja repertoire: pinnacles in tidal flow with jacks and barracuda, manta cleaning stations, wobbegongs beneath table corals, shallow coral gardens and walking sharks after dark." },
    { title: "Across the line", sub: "From one biological<br>world to another", subLines: 2, photo: [508, 403], textW: 460, image: "images/it-papua-corals-and-cloves-2.webp", alt: "A forested shoreline seen from the water.",
      text: "Raja Ampat lies on the Australian side of the Lydekker Line; Halmahera sits west of it in Wallacea. Somewhere during the crossing, the boat quietly leaves one biological region for another. The equator is harder to miss. We cross that too, with the traditional ceremony on board. The Pisang Islands sit along the way, remote and rarely visited before the route reaches Halmahera." },
    { title: "Halmahera", sub: "Where the map starts to thin out", photo: [349, 484], image: "images/it-papua-corals-and-cloves-3.webp", alt: "Two birds of paradise on a branch.",
      text: "Halmahera has long stretches of coastline that have barely been dived. The Patinti Strait funnels water and fish between Halmahera and Bacan, while Bacan, Guraici, Kusu and the islands off the southwest coast offer reefs with very little dive traffic.<br>Rainforest runs down to the coast, home to Wallace’s standardwing, a bird of paradise found only in this part of the Moluccas. At dawn, the males display high in the trees, trailing long white wing pennants." },
    { title: "Makian", photo: [462, 565], image: "images/it-papua-corals-and-cloves-4.webp", alt: "Sea fans and soft corals on a wall.",
      text: "Further north, Makian rises as a volcanic cone above fringing reefs, walls and dark sand slopes. At night, Halmahera’s own walking shark moves through the shallows.<br>There is also room here for exploration. Some stretches of coast have no established dive sites at all. When conditions allow, we put the tender in and go and look. Sometimes there is not much there. Sometimes there is." },
    { title: "Ternate &amp; Tidore", sub: "The islands that changed<br>the price of spice", subLines: 2, photo: [352, 484], image: "images/it-papua-corals-and-cloves-5.webp", alt: "Dried cloves, close up.",
      text: "The journey ends between the volcanic cones of Ternate and Tidore, once the centre of the global clove trade.<br>Forts, a sultan’s palace and clove trees still sit on the slopes of Ternate’s active volcano, while the spice itself is still sold in the roadside markets.<br>Alfred Russel Wallace was living on Ternate in 1858 when he wrote down his ideas on natural selection and sent them to Charles Darwin. After eleven days travelling through the region that carries his name, it is a fitting place to finish." }
  ],
  storyPad: 160,
  gap: 274,
};

ITINERARY_V2["papua-tale-of-two-papuas"] = {
  subtitle: "Kaimana → Sorong · 12 days",
  subY: 204,
  intro: "Two of Indonesia’s great reef systems sit at either end of this crossing: Triton Bay and Misool.<br>Between them lies a rarely dived stretch of coast where the exact route changes with weather, tide and time. Depending on conditions, that may mean waterfalls, remote reefs, exploratory dives or places most boats simply pass by.",
  map: "images/it-zoom-papua-tale-of-two-papuas.png",
  mapBox: [751, 246, 373, 260],
  mapAlt: "Route of Tale of Two Papuas, from Kaimana along the Papuan coast to Sorong.",
  sea: "images/fond-carnet-itineraire.webp",
  card: {
    title: "Tale of Two Papuas",
    days: "12 days", path: "Kaimana → Sorong",
    when: "November 2029",
    route: ["Triton Bay", "Papuan Coast", "Misool", "Kitikiti", "Tanjung Papisoi", "Fakfak", "Koon", "Exploration"],
    diving: ["Soft coral", "Wobbegongs", "Walking sharks", "Mobulas", "Mantas", "Seamounts", "Walls", "Silversides"]
  },
  steps: [
    { title: "Triton Bay", sub: "The reefs do not do subtle", photo: [349, 484], image: "images/it-papua-tale-of-two-papuas-1.webp", alt: "A wooded shoreline seen from the boat's rail, with coconuts.",
      text: "Triton Bay is dense, dark and saturated. Soft coral grows so thick that the rock disappears underneath, with huge sea fans, walls of fusiliers and snapper, wobbegongs lying flat on the reef and walking sharks after dark.<br>Mobulas move through the plankton-rich water in loose groups, while reef mantas work the same productive conditions." },
    { title: "Bagans", sub: "Whale sharks<br>under the nets", subLines: 2, photo: [407, 453], titleDy: 55, textW: 440, image: "images/it-papua-tale-of-two-papuas-2.webp", alt: "Whale sharks feeding beneath a fishing platform.",
      text: "When the moon phase allows, the route can also reach the bagans outside Kaimana, where whale sharks feed beneath the fishing nets. Guests are told in advance whether the timing falls within their trip." },
    { title: "Along the<br>Papuan Coast", sub: "Beyond the known route", photo: [350, 484], titleDy: 70, image: "images/it-papua-tale-of-two-papuas-3.webp", alt: "Anthias over a crinoid on a colourful reef.",
      text: "What happens between Triton Bay and Misool depends on conditions along the way.<br>It may include Kitikiti, where fresh water falls directly from the rock into the sea; Tanjung Papisoi, where Gerry Allen once counted 330 fish species on a single dive; or the jungle and karst coastline of Fakfak, where very little diving has been done.<br>Depending on conditions, the route may also reach Koon, whose best-known site is called Too Many Fish, or spend a day exploring somewhere new." },
    { title: "Silversides", sub: "When the reef turns silver", subW: 500, photo: [337, 412], titleDy: 55, textW: 440, image: "images/it-papua-tale-of-two-papuas-4.webp", alt: "A dense school of silversides.",
      text: "Sometimes silversides arrive in enormous numbers, filling caverns, overhangs and entire sections of wall until the reef behind them disappears.<br>Tuna and trevally break through the schools, opening and closing the whole mass around them. There is no reliable calendar: sometimes it happens at one site, sometimes along much of the route." },
    { title: "Misool", sub: "Where life came back", tGap: 44, textW: 480, photo: [349, 484], image: "images/it-papua-tale-of-two-papuas-5.webp", alt: "Limestone islands rising from turquoise water.",
      text: "Misool feels completely different: limestone islands rising from turquoise lagoons, Boo Windows, the ridges at Fiabacet and sea fans large enough to hide a diver behind.<br>At the cleaning stations, reef mantas queue in the current while oceanic mantas can arrive from deeper water.<br>Inside the no-take zones, the effect of protection is visible underwater. Fish biomass has increased, sharks have returned in numbers, and the difference can sometimes be noticeable within a single dive.<br>Above water, dinghies slip through narrow channels into hidden lagoons and marine lakes.<br>Short climbs lead to viewpoints over the karst archipelago, while ancient ochre handprints, fish and figures remain on the cliff faces." }
  ],
  storyPad: 200,
};

ITINERARY_V2["moluccas-sultans-and-tarsiers"] = {
  subtitle: "Ternate → Bitung · 11 days",
  route: { from: "Ternate", to: "Bitung", days: "11 days", toRegion: "sulawesi" },
  subY: 204,
  intro: "Eleven days between two very different ends of Indonesia: the volcanic sultanates of Ternate and Tidore on one side, and Lembeh’s black-sand macro diving on the other. Most of the journey follows Halmahera, a coastline still barely represented on dive maps, before crossing the Molucca Sea by way of Tifore and Mayu.",
  map: "images/it-zoom-moluccas-sultans-and-tarsiers.png",
  mapBox: [752, 245, 373, 270],
  mapAlt: "Route of Sultans and Tarsiers, from Ternate along Halmahera and across the Molucca Sea to Bitung.",
  sea: "images/fond-carnet-itineraire.webp",
  card: {
    title: "Sultans and Tarsiers",
    days: "11 days", path: "Ternate → Bitung",
    when: "March 2029",
    route: ["Ternate", "Tidore", "Halmahera", "Bacan", "Guraici", "Makian", "Tifore", "Mayu", "Lembeh", "Bitung"],
    diving: ["Exploratory reefs", "Walls", "Hard coral", "Black sand", "Barracuda", "Bigeye trevally", "Macro", "Night diving"]
  },
  steps: [
    { title: "Ternate &amp; Tidore", sub: "The islands that changed<br>the price of spice", subLines: 2, subLh: 50, tGap: 104, photo: [346, 479], image: "images/it-moluccas-sultans-and-tarsiers-1.webp", alt: "A stilted pavilion over turquoise water.",
      text: "Ternate and Tidore sit side by side, two volcanic islands that once controlled the world’s supply of cloves.<br>Their sultanates still exist, their palaces are still inhabited, and the old European forts remain part of everyday life. Above Ternate, the volcano is active and clove trees still grow on its slopes." },
    { title: "Halmahera", sub: "Beyond the dive map", photo: [402, 361], titleDy: 15, textW: 445, image: "images/it-moluccas-sultans-and-tarsiers-2.webp", alt: "An octopus sheltering in a shell on black sand.",
      text: "Halmahera takes up the largest part of the journey. Long stretches of its coastline still have no established dive sites, descriptions or photographs.<br>The underwater landscape is volcanic: black walls, hard-coral ridges and dark-sand channels. The Patinti Strait funnels current and fish between Halmahera and Bacan, while Bacan, Guraici and Kusu see very little dive traffic.<br>Exploration is built into the itinerary. When conditions allow, we put the tender in and look at sections of coast that may never have been properly dived before." },
    { title: "Makian", sub: "A volcano in the blue", photo: [346, 479], titleDy: 115, image: "images/it-moluccas-sultans-and-tarsiers-3.webp", alt: "A whip coral covered in polyps.",
      text: "Further north, Makian rises from the sea as a single volcanic cone, with reef wrapped around its base.<br>It is one of the places where the geography above water and the diving below feel like part of the same thing." },
    { title: "Tifore", sub: "Alone in the blue", subW: 500, photo: [334, 409], titleDy: 35, textW: 440, image: "images/it-moluccas-sultans-and-tarsiers-4.webp", alt: "A school of fish in blue water.",
      text: "Then comes the Molucca Sea.<br>Tifore sits almost alone in open water, its reef acting as the only structure for miles. Barracuda hang in curtains off the corner, bigeye trevally gather in dense schools, and predators arrive from the blue without warning." },
    { title: "Mayu", sub: "Further into the Molucca Sea", photo: [346, 478], titleDy: 100, image: "images/it-moluccas-sultans-and-tarsiers-5.webp", alt: "A pipefish on the reef.",
      text: "Further along the crossing, Mayu offers the same sense of isolation when conditions allow.<br>These are not stopover dives. For many, they become some of the dives of the trip." },
    { title: "Lembeh", sub: "Where the strange things live", subW: 500, photo: [334, 408], titleDy: 36, textW: 440, image: "images/it-moluccas-sultans-and-tarsiers-6.webp", alt: "A hairy frogfish on black sand.",
      text: "At the Sulawesi end is Lembeh, one of the names macro divers already know.<br>Black sand and rubble hide mimic octopus, hairy frogfish, flamboyant cuttlefish, blue-ringed octopus, wonderpus, Bobbit worms and seahorses. The diving is slow, shallow and usually calm, with even more happening after dark.<br>It is not pretty in the conventional sense. That is precisely the point." },
    { title: "Tangkoko", sub: "Eyes in the dusk", photo: [346, 478], titleDy: 100, image: "images/it-moluccas-sultans-and-tarsiers-7.webp", alt: "A spectral tarsier on a branch.",
      text: "From the anchorage, Tangkoko is about an hour away.<br>Black crested macaques move through the forest with little interest in people, while spectral tarsiers emerge from their fig trees at dusk. Hornbills and cuscus share the same forest. A very different end to a journey that began with volcanoes, forts and cloves." }
  ],
  storyPad: 157,
  gap: 322,
};

ITINERARY_V2["sulawesi-sponges-and-stilts"] = {
  subtitle: "Bitung → Baubau · 11 days",
  subY: 204,
  introY: 560,
  intro: "Eleven days through the Gulf of Tomini and down the middle of Sulawesi, on a route few dive boats ever run. Much of the journey takes place on reefs with no other liveaboards, no day boats and often nobody else in the water. Sulawesi itself sits in Wallacea, between the biological worlds of Asia and Australia. That unusual history shows above and below water, and helps explain why the reefs along this route so often feel unlike anywhere else.",
  map: "images/it-zoom-sulawesi-sponges-and-stilts.png",
  mapBox: [795, 253, 284, 292],
  mapAlt: "Route of Sponges and Stilts, from Bitung through the Gulf of Tomini and down to Baubau.",
  sea: "images/fond-carnet-itineraire.webp",
  card: {
    title: "Sponges and Stilts",
    days: "11 days", path: "Bitung → Baubau",
    when: "March 2029",
    route: ["Bitung", "Gorontalo", "Una Una", "Togian Islands", "Walea", "Pulau Dua", "Banggai", "Labengki", "Baubau"],
    diving: ["Sponge walls", "Hard coral", "Barracuda", "Jacks", "Wreck", "Macro", "Soft coral", "Remote reefs"]
  },
  steps: [
    { title: "Gorontalo", sub: "Where the walls turn surreal", photo: [346, 479], titleDy: 74, image: "images/it-sulawesi-sponges-and-stilts-1.webp", alt: "A diver above a huge barrel sponge.",
      text: "The Gorontalo coast drops almost straight from shore into one of Indonesia’s most unusual sponge-covered walls.<br>Huge barrel sponges grow beside the patterned sponge locals named after Salvador Dalí, known for the swirling forms across its surface and found here almost nowhere else.<br>Caves, crevices and overhangs cut through the wall, usually in excellent visibility." },
    { title: "Una Una", sub: "A volcano full of life", photo: [402, 448], titleDy: 56, textW: 430, image: "images/it-sulawesi-sponges-and-stilts-2.webp", alt: "Sea fans and soft corals on a reef wall.",
      text: "Una Una is essentially a volcano rising out of the Gulf of Tomini, with a village at its foot and healthy hard-coral reefs running down its flanks.<br>Barracuda school in the blue, jacks form walls, sweetlips gather in numbers and sharks move through reefs that see remarkably few divers." },
    { title: "Togian Islands", sub: "Still water, wild reefs", photo: [346, 478], titleDy: 120, image: "images/it-ph-fishwall.webp", alt: "A dense school of fish in the shallows.",
      text: "Sheltered inside the gulf, the Togian Islands bring calm water, little current and coral gardens in consistently clear conditions.<br>A marine lake holds stingless jellyfish, while a nearly intact B24 Liberator lies in shallow water, a wartime aircraft that can be dived on a single tank without technical qualifications. At the eastern end, Walea adds walls, macro slopes and reefs." },
    { title: "Pulau Dua", sub: "Where the fish take over", subW: 500, photo: [334, 407], titleDy: 35, textW: 410, image: "images/it-sulawesi-sponges-and-stilts-4.webp", alt: "Anthias over a colourful reef wall.",
      text: "Pulau Dua is about sheer numbers.<br>Barracuda hang off walls and pinnacles, jacks turn in columns and snapper pack the drop-offs on sites that remain barely dived." },
    { title: "Banggai", sub: "Colour in the middle of nowhere", photo: [346, 479], titleDy: 100, image: "images/it-sulawesi-sponges-and-stilts-5.webp", alt: "A striped reef fish among sea urchins.",
      text: "The Banggai Islands change the mood again, with dense soft coral and unexpected colour in the shallows.<br>Among the sea urchins lives the Banggai cardinalfish, a small striped species that occurs naturally nowhere else in the world." },
    { title: "Labengki", sub: "Beyond the hidden lagoons", subW: 500, photo: [334, 407], titleDy: 35, textW: 425, image: "images/it-sulawesi-sponges-and-stilts-6.webp", alt: "A karst tower covered in green above turquoise water.",
      text: "Karst towers and hidden bays rise from turquoise water around Labengki, with lagoons that only reveal themselves once the boat is inside.<br>Locals call it the mini Raja Ampat." },
    { title: "Bajau Villages", sub: "Life above the reef", photo: [346, 479], titleDy: 105, image: "images/it-sulawesi-sponges-and-stilts-7.webp", alt: "Stilt houses over shallow water at sunset.",
      text: "Throughout the journey, Bajau villages stand on stilts above the reef flats, often with no land beneath them at all.<br>These communities have lived on and above the water for centuries. Visits are made with time and with people who know the villages, rather than simply passing by for photographs." },
    { title: "Baubau", sub: "Where the reefs give way to history", subW: 600, photo: [334, 408], titleDy: 40, textW: 430, image: "images/it-sulawesi-sponges-and-stilts-8.webp", alt: "An old cannon in a fortress wall above the town.",
      text: "The route finishes at Baubau on Buton, beneath the walls of one of the world’s largest fortresses.<br>It was built by a sultanate that ruled this part of the archipelago for around four centuries, giving the journey a very different final chapter from the reefs and remote islands that come before it." }
  ],
  storyPad: 150,
  gap: 329,
};

ITINERARY_V2["moluccas-forts-and-forests"] = {
  subtitle: "Ambon → Kaimana · 12 days",
  route: { from: "Ambon", to: "Kaimana", days: "12 days", toRegion: "papua" },
  introY: 536,
  intro: "There is a reason this trip runs in November and not in any other month. It is the short overlap when the Banda Sea is still in migration mode, with schooling hammerheads and migrating whales, while the nutrient-loaded water of Triton Bay has usually cleared enough to show what is growing below. Either half would justify a trip. Getting both in one crossing takes November.",
  map: "images/it-zoom-moluccas-forts-and-forests.png",
  mapBox: [790, 285, 326, 204],
  mapAlt: "Route of Forts and Forests, from Ambon across the Banda Sea to Kaimana.",
  sea: "images/fond-carnet-itineraire.webp",
  card: {
    title: "Forts and Forests",
    days: "12 days", path: "Ambon → Kaimana",
    when: "November 2028 & 2031",
    route: ["Ambon", "Nusa Laut", "Banda", "Watubela", "Papua", "Triton Bay", "Kaimana"],
    diving: ["Hammerheads", "Whales", "Mantas", "Whale sharks", "Soft coral", "Walls", "Night diving"]
  },
  steps: [
    { title: "Ambon &amp; Nusa Laut", photo: [346, 479], top: 1574, leave: 2063, titleDy: 71, tGap: 105, image: "images/it-moluccas-forts-and-forests-1.webp", alt: "A wooded shoreline seen over the boat's rail, with coconuts.",
      text: "It starts near Ambon at Nusa Laut, one of the Lease islands and one of the healthiest reefs in this part of Indonesia, protected by the village that owns it and looking the way reefs looked before most of us started diving.<br>A gentle opening dive, and an unfairly good one." },
    { title: "Banda", sub: "Where the story is still written into<br>the landscape", subLines: 2, subFs: 26, subLh: 32, subW: 520, tGap: 93, photo: [402, 447], top: 2382, arrive: 2378, leave: 2786, titleDy: 10, textW: 440, image: "images/it-moluccas-forts-and-forests-2.webp", alt: "Whale sharks feeding beneath a fishing platform.",
      text: "Then Banda.<br>Four hundred years ago these few small islands were the only place on earth where nutmeg grew, which made them the most fought-over ground in the world and pulled every European power with a fleet into the eastern seas.<br>That history has not been tidied away.<br>Banda Neira still has its street plan, its Dutch forts and the volcano standing over the anchorage. The plantations are still worked, the drying racks are still in front of the houses, and the people here will tell you the story themselves.<br>Underwater, the walls fall away straight from the shoreline, the lava flow from the 1988 eruption has grown back into something remarkable, and the mandarinfish come out at dusk." },
    { title: "Watubela", sub: "Fed from below", photo: [346, 478], top: 3108, arrive: 3176, leave: 3615, leaveX: 670, titleDy: 120, textW: 470, image: "images/it-moluccas-forts-and-forests-3.webp", alt: "Anthias swarming over a crinoid on the reef.",
      text: "Then the horizon opens<br>From there we head east through the Watubela islands, scattered between the Banda and Seram Seas, where almost nobody dives and the reefs show it.<br>This is also where the trip becomes a proper crossing. Days of open water with the boat moving and nothing on the horizon, which is when the good things tend to happen.<br>The Banda Sea in November is one of the better places in the world for schooling hammerheads, and the same water is a migration corridor for whales, sperm whales in these straits most of the year and the big migrating ones passing through in November.<br>Nothing out here is promised. Everything is watched for." },
    { title: "Papua", sub: "From Asia to Oceania, without<br>leaving Indonesia", subLines: 2, subFs: 28, subLh: 31, subW: 500, tGap: 125, photo: [334, 408], top: 3925, arrive: 3926, leave: 4321, titleDy: 10, textW: 440, image: "images/it-moluccas-forts-and-forests-4.webp", alt: "A dense school of silversides.",
      text: "Then Papua, and the change is abrupt.<br>The coastline turns into jungle running straight down to the water, karst walls, hidden bays, birds calling from inside the trees.<br>There are cuscus in the canopy and kangaroos in these forests.<br>This is the west coast of New Guinea, so the sun goes down into open water with the jungle at your back, and the skies out here are enormous.<br>We stop at the Kitikiti waterfalls, where fresh water comes straight off the rock into the sea and you can swim under it." },
    { title: "Triton Bay &amp; Aiduma", sub: "The reefs do not do subtle", photo: [346, 478], top: 4723, arrive: 4762, titleDy: 45, textW: 670, image: "images/it-moluccas-forts-and-forests-5.webp", alt: "Soft corals and anthias on a saturated reef.",
      text: "Triton Bay and Aiduma are the payoff.<br>The reefs here are the densest and most saturated in Indonesia, orange soft coral packed so tightly the rock underneath disappears, walls of fusiliers and snapper in numbers that look edited, and the whole thing lit up in a way that makes photographers behave strangely.<br>Wobbegongs lie flat on the reef waiting to be noticed, walking sharks come out at night, and the plankton that makes the water rich brings in mantas and mobulas as well as Bryde’s whales, which work these bays and are seen from the boat more often than anyone expects.<br>And then the bagans, the fishing platforms outside Kaimana, where whale sharks come to feed under the nets.<br>We time this departure to the right phase of the moon, because the darker nights bring the bagans better catches and the sharks better reasons to stay.<br>Twelve days from a spice island to a rainforest coast, from one continent to another, and the two halves have almost nothing in common except the water in between." }
  ],
  storyEnd: 5311,
};

ITINERARY_V2["sunda-nirvana-and-lava"] = {
  subtitle: "Baubau → Maumere · 12 days",
  route: { from: "Baubau", to: "Maumere", days: "12 days", toRegion: "sunda-islands" },
  introY: 538,
  intro: "Twelve days, three seas and one active volcano. From Wakatobi’s reef systems, we cross the Banda Sea via Batu Tara before reaching Alor and the Savu Sea, where the southern coast is diveable for only a few weeks each year.",
  map: "images/it-zoom-sunda-nirvana-and-lava.png",
  mapBox: [800, 284, 314, 226],
  mapAlt: "Route of Nirvana and Lava, from Baubau across the Banda Sea to Maumere.",
  sea: "images/fond-carnet-itineraire.webp",
  card: {
    title: "Nirvana and Lava",
    days: "12 days", path: "Baubau → Maumere",
    when: "April 2029",
    route: ["Baubau", "Wakatobi", "Banda Sea", "Batu Tara", "Alor", "Solor", "Pantar Strait", "Savu Sea", "Maumere"],
    diving: ["Walls", "Seamounts", "Soft coral", "Gorgonians", "Black sand", "Volcanic bubbles", "Remote southern reefs"]
  },
  steps: [
    { title: "Wakatobi", sub: "The reputation holds up", photo: [346, 485], top: 1574, leave: 2070, titleDy: 70, textW: 480, image: "images/it-sunda-nirvana-and-lava-1.webp", alt: "A large sea fan on a reef wall.",
      text: "Wakatobi takes its name from Wangi Wangi, Kaledupa, Tomia and Binongko. Around these four islands lie roughly twenty-five reef systems: fringing reefs, offshore barriers and atolls. With little sediment, the water stays exceptionally clear over walls lined with soft coral and gorgonians.<br>We dive Roma and Blade around Tomia, plus the outer reefs of Kaledupa and Binongko beyond day-boat range." },
    { title: "Banda Sea &amp; Batu Tara", titleW: 620, sub: "Smoke on the horizon", photo: [408, 454], top: 2378, arrive: 2374, leave: 2788, titleDy: 50, textW: 445, image: "images/it-sunda-nirvana-and-lava-2.webp", alt: "A nudibranch crawling over black sand.",
      text: "Then the land disappears. Two days across the Banda Sea lead to Batu Tara, a volcanic cone standing alone in open water.<br>Below the surface, volcanic gas rises through black sand in streams of bubbles, with reef growing on the ash around you." },
    { title: "Alor &amp; Solor", sub: "Fed from below", photo: [347, 485], top: 3103, arrive: 3171, leave: 3603, titleDy: 115, textW: 480, image: "images/it-sunda-nirvana-and-lava-3.webp", alt: "A wire coral spiralling in blue water.",
      text: "Around Alor and Solor, deep, nutrient-rich water feeds steep volcanic slopes covered in hard coral. By April, the strongest upwelling has eased and the water has warmed.<br>There is black-sand diving too, on dark, clean slopes where the guides slow the pace right down. When the anchor drops, dugouts often come out from the villages, with children paddling around the dive deck." },
    { title: "Pantar Strait<br>&amp; The Savu Sea", titleLh: 56, subGap: 10, sub: "A few weeks a year", photo: [339, 414], top: 3926, arrive: 3914, titleDy: 0, textW: 440, image: "images/it-sunda-nirvana-and-lava-4.webp", alt: "Fish over a reef with sea fans.",
      text: "The seasonal shift lets us continue through the Pantar Strait to the exposed southern coast. The sites are bigger, more open and hold more fish than the northern side. This stretch is only reliably diveable for a few weeks a year, and few boats are in position to use that window.<br>The journey ends at Maumere on Flores." }
  ],
  storyEnd: 4539,
};

ITINERARY_V2["papua-four-kings"] = {
  subtitle: "Sorong → Sorong · 12 days",
  subY: 215,
  introY: 582,
  intro: "Raja Ampat means “four kings”: Waigeo, Batanta, Salawati and Misool. Most trips focus on one part of the archipelago. Eleven days gives enough time to run north and south, through regions that feel completely different underwater. With around 1,500 islands and thousands of reefs, there is enough diving here to build several different itineraries without repeating the same sites — and still leave room for the occasional exploratory drop.",
  map: "images/it-zoom-papua-four-kings.png",
  mapBox: [767, 262, 384, 296],
  mapAlt: "Route of The Four Kings, a loop through Raja Ampat from Sorong.",
  sea: "images/fond-carnet-itineraire.webp",
  card: {
    title: "The Four Kings",
    days: "11 days", path: "Sorong → Sorong",
    when: "December 2028 – March 2029",
    route: ["Dampier Strait", "Fam & Penemu", "Waigeo", "Wayag", "Batanta", "Gam", "Misool"],
    diving: ["Current-swept pinnacles", "Hard coral", "Mantas", "Wobbegongs", "Walking sharks", "Muck", "Macro", "Exploration"]
  },
  steps: [
    { title: "Dampier Strait", sub: "Where the current brings<br>everything to life", subLines: 2, subLh: 48, tGap: 108, photo: [348, 482], top: 1574, leave: 2067, titleDy: 70, textW: 450, image: "images/it-papua-four-kings-1.webp", alt: "A huge sea fan on a reef wall.",
      text: "The Dampier Strait is where current drives the action.<br>At Blue Magic, Cape Kri and Sardine Reef, jacks, batfish, barracuda and whitetips gather around pinnacles swept by the flow. Mantas use the cleaning stations at Manta Sandy, while wobbegongs rest beneath table corals and walking sharks appear after dark." },
    { title: "Fam &amp; Penemu", sub: "The Raja Ampat everyone came to see", subW: 500, photo: [405, 450], top: 2385, arrive: 2382, leave: 2792, titleDy: 52, textW: 425, image: "images/it-papua-four-kings-2.webp", alt: "A nudibranch on black sand.",
      text: "Around Fam and Penemu, the reefs shift into shallow hard-coral gardens.<br>Melissa’s Garden spreads across hundreds of metres of staghorn and table coral in clear water, while above the surface the climb to Piaynemo opens onto the karst islands and lagoons that have become one of Raja Ampat’s defining views." },
    { title: "Northern Waigeo", sub: "Where the crowds disappear", photo: [348, 482], top: 3107, arrive: 3175, leave: 3604, titleDy: 118, textW: 480, image: "images/it-papua-four-kings-3.webp", alt: "A wire coral spiralling in blue water.",
      text: "Further north, the traffic thins out.<br>Aljui Bay brings black sand, mangrove roots and muck diving beside the pearl farm, while Kawe and the reefs towards Wayag are more exposed, current-swept and lightly dived.<br>Above water, limestone islands scatter across turquoise water as far as the eye can see." },
    { title: "Batanta", sub: "Waterfalls between reefs", subW: 500, photo: [337, 411], top: 4024, arrive: 4013, leave: 4424, titleDy: 40, textW: 430, image: "images/it-papua-four-kings-4.webp", alt: "Fish over a reef with sea fans.",
      text: "Batanta adds another side of Raja Ampat, with rivers, waterfalls and muck sites tucked between the larger reef systems. It breaks up the journey with freshwater, jungle and smaller-scale diving before the route turns south again." },
    { title: "Gam", sub: "Dawn with the birds of paradise", photo: [348, 482], top: 4636, arrive: 4704, leave: 5132, titleDy: 115, textW: 470, image: "images/it-papua-four-kings-5.webp", alt: "Two red birds of paradise on a branch.",
      text: "An early morning on Gam offers the chance to watch red birds of paradise display in the canopy.<br>It means being ashore around four in the morning, before the first dive — and seeing one of Raja Ampat’s most distinctive animals away from the reef." },
    { title: "Misool", sub: "Where life came back", subW: 500, photo: [336, 410], top: 5461, arrive: 5450, titleDy: 43, textW: 430, image: "images/it-papua-four-kings-6.webp", alt: "Fish over a reef with sea fans.",
      text: "Misool shifts the scenery again: clearer water, taller limestone and reefs transformed by protection.<br>Boo Windows, Fiabacet and the seamount cleaning stations bring huge gorgonians, reef mantas and occasional oceanic mantas, while the no-take zones hold noticeably more fish and sharks.<br>Above water, hidden lagoons, marine lakes, viewpoints and ancient ochre handprints complete the change of atmosphere." }
  ],
  storyEnd: 6073,
};

ITINERARY_V2["papua-southern-king"] = {
  subtitle: "Sorong → Sorong · 7 days",
  subY: 215,
  introY: 582,
  intro: "What happens when reefs are left alone<br>Twenty years ago, these waters were heavily fished, including for shark fins. Today, much of Misool is closed to fishing and patrolled by the villages that own the waters. Fish numbers have increased several times over inside protected zones, sharks have returned and manta populations are growing.",
  map: "images/it-zoom-papua-southern-king.png",
  mapBox: [757, 258, 399, 304],
  mapAlt: "Route of The Southern King, a loop south from Sorong through Misool and back.",
  sea: "images/fond-carnet-itineraire.webp",
  card: {
    title: "The Southern King",
    days: "7 days", path: "Sorong → Sorong",
    when: "December – February",
    route: ["Sele Strait", "Daram", "Fiabacet", "Boo", "Pele", "Balbulol"],
    diving: ["Mantas", "Sharks", "Wobbegongs", "Walking sharks", "Mobulas", "Soft coral", "Pygmy seahorses", "Silversides"]
  },
  steps: [
    { title: "Beyond the Reef", photo: [348, 482], top: 1574, link: false, titleDy: 112, textW: 480, image: "images/it-papua-southern-king-1.webp", alt: "A huge sea fan on a reef wall.",
      text: "Away from the dive sites, marine lakes lie hidden inside the islands and short climbs lead to limestone viewpoints over the archipelago.<br><br>On the cliffs, ancient red-ochre handprints, fish and figures remain from people who passed through thousands of years ago." },
    { title: "Unhurried", sub: "Short distances, open days", subW: 500, photo: [405, 450], top: 2385, leave: 2792, titleDy: 50, textW: 435, image: "images/it-papua-southern-king-2.webp", alt: "A nudibranch on black sand.",
      text: "The boat leaves Sorong in the evening and runs south overnight through the Sele Strait, so the first morning already begins among the karst islands. From then until the final evening, distances are short and there are no more night passages. That leaves the week flexible.<br>The order can change with wind, current and conditions, and there is time to move beyond the familiar sites to quieter reefs, rarely photographed walls and bays where the only other boat may be a village canoe." },
    { title: "Daram", sub: "Small life in open water", photo: [349, 482], top: 3107, arrive: 3175, leave: 3604, titleDy: 118, textW: 470, image: "images/it-papua-southern-king-3.webp", alt: "A wire coral spiralling in blue water.",
      text: "On the eastern edge of Misool, ridges and rock towers rise in open water.<br>Barracuda hang off the corners, Spanish mackerel cut through the blue, and tiny red-and-white Santa Claus pygmy seahorses hide among the sea fans." },
    { title: "Fiabacet &amp; Boo", sub: "Where the action builds", subW: 500, photo: [336, 411], top: 4024, arrive: 4013, leave: 4423, titleDy: 52, textW: 440, image: "images/it-papua-southern-king-4.webp", alt: "Fish over a reef with sea fans.",
      text: "Further southwest, the diving changes gear.<br>Reef mantas move over the seamounts and cleaning stations, while fusiliers, snapper, batfish and sweetlips gather in dense schools. Grey reef sharks patrol the drop-offs, wobbegongs rest beneath table corals and walking sharks appear in the shallows after dark." },
    { title: "Pele", sub: "When the walls come alive", photo: [349, 482], top: 4636, arrive: 4704, leave: 5133, titleDy: 118, textW: 470, image: "images/it-papua-southern-king-5.webp", alt: "A wire coral spiralling in blue water.",
      text: "At Pele, the cast changes again.<br>Large groupers hold the reef, mobulas pass through in loose groups and batfish gather in the blue. When the silversides arrive, they can fill overhangs and entire sections of wall, drawing predators in from all around." },
    { title: "Balbulol", sub: "Where the reef turns<br>kaleidoscopic", subLines: 2, subLh: 32, tGap: 90, subW: 500, photo: [336, 410], top: 5461, arrive: 5449, titleDy: 43, textW: 440, image: "images/it-papua-southern-king-6.webp", alt: "Fish over a reef with sea fans.",
      text: "Balbulol brings layers of soft coral and sea fans, with frogfish sitting in the open and nudibranchs hidden among the colour.<br>In the afternoon, the tenders enter the lagoon system, threading between limestone into still green pools that only reveal themselves once you are inside.<br>That evening, the boat turns north through the Sele Strait for the overnight passage back to Sorong." }
  ],
  storyEnd: 6073,
};

ITINERARY_V2["sunda-east-meets-west"] = {
  subtitle: "Maumere to Bali - 11 days",
  subX: 741, subY: 203,
  introBox: [659, 522], introY: 520,
  intro: "This route became a classic because generations of divers sailed it, came home changed, and told everybody. You fly out to the far end of the archipelago, join WAOW 2 in Flores, and spend eleven days sailing home. In between is a border that appears on no political map and still separates more deeply than most: you leave the Indonesia almost nobody has seen, and arrive in the one everybody thinks they know.",
  map: "images/it-zoom-sunda-east-meets-west.png",
  mapBox: [700, 263, 397, 233],
  mapAlt: "Route of East Meets West, from Maumere along Flores and Sumbawa to Bali.",
  sea: "images/fond-carnet-itineraire.webp",
  card: {
    title: "East Meets West",
    days: "11 days", path: "Maumere to Bali",
    when: "End of May · one departure a year",
    route: ["North Flores", "Komodo", "Sangeang Api", "Saleh Bay", "Lombok Strait", "Bali"],
    diving: ["Deep walls", "Mantas", "Sharks", "Whale sharks", "Volcanic macro", "Night diving"]
  },
  steps: [
    { title: "North Flores", sub: "The quiet days", photo: [350, 483], top: 1574, leave: 2068, titleDy: 30, subGap: 68, tGap: 95, textW: 470, image: "images/it-sunda-east-meets-west-1.webp", alt: "A quiet beach on the north coast of Flores.",
      text: "The first days are the quiet ones, along the north coast of Flores.<br>A long, mountainous, volcanic coastline with almost no boats on it, and deep reef underneath.<br>Walls drop straight into blue water. Big gorgonians. Hard coral that has seen very little disturbance.<br>These are sites we have dived for years and know how to take on the right tide, at the right hour." },
    { title: "Komodo", sub: "Where two waters meet", photo: [365, 456], top: 2441, arrive: 2394, leave: 2805, titleDy: -15, subGap: 52, textW: 445, image: "images/it-sunda-east-meets-west-2.webp", alt: "Padar Island's hills over the bays of Komodo National Park.",
      text: "Then comes Komodo National Park.<br>Cold water pushes up from the Indian Ocean and collides with warm water from the Flores Sea.<br>The whole park runs on that collision.<br>Mantas queue at the cleaning stations of Karang Makassar and stack up in the current at Manta Alley. Crystal Rock and Castle Rock hold trevally and sharks in the tide. Batu Bolong is a single pinnacle wearing just about every reef fish in the province.<br>Whether we push south is decided once we are out there.<br>We read the water, not the brochure.<br>Ashore, the dragons are exactly as prehistoric as advertised, and rather less sleepy." },
    { title: "Sangeang Api<br>&amp; Sumbawa", titleLh: 56, subGap: 30, sub: "From macro to whale sharks", subW: 520, photo: [349, 479], top: 3114, arrive: 3183, titleDy: 60, textW: 480, image: "images/it-sunda-east-meets-west-3.webp", alt: "A green island above calm water.",
      text: "West of the park, the diving changes character again.<br>At Sangeang Api, black volcanic sand bubbles beneath the surface, home to frogfish and a whole strange cast of animals that live on ash rather than coral.<br>Further west, Saleh Bay cuts deep into northern Sumbawa.<br>Here, whale sharks come to the bagans — fishing platforms that draw anchovies with lights through the night.<br>At first light, the sharks are there, hanging vertically just below the surface and feeding.<br>Close enough that the only problem is fitting one into the frame." }
  ],
  storyEnd: 3831,
  band: {
    h: 620, titleY: 60, titleLh: 54, textY: 215, textW: 440,
    title: "No two days ask the<br>same thing of you",
    text: "Big animal diving and macro diving are usually two different holidays.<br>Here, they are a single cruise.<br>The night diving deserves its own mention. So does the range of levels: Komodo has sites that will test a diver with a thousand logged dives, and sheltered bays half an hour away where somebody fresh out of their course can have the best dive of their life.<br>We split the groups accordingly and say plainly what to expect on each dive.<br>And photographers get to plan properly for once:<br>Wide angle before lunch. Macro after."
  },
  tail: {
    storyEnd: 5227,
    steps: [
      { sub: "The line between two worlds", subColor: "blue", subW: 520, align: "right", photo: [494, 559], top: 4551, titleDy: 100, tGap: 80, textW: 480, image: "images/it-sunda-east-meets-west-4.webp", alt: "Padar Island's hills over the bays of Komodo National Park.",
        text: "On the last night, somewhere in the deep water of the Lombok Strait, WAOW 2 sails back into Asia.<br>Alfred Russel Wallace spotted that line in the 1850s by paying attention to birds. It carries his name, and it still holds.<br>Bali belongs to Asia, with its monkeys and woodpeckers.<br>Cockatoos and marsupials begin on the other side.<br>Everything you have dived for ten days lies in Wallacea — the transition zone between two continents that were never joined.<br>The animals there belong fully to neither. And more and more, they exist nowhere else on Earth.<br>The crossing takes a night.<br>What it crosses took forty million years to form." }
    ]
  },
};

ITINERARY_V2["sunda-west-meets-east"] = {
  name: "West Meets East",
  subtitle: "Bali to Maumere - 11 days",
  subX: 769, subY: 228,
  introBox: [674, 566], introY: 579,
  intro: "This is the first time WAOW 2 carries guests. Everything on board will be new, the sea trials behind us, and ahead of us eleven days on the route that made this part of Indonesia famous among divers. WAOW 2 will have a long history. This is where it begins, and there is room for twenty people.",
  map: "images/it-zoom-sunda-west-meets-east.png",
  mapBox: [707, 297, 437, 256],
  mapAlt: "Route of West Meets East, from Bali along Sumbawa and Flores to Maumere.",
  sea: "images/fond-carnet-itineraire.webp",
  card: {
    title: "West Meets East",
    days: "11 days", path: "Bali → Maumere",
    when: "October 2028",
    route: ["Lombok Strait", "Moyo", "Saleh Bay", "Sangeang Api", "Komodo", "North Flores"],
    diving: ["Whale sharks", "Mantas", "Sharks", "Volcanic macro", "Hard coral", "Deep walls", "Night diving"]
  },
  // Measured from the Canva (page coordinates).
  layout: [
    { side: "L", photo: [785, 1574, 536, 515], title: 1571, sub: 1710, text: 1792, tx: [170, 502] },
    { side: "R", photo: [122, 2432, 389, 486], title: 2415, sub: 2507, text: 2600, tx: [780, 460] },
    { side: "L", photo: [861, 3106, 373, 516], title: 3172, sub: 3313, text: 3408, tx: [160, 500] },
    { side: "R", photo: [122, 3969, 389, 487], title: 4010, sub: 4076, text: 4169, tx: [762, 478] },
    { side: "L", photo: [861, 4643, 373, 515], title: 4660, sub: 4737, text: 4831, tx: [136, 500] },
    { side: "R", photo: [122, 5506, 389, 486], title: 5547, sub: 5613, text: 5707, tx: [770, 470] }
  ],
  links: [
    { dir: "right", a: [586, 2101], b: [895, 2382] },
    { dir: "left",  a: [728, 2821], b: [618, 3179] },
    { dir: "right", a: [586, 3638], b: [895, 3919] },
    { dir: "left",  a: [728, 4358], b: [618, 4716] },
    { dir: "right", a: [586, 5175], b: [895, 5456] }
  ],
  storyEnd: 6192,
  steps: [
    { title: "Crossing<br>the line", titleLh: 58, sub: "The journey east", photo: [350, 483], titleDy: -20, subGap: 24, tGap: 85, textW: 470, image: "images/it-sunda-west-meets-east-1.webp", alt: "A quiet beach with a rocky islet.",
      text: "The trip runs eastward, which is the direction that makes the geography legible. You leave Bali in the morning and spend the first day crossing the Lombok Strait. Somewhere in that deep water you leave Asia behind, and cross a border that appears on no political map : The Wallace line." },
    { title: "Moyo", sub: "A gentle start", photo: [365, 456], titleDy: -10, subGap: 60, tGap: 85, textW: 450, image: "images/it-sunda-west-meets-east-2.webp", alt: "A waterfall into a green pool.",
      text: "The first diving is the next morning at Moyo, off the north coast of Sumbawa. A gentle way to start: clear water, hard coral gardens, an easy check dive to sort your weighting and get used to a boat nobody has been on before.<br>A waterfall and a swimming hole are waiting inland, if you want an hour somewhere other than on board or underwater." },
    { title: "Saleh Bay", sub: "Whale sharks at first light", subW: 520, photo: [349, 483], titleDy: 35, subGap: 110, tGap: 85, textW: 480, image: "images/it-sunda-west-meets-east-3.webp", alt: "Whale sharks feeding under a fishing platform.",
      text: "Overnight the boat moves east into Saleh Bay, the enormous sheltered bight that cuts deep into the island.<br>This is where the whale sharks come to the bagans, the fishing platforms that draw anchovies with lights through the night.<br>You get up in the dark. At first light the sharks are there, hanging vertically just under the surface, feeding, close enough that the only problem is fitting one into the frame." },
    { title: "Sangeang Api", sub: "Life on volcanic sand", photo: [365, 456], titleDy: 5, subGap: 45, tGap: 85, textW: 450, image: "images/it-sunda-west-meets-east-4.webp", alt: "A green volcanic slope under cloud, with a lighthouse.",
      text: "Further east, Sangeang Api brings its black volcanic sand, where bubbles rise through the slope between the frogfish and the whole strange cast of animals that live on ash rather than coral." },
    { title: "Komodo", sub: "Where two seas collide", photo: [365, 456], titleDy: -15, subGap: 50, tGap: 80, textW: 470, image: "images/it-sunda-west-meets-east-5.webp", alt: "A rock arch in the sea at Komodo.",
      text: "Then comes Komodo National Park.<br>Cold water rising from the Indian Ocean meets the warmer Flores Sea, creating the conditions that make the park so alive. Mantas gather at the cleaning stations of Karang Makassar and in the currents of Manta Alley. Trevally and sharks hold in the tide at Crystal Rock and Castle Rock. Batu Bolong rises as a single pinnacle covered in reef life.<br>October marks the end of the dry season. Above water, the hills turn burnt gold. Below, the south of the park can remain cold, green and nutrient-rich, conditions behind the macro life of Cannibal Rock and Horseshoe Bay. Whether we head south is decided once we're there. We read the water, not the brochure. And ashore, the dragons are waiting." },
    { title: "North Flores", sub: "End somewhere quiet", photo: [367, 459], titleDy: 0, subGap: 45, tGap: 85, textW: 500, image: "images/it-sunda-west-meets-east-6.webp", alt: "A three-masted ship anchored below green hills.",
      text: "The journey finishes where many itineraries never go. Along the north coast of Flores, a mountainous volcanic coastline sees very few boats. Below it, deep reefs drop straight into blue water. Big gorgonians. Hard coral. Sites WAOW has dived for years and knows how to approach on the right tide, at the right hour. Eleven days after leaving Bali, you step off in Flores. A long way east of where you started, in every sense that matters." }
  ],
  band: {
    h: 651, titleY: 92, titleLh: 59, textY: 263, textW: 470,
    title: "No two days ask the<br>same thing of you",
    text: "Big animal diving and macro diving are usually two different holidays.<br>Here, they are a single cruise.<br>The night diving deserves its own mention. So does the range of levels: Komodo has sites that will test a diver with a thousand logged dives, and sheltered bays half an hour away where somebody fresh out of their course can have the best dive of their life.<br>We split the groups accordingly and say plainly what to expect on each dive.<br>And photographers get to plan properly for once:<br>Wide angle before lunch. Macro after."
  },
  tail: {
    layout: [{ side: "L", photo: [743, 6945, 527, 598], title: 0, sub: 7041, text: 7143, tx: [137, 506] }],
    storyEnd: 7620,
    steps: [
      { sub: "The line between two worlds", subColor: "blue", subW: 640, align: "right", image: "images/it-sunda-west-meets-east-7.webp", alt: "Padar Island's hills over the bays of Komodo National Park.",
        text: "On the last night, somewhere in the deep water of the<br>Lombok Strait, WAOW 2 sails back into Asia.<br>Alfred Russel Wallace spotted that line in the 1850s by paying attention to birds. It carries his name, and it still holds.<br>Bali belongs to Asia, with its monkeys and woodpeckers.<br>Cockatoos and marsupials begin on the other side.<br>Everything you have dived for ten days lies in Wallacea, the transition zone between two continents that were never joined. The animals there belong fully to neither. And more and more, they exist nowhere else on Earth. The crossing takes a night. What it crosses took forty million years to form." }
    ]
  },
};
