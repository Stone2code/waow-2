/**
 * Extra, page-only content for the itinerary template (itinerary.js).
 * Anything not listed for a slug falls back to text derived from
 * ITINERARIES (itineraries-data.js), with TODO placeholders for the story
 * steps. Only "east-meets-west" has its full copy so far (from the design).
 * `steps` is repeatable: any number of steps, alternating left/right.
 */
const ITINERARY_PAGES = {
  "east-meets-west": {
    subtitle: "From Flores to Bali - 11 days",
    hook: [
      "Some routes become classics because a marketing department decided they should.",
      "This one became a classic because generations of divers sailed it, came home changed, and told everybody.",
      "You fly out to the far end of the archipelago, join WAOW II in Flores, and spend eleven days sailing home.",
      "In between is a border that appears on no political map and still separates more deeply than most: you leave",
      "the Indonesia almost nobody has seen, and arrive in the one everybody thinks they know."
    ],
    crossed: ["sunda-islands", "banda-sea"],
    tagline: ["The tide sets the schedule.", "We work around it."],
    card: {
      days: "11 days", path: "Flores → Bali",
      when: "End of May · one departure a year",
      route: ["North Flores · Komodo · Sangeang Api ·", "Saleh Bay · Lombok Strait · Bali"],
      diving: ["Deep walls · Mantas · Sharks ·", "Whale sharks · Volcanic macro · Night diving"]
    },
    steps: [
      { title: "North Flores", sub: "The quiet days", image: "alor-island",
        text: "The first days are the quiet ones, along the north coast of Flores.<br>A long, mountainous, volcanic coastline with almost no boats on it, and deep reef underneath.<br>Walls drop straight into blue water. Big gorgonians. Hard coral that has seen very little disturbance.<br>These are sites we have dived for years and know how to take on the right tide, at the right hour." },
      { title: "Komodo", sub: "Where two waters meet", image: "komodo-island",
        text: "Then comes Komodo National Park.<br>Cold water pushes up from the Indian Ocean and collides with warm water from the Flores Sea.<br>The whole park runs on that collision.<br>Mantas queue at the cleaning stations of Karang Makassar and stack up in the current at Manta Alley. Crystal Rock and Castle Rock hold trevally and sharks in the tide. Batu Bolong is a single pinnacle wearing just about every reef fish in the province.<br>Whether we push south is decided once we are out there.<br>We read the water, not the brochure.<br>Ashore, the dragons are exactly as prehistoric as advertised, and rather less sleepy." },
      { title: "Sangeang Api<br>&amp; Sumbawa", sub: "From macro to whale sharks", image: "alor-island",
        text: "TODO: paragraph for this step (the export cuts it off).<br>Placeholder text — replace with the real copy." }
    ],
    reflection: {
      title: "No two days ask the<br>same thing of you",
      text: "Big animal diving and macro diving are usually two different holidays.<br>Here, they are a single cruise.<br>The night diving deserves its own mention. So does the range of levels: Komodo has sites that will test a diver with a thousand logged dives, and sheltered bays half an hour away where somebody fresh out of their course can have the best dive of their life.<br>We split the groups accordingly and say plainly what to expect on each dive.<br>And photographers get to plan properly for once:<br>Wide angle before lunch. Macro after."
    },
    context: {
      title: "The line between two worlds", image: "komodo-island",
      text: "On the last night, somewhere in the deep water of the Lombok Strait, WAOW II sails back into Asia.<br>Alfred Russel Wallace spotted that line in the 1850s by paying attention to birds. It carries his name, and it still holds.<br>Bali belongs to Asia, with its monkeys and woodpeckers.<br>Cockatoos and marsupials begin on the other side.<br>Everything you have dived for ten days lies in Wallacea — the transition zone between two continents that were never joined.<br>The animals there belong fully to neither. And more and more, they exist nowhere else on Earth.<br>The crossing takes a night.<br>What it crosses took forty million years to form."
    }
  }
};
