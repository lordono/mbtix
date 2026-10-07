import type { Journey } from '../model'

/**
 * One Saturday in Singapore, from alarm clock to last bus.
 *
 * Weighting: every answer has one main lean (2–3 points) plus smaller side-signals
 * (0.5–1) on other axes, so each axis gathers evidence from most scenes. Within a
 * scene, options point their side-signals in different directions so they still
 * tell you something.
 */
export const SATURDAY: Journey = {
  id: 'sat',
  day: 'SAT',
  title: 'Shiok Saturday',
  tagline: 'Kopitiam breakfast, hawker lunch and a first date at Marina Bay.',
  emoji: '🌴',
  line: '#d42e12',
  lineName: 'North-South Line',
  theme: 'sg',
  scenes: [
    {
      id: 'alarm',
      time: '07:30',
      station: 'Toa Payoh',
      art: 'bedroom',
      tod: 0.05,
      title: 'Saturday, finally',
      narration:
        'Sunlight leaks through the {hdb|HDB} window. Downstairs, an {uncle} is slamming mahjong tiles at the {void-deck} like they owe him money. Your whole Saturday is wide open.',
      prompt: 'How does Saturday look in your head right now?',
      interaction: {
        kind: 'cards',
        options: [
          { emoji: '🗒️', label: 'Already in my Notes app since Wednesday', sub: 'Timings, addresses, and a backup plan for the backup plan.', w: { J: 3, S: 0.5, T: 0.5 } },
          { emoji: '🧭', label: 'A rough shape. Brunch, then see', sub: 'One anchor, the rest can float.', w: { J: 1, P: 1, S: 0.5 } },
          { emoji: '🌊', label: '{see-how} lah', sub: 'Plans are just suggestions from past me, and past me is not the boss of me.', w: { P: 3, N: 0.5 } },
        ],
      },
    },
    {
      id: 'gang-chat',
      time: '07:45',
      station: 'Braddell',
      art: 'bedroom',
      tod: 0.1,
      title: 'Bzzt. Bzzt. Bzzt.',
      narration: 'Your phone is vibrating itself off the bedside table. The group chat "Makan Kakis 🍜" has woken up, and it has chosen violence.',
      prompt: 'Reply to the gang:',
      interaction: {
        kind: 'chat',
        contact: 'Makan Kakis 🍜',
        contactEmoji: '🍜',
        incoming: [
          'Jeremy: OI who free today',
          'Priya: East Coast cycling then BBQ!! 8 of us confirmed',
          'Jeremy: @name you coming right 👀 you said "maybe" last time and disappeared for 3 weeks',
        ],
        options: [
          { label: '{can|Can}!! I bring speaker and the extra chicken wings 🔊', w: { E: 3, P: 1, F: 0.5 } },
          { label: 'Maybe later? Morning I recharge first 🔋', w: { I: 3, J: 0.5 } },
          { label: 'Who are the other 5 ah… 👀', w: { I: 1, T: 1, S: 0.5 } },
          { label: "Huat ah, but I've plans tonight. Join for exactly one hour!", w: { E: 1, J: 1 } },
        ],
      },
    },
    {
      id: 'kopi',
      time: '08:30',
      station: 'Novena',
      art: 'kopitiam',
      tod: 0.18,
      title: 'Breakfast at the kopitiam',
      narration:
        'The {kopitiam} {uncle} sees you coming and is already reaching for a cup. But today there is a new chalkboard: "UNCLE SPECIAL ✨ Gula Melaka Pandan Cold Brew". Uncle is watching you. Uncle is hopeful.',
      prompt: 'Slide to place your order.',
      interaction: {
        kind: 'slider',
        weight: 3,
        left: { label: 'The usual: {kopi-c-kosong}, {kaya} toast, 2 soft eggs', emoji: '☕', pole: 'S', also: { J: 1 } },
        right: { label: 'Whatever is on that chalkboard, I need to know', emoji: '✨', pole: 'N', also: { P: 1, E: 0.5 } },
        ticks: ['The usual, obviously', 'Usual, but eyeing it', 'Hmm…', 'One sip of yours?', 'UNCLE, ONE SPECIAL!'],
      },
    },
    {
      id: 'chope',
      time: '09:00',
      station: 'Newton',
      art: 'chope',
      tod: 0.24,
      title: 'The tissue packet',
      narration:
        'Tray in hand, kopi sloshing. The only empty table has a packet of tissue on it. Classic {chope}. It has been 10 minutes. The tissue has not moved. Neither have you.',
      prompt: 'What do you do?',
      interaction: {
        kind: 'cards',
        options: [
          { emoji: '🙇', label: 'Respect the tissue. Rules are rules.', sub: 'I will eat standing like a horse if I must.', w: { J: 1.5, F: 1, S: 0.5 } },
          { emoji: '🗣️', label: '"{auntie}, got people sit here or not?"', sub: 'Just ask the table next to it. Problem solved in 4 seconds.', w: { E: 1.5, T: 1, S: 0.5, P: 0.5 } },
          { emoji: '🤔', label: 'Wonder who left it and where they went', sub: 'Toilet? Queue? Witness protection? Abducted by the chicken rice?', w: { N: 2, I: 1, P: 0.5 } },
        ],
      },
    },
    {
      id: 'mrt',
      time: '10:15',
      station: 'Orchard',
      art: 'mrt',
      tod: 0.32,
      title: 'North-South Line, Saturday crowd',
      narration:
        "Doors open. A loud group of secondary school kids by the door, a quiet corner seat, and the route map above. Then you spot your ex-colleague Wei Ling by the door. She hasn't seen you yet. You still owe her $4.50 from 2019.",
      prompt: "Drag yourself to where you'd end up.",
      interaction: {
        kind: 'drag',
        token: 'you',
        zones: [
          { x: 3, y: 22, width: 25, height: 70, label: 'By the door, saying hi to Wei Ling', w: { E: 3, F: 0.5 } },
          { x: 36, y: 4, width: 30, height: 30, label: 'Under the map, checking the fastest transfer', w: { J: 1, T: 1, I: 1 } },
          { x: 70, y: 40, width: 27, height: 52, label: 'Corner seat, earphones in, invisible mode', w: { I: 3, N: 0.5, P: 0.5 } },
        ],
      },
    },
    {
      id: 'orchard',
      time: '11:30',
      station: 'Somerset',
      art: 'orchard',
      tod: 0.42,
      title: 'Ping from a friend',
      narration: 'Walking down Orchard Road under the rain trees, you get a message from your best friend Marcus.',
      prompt: 'Reply to Marcus:',
      interaction: {
        kind: 'chat',
        contact: 'Marcus 🐢',
        contactEmoji: '🐢',
        incoming: ['bro', 'I failed my driving test AGAIN', 'third time liao 😭 {jialat}', 'the examiner sighed so loud the car shook'],
        options: [
          { label: "Which part kena? Parallel parking or the slope? Let's break it down", w: { T: 3, S: 0.5 } },
          { label: '{aiyo|Aiyo} 🫂 come Somerset, I {belanja} you bubble tea now', w: { F: 3, E: 1, P: 0.5 } },
          { label: 'Third time means the examiner knows your face. Next time {steady} one', w: { F: 1.5, N: 1.5 } },
          { label: 'Send me the circuit video. Sunday we practise in the carpark', w: { T: 2, J: 1, S: 0.5 } },
        ],
      },
    },
    {
      id: 'hawker',
      time: '13:00',
      station: 'Outram Park',
      art: 'hawker',
      tod: 0.5,
      title: 'Lunch at Maxwell',
      narration:
        'The {hawker} centre is roaring. On your left, the famous chicken rice stall has a 30-minute queue and a framed photo of a celebrity eating there in 2009. On your right, a brand-new stall with zero queue sells "Laksa Carbonara 🍝🌶️".',
      prompt: 'Where do you join?',
      interaction: {
        kind: 'cards',
        options: [
          { emoji: '🍗', label: 'Chicken rice queue. Proven. {shiok}.', sub: 'A 30-minute queue is a 5-star review you can see.', w: { S: 3, J: 0.5 } },
          { emoji: '🍝', label: 'Laksa Carbonara. Someone must be first.', sub: 'For science. And for content.', w: { N: 3, E: 0.5, P: 0.5 } },
          { emoji: '🥢', label: "Chicken rice, but I'll screenshot the new stall", sub: 'Next visit, maybe. If the reviews are good.', w: { S: 1.5, J: 1, T: 0.5 } },
          { emoji: '🎲', label: 'Close my eyes and point', sub: 'The hawker gods decide. They have never been wrong. (They have.)', w: { P: 2, N: 1 } },
        ],
      },
    },
    {
      id: 'rain',
      time: '15:00',
      station: 'Dhoby Ghaut',
      art: 'rain',
      tod: 0.58,
      title: 'Sudden thunderstorm!',
      narration: "Blue sky ten minutes ago. Now: a Singapore-grade downpour, sideways, with commitment. You're under a tiny bus stop shelter and your next stop is 400m away.",
      prompt: 'Quick! Decide before you get soaked.',
      interaction: {
        kind: 'timer',
        seconds: 10.5,
        options: [
          { emoji: '☂️', label: 'Pull out the umbrella I always carry', w: { J: 3, S: 0.5 } },
          { emoji: '🏃', label: "Run for it. It's an adventure!", w: { P: 3, E: 0.5, N: 0.5 } },
          { emoji: '📱', label: 'Check the weather app. Rain stops in 15 mins.', w: { T: 1.5, I: 0.5 } },
        ],
        timeout: { label: 'Froze. Still deciding. Now soaked. Like a kaya toast in teh.', w: { P: 2 } },
      },
    },
    {
      id: 'bali',
      time: '16:00',
      station: 'Bugis',
      art: 'cafe',
      tod: 0.64,
      title: 'The Bali trip',
      narration:
        'Drying off in a café, you see the gang has decided: Bali in December. Six people, zero bookings, 147 unread messages. Everyone is typing. Nobody is planning. Someone just sent a monkey GIF.',
      prompt: 'How do you handle it?',
      interaction: {
        kind: 'slider',
        weight: 3,
        left: { label: 'Make the Google Sheet: budget tab, itinerary tab, packing list', emoji: '📊', pole: 'J', also: { T: 1, S: 0.5 } },
        right: { label: 'Book the flight first. Bali will sort itself out', emoji: '🛫', pole: 'P', also: { N: 0.5, E: 0.5 } },
        ticks: ['Spreadsheet, colour-coded', 'Sheet, but simple', 'Somewhere in between', 'Flights, then vibes', 'Pack 1 bag, wing it'],
      },
    },
    {
      id: 'gardens',
      time: '18:45',
      station: 'Bayfront',
      art: 'gardens',
      tod: 0.74,
      title: 'Date night ❤️',
      narration:
        'Gardens by the Bay at golden hour. The Supertrees glow orange. Your date, Sam, arrives a little nervous, waves, then accidentally waves at a stranger too.',
      prompt: 'How do you break the ice?',
      interaction: {
        kind: 'cards',
        options: [
          { emoji: '🌳', label: '"Did you know the Supertrees collect rainwater?"', sub: 'Facts are a love language. A niche one.', w: { T: 2, S: 1, I: 0.5 } },
          { emoji: '🔮', label: '"If you could live any life in 10 years, what would it be?"', sub: 'Skip the small talk. Go straight to the soul.', w: { N: 3, F: 1 } },
          { emoji: '😊', label: '"You look great! How was your day?"', sub: 'Warm, present, easy. Pretend you did not see the stranger wave.', w: { S: 2, F: 1 } },
        ],
      },
    },
    {
      id: 'confession',
      time: '19:45',
      station: 'Raffles Place',
      art: 'laupasat',
      tod: 0.82,
      title: 'Satay Street confession',
      narration: 'At Lau Pa Sat, under the smoke of a hundred satay sticks, Sam goes quiet, then says something big.',
      prompt: 'Your reply:',
      interaction: {
        kind: 'chat',
        contact: 'Sam',
        contactEmoji: '🌻',
        incoming: ['Ok this is a bit random but…', 'I just quit my bank job to open a bakery 🥐', "My parents think I'm crazy. My mum cried. Then she ordered 20 tarts."],
        options: [
          { label: "{wah|Wah} brave! What's your runway? You got a business plan?", w: { T: 3, J: 0.5 } },
          { label: 'That\'s so cool. You light up when you say "bakery"', w: { F: 3, S: 0.5 } },
          { label: 'Crazy is how all good stories start leh. Tell me everything', w: { F: 1.5, N: 2, E: 0.5 } },
          { label: 'Where\'s the shop? Rent near Tiong Bahru very high you know', w: { T: 2, S: 1 } },
        ],
      },
    },
    {
      id: 'bill',
      time: '20:30',
      station: 'Downtown',
      art: 'laupasat',
      tod: 0.86,
      title: 'The bill arrives',
      narration: '42 satay sticks, 2 sugarcane, 1 BBQ stingray. $58.40. Sam reaches for their phone. So do you. It is a quick-draw duel at high noon, except it is 8:30pm and the weapon is {paynow}.',
      prompt: 'Slide to decide how the bill goes.',
      interaction: {
        kind: 'slider',
        weight: 3,
        left: { label: 'Split exactly via {paynow}. $29.20 each, fair is fair', emoji: '🧾', pole: 'T', also: { J: 1, S: 0.5 } },
        right: { label: '"I {belanja}! Next time you treat me ok?"', emoji: '💝', pole: 'F', also: { P: 1, E: 0.5 } },
        ticks: ['$29.20 each, to the cent', 'Split, round to $30', 'Whoever reaches first', 'I pay, you get dessert', "Don't even look at it"],
      },
    },
    {
      id: 'marina',
      time: '21:00',
      station: 'Marina Bay',
      art: 'marina',
      tod: 0.94,
      title: 'Spectra at Marina Bay',
      narration:
        'The light-and-water show starts. Lasers sweep over the bay, music swells, a tourist behind you whispers "wah" every 4 seconds. Sam leans over: "What are you thinking about?"',
      prompt: 'Be honest…',
      interaction: {
        kind: 'cards',
        options: [
          { emoji: '🌬️', label: '"How nice this breeze is, and that stingray was damn good"', sub: 'Right here, right now, slightly full.', w: { S: 3, P: 0.5 } },
          { emoji: '🚀', label: '"What this bay will look like in 50 years. Floating HDBs?"', sub: 'Already living in 2076. Rent is still high.', w: { N: 3, T: 0.5, I: 0.5 } },
          { emoji: '💭', label: '"Whether tonight means what I think it means…"', sub: 'Reading between every single laser.', w: { N: 1, F: 2, I: 0.5 } },
        ],
      },
    },
    {
      id: 'home',
      time: '22:30',
      station: 'Home',
      art: 'bus',
      tod: 1,
      title: 'Last bus home',
      narration: 'On the top deck of the bus, the city lights blur past. What a day. Your phone has 3% battery left, which is exactly enough for one bad decision.',
      prompt: 'How do you end the night?',
      interaction: {
        kind: 'cards',
        options: [
          { emoji: '📣', label: 'Voice-note the group chat: "GUYS. UPDATE."', sub: 'They need to know. Now. All 4 minutes of it.', w: { E: 3, F: 0.5, P: 0.5 } },
          { emoji: '🎧', label: 'Earphones in, replay the whole night quietly', sub: 'Window seat, city lights, full main-character montage.', w: { I: 3, N: 0.5, P: 0.5 } },
          { emoji: '📝', label: 'Text Sam "Reached home?" and plan date #2', sub: "Saturday after next, 7pm, I'll book. Calendar invite sent.", w: { E: 1, J: 1.5, F: 0.5 } },
        ],
      },
    },
  ],
}
