import type { Journey } from '../model'

/**
 * A Monday at the office, from the snooze button to the last email.
 * Weighting follows saturday.ts: one main lean per answer plus small side-signals.
 */
export const MONDAY: Journey = {
  id: 'mon',
  day: 'MON',
  title: 'Monday Grind',
  tagline: 'Rush-hour MRT, lift small talk, a surprise presentation and the 6pm escape.',
  emoji: '💼',
  line: '#009645',
  lineName: 'East-West Line',
  theme: 'sg',
  scenes: [
    {
      id: 'mon-alarm',
      time: '06:45',
      station: 'Pasir Ris',
      art: 'bedroom',
      tod: 0.02,
      title: 'Monday. Again.',
      narration:
        'Your alarm goes off. It is still a bit dark outside the {hdb|HDB} window, your brain is still on Sunday, and your body is filing a formal complaint.',
      prompt: 'What does your alarm situation look like?',
      interaction: {
        kind: 'cards',
        options: [
          { emoji: '⏰', label: 'One alarm. I wake up. I get up.', sub: 'Clothes were laid out last night. Like a superhero costume, but for spreadsheets.', w: { J: 3, S: 0.5, T: 0.5 } },
          { emoji: '😴', label: 'Alarms at 6:45, 6:50, 6:55, 7:02…', sub: 'Snooze is part of the plan. The plan is chaos.', w: { P: 2, J: 0.5, I: 0.5 } },
          { emoji: '🎲', label: 'Wake up whenever, then sprint', sub: 'Adrenaline is my coffee. Grab Food is my breakfast.', w: { P: 3, E: 0.5, N: 0.5 } },
        ],
      },
    },
    {
      id: 'mon-kopi',
      time: '07:20',
      station: 'Tampines',
      art: 'kopitiam',
      tod: 0.1,
      title: 'Kopi da bao',
      narration:
        'Downstairs, the {kopitiam} {uncle} is already hanging {kopi} in plastic bags with a string, like a very caffeinated fishing trip. "Same as usual ah?" he asks before you open your mouth.',
      prompt: 'Slide to answer the uncle.',
      interaction: {
        kind: 'slider',
        weight: 3,
        left: { label: '"Yes uncle, same as always"', emoji: '☕', pole: 'S', also: { J: 1 } },
        right: { label: '"Today I try the gula melaka special!"', emoji: '✨', pole: 'N', also: { P: 1, E: 0.5 } },
        ticks: ['Same, obviously', 'Same, less sugar', 'Hmm, let me think', 'Maybe try lah', 'Surprise me, uncle!'],
      },
    },
    {
      id: 'mon-mrt',
      time: '07:50',
      station: 'Paya Lebar',
      art: 'mrt',
      tod: 0.18,
      title: 'Rush hour on the East-West Line',
      narration:
        "The train pulls in completely packed. Someone's backpack is in your personal space, your personal space is in someone else's armpit. There is a tiny gap by the door, a slightly emptier spot near the map, and a corner where your colleague Farah is waving at you.",
      prompt: 'Drag yourself to where you squeeze in.',
      interaction: {
        kind: 'drag',
        token: 'you',
        zones: [
          { x: 3, y: 22, width: 25, height: 70, label: 'Squeeze in next to Farah and chat', w: { E: 3, F: 0.5 } },
          { x: 36, y: 4, width: 30, height: 30, label: 'Under the map, plan the fastest exit', w: { J: 1, I: 1, T: 0.5 } },
          { x: 70, y: 40, width: 27, height: 52, label: 'Quiet corner, podcast on', w: { I: 3, N: 0.5, P: 0.5 } },
        ],
      },
    },
    {
      id: 'mon-lift',
      time: '08:50',
      station: 'Bugis',
      art: 'lift',
      tod: 0.26,
      title: 'The lift lobby',
      narration:
        'The lift doors open. Inside: the big boss from the 30th floor, alone. You work on the 28th. That is 28 floors of possible small talk. The doors are closing. The boss is holding them for you. Oh no.',
      prompt: 'What do you do?',
      interaction: {
        kind: 'cards',
        options: [
          { emoji: '👋', label: '"Morning! Good weekend?"', sub: 'Small talk is a sport and I train daily.', w: { E: 3, F: 0.5 } },
          { emoji: '📱', label: 'Smile, nod, look at my phone very seriously', sub: 'Suddenly my inbox is a gripping novel.', w: { I: 2, S: 0.5, J: 0.5 } },
          { emoji: '🚪', label: '"Oh I forgot something!" Wait for the next lift', sub: 'Tactical retreat. I forgot nothing. I fear everything.', w: { I: 3, P: 0.5, N: 0.5 } },
        ],
      },
    },
    {
      id: 'mon-standup',
      time: '09:30',
      station: 'City Hall',
      art: 'office',
      tod: 0.32,
      title: 'Monday stand-up',
      narration:
        'Your manager pings the team chat. The project is late because Ah Boon was on MC all last week. Everyone is waiting for someone else to reply. Three people are "typing…". Nobody sends anything.',
      prompt: 'Reply in the team chat:',
      interaction: {
        kind: 'chat',
        contact: 'Team Alpha 🚀',
        contactEmoji: '🚀',
        incoming: ['Manager: Why is the dashboard project 1 week behind?', 'Manager: Need an explanation by 10am 🙏', 'Manager: Please don\'t all reply at once', '(nobody replies)'],
        options: [
          { label: 'Timeline: 5 days lost to MC, 2 days to scope change. New ETA is Fri.', w: { T: 3, S: 0.5 } },
          { label: 'Ah Boon was sick, can we give him some slack? I can help him catch up', w: { F: 3, E: 0.5 } },
          { label: 'Let me call you after stand-up and explain properly', w: { F: 1, I: 1 } },
          { label: "Sharing the root causes and a fix so this doesn't happen again", w: { T: 2, N: 1 } },
        ],
      },
    },
    {
      id: 'mon-brainstorm',
      time: '11:00',
      station: 'Raffles Place',
      art: 'meeting',
      tod: 0.4,
      title: 'Brainstorm meeting',
      narration:
        'Meeting room 3B. The whiteboard says: "How do we get more young people to use our app?" Nobody in the room is under 30. Everyone looks at you, because you once used TikTok.',
      prompt: 'What idea do you pitch?',
      interaction: {
        kind: 'cards',
        options: [
          { emoji: '📈', label: 'Fix the 3 biggest complaints in our app reviews', sub: 'Start with what we know. Mostly "app keeps crashing lah".', w: { S: 3, T: 1 } },
          { emoji: '🚀', label: 'A whole new concept: the app becomes a game', sub: 'What if we rethink everything? Including the logo? Including the company?', w: { N: 3, E: 0.5, P: 0.5 } },
          { emoji: '🧪', label: 'Copy what worked for competitors, then test it', sub: 'Proven, but measured. Steal like an artist.', w: { S: 2, T: 1, J: 0.5 } },
          { emoji: '🔮', label: 'Ask: what will young people want in 5 years?', sub: 'Skate to where the puck is going. The puck is probably on Telegram.', w: { N: 2, J: 1, I: 0.5 } },
        ],
      },
    },
    {
      id: 'mon-lunch',
      time: '12:30',
      station: 'Tanjong Pagar',
      art: 'hawker',
      tod: 0.5,
      title: 'Lunch hour',
      narration:
        'Lunch at the {hawker} centre near the office. The team is grabbing a big table together. Your desk has a quiet corner, your earphones, and the next episode of a K-drama that ended on a cliffhanger.',
      prompt: 'Where do you {makan}?',
      interaction: {
        kind: 'cards',
        options: [
          { emoji: '🍜', label: "Big team lunch, I'll {chope} the table", sub: 'Lunch is for gossip. The gossip is for lunch.', w: { E: 3, J: 1 } },
          { emoji: '🎧', label: 'Da bao back, eat at my desk with a YouTube video', sub: 'My one hour of peace. Do not perceive me.', w: { I: 3, P: 0.5 } },
          { emoji: '👯', label: 'Lunch with just my one work bestie', sub: 'Small group, deep talk, mild complaining.', w: { I: 1.5, F: 1, S: 0.5 } },
        ],
      },
    },
    {
      id: 'mon-feedback',
      time: '14:00',
      station: 'Outram Park',
      art: 'office',
      tod: 0.56,
      title: "The intern's slides",
      narration:
        'Mei, the intern, sends you her first client slides to check. There are 14 typos, the numbers on slide 6 are wrong, and the font is Comic Sans. She is clearly nervous.',
      prompt: 'Reply to Mei:',
      interaction: {
        kind: 'chat',
        contact: 'Mei (intern) 🌱',
        contactEmoji: '🌱',
        incoming: ['Hi!! I finished the slides 😅', 'Can you check before I send to client?', 'Very {paiseh} if got mistakes', '(I used a fun font!!)'],
        options: [
          { label: 'Slide 6 numbers are wrong, and there are 14 typos. List attached, fix before 4pm.', w: { T: 3, S: 0.5 } },
          { label: "Good first try! 😊 Let's go through it together, a few things to fix", w: { F: 3, E: 0.5 } },
          { label: "Structure is solid. Fix slide 6 and the typos, then you're good to go", w: { T: 1, F: 1, S: 0.5 } },
          { label: "I'll just fix it myself quickly, don't worry", w: { F: 1.5, I: 1, P: 0.5 } },
        ],
      },
    },
    {
      id: 'mon-urgent',
      time: '15:30',
      station: 'HarbourFront',
      art: 'pantry',
      tod: 0.62,
      title: 'Pantry ambush',
      narration:
        'You are making a 3-in-1 coffee in the pantry, emotionally. Your boss pops in: "Eh, the client is calling in 5 minutes. Can you present the update?" The kettle clicks off like a countdown.',
      prompt: 'Quick! The client is dialling in.',
      interaction: {
        kind: 'timer',
        seconds: 10.5,
        options: [
          { emoji: '📂', label: 'Open the deck I prepared last week, just in case', w: { J: 3, S: 0.5 } },
          { emoji: '🎤', label: "Wing it. I know the project, I'll improvise", w: { P: 3, E: 1 } },
          { emoji: '🙋', label: '"Can we push 15 minutes so I can prepare?"', w: { J: 1, T: 1, I: 0.5 } },
        ],
        timeout: { label: 'Stood there stirring the coffee. Now presenting with a spoon in hand.', w: { P: 2 } },
      },
    },
    {
      id: 'mon-deadline',
      time: '17:45',
      station: 'Kallang',
      art: 'office',
      tod: 0.72,
      title: 'Almost 6pm',
      narration:
        'Your task list still has 3 items. Nothing is urgent. The office is emptying out, and someone is already doing the "Bye bye, see you tomorrow!" walk of freedom.',
      prompt: 'Slide to decide when you leave.',
      interaction: {
        kind: 'slider',
        weight: 3,
        left: { label: 'Finish everything and plan tomorrow first', emoji: '✅', pole: 'J', also: { T: 0.5, S: 0.5 } },
        right: { label: 'Tomorrow is a problem for tomorrow me', emoji: '🏃', pole: 'P', also: { F: 0.5, N: 0.5 } },
        ticks: ['Inbox zero or no go home', 'Finish 2, plan the 3rd', 'Finish 1, then go', 'Log off at 6 sharp', 'Already at the MRT'],
      },
    },
    {
      id: 'mon-drinks',
      time: '18:30',
      station: 'Clarke Quay',
      art: 'orchard',
      tod: 0.8,
      title: 'After-work invite',
      narration: 'As you walk out of the office, your phone buzzes. The office group chat has plans, and they involve the words "1-for-1".',
      prompt: 'Reply to the office gang:',
      interaction: {
        kind: 'chat',
        contact: 'Office Kakis 🍻',
        contactEmoji: '🍻',
        incoming: ['Jason: Clarke Quay happy hour! 1-for-1 until 8pm', 'Farah: whole team going!!', 'Jason: @name come lah, your "maybe" streak is 6 weeks long'],
        options: [
          { label: "Say no more, I'm coming! 🍻", w: { E: 3, P: 1 } },
          { label: 'Monday leh… I go home and rest 😴', w: { I: 3, S: 0.5 } },
          { label: 'One drink, then I go home ok. Actually one.', w: { E: 1, J: 1.5 } },
          { label: 'Can I bring my friend from the other team?', w: { E: 2, F: 1 } },
        ],
      },
    },
    {
      id: 'mon-night',
      time: '22:00',
      station: 'Home',
      art: 'bedroom',
      tod: 1,
      title: 'Before bed',
      narration: 'Finally home and in bed. Your phone is in your hand, your eyes are closing, and your mind has decided now is the perfect time to think.',
      prompt: 'What are you thinking about?',
      interaction: {
        kind: 'cards',
        options: [
          { emoji: '📅', label: "Tomorrow's meetings, and what to wear", sub: 'Practical. Prepared. Asleep by 11.', w: { S: 3, T: 0.5 } },
          { emoji: '💡', label: 'A side-hustle idea that could change everything', sub: 'Notes app: 47 ideas and counting. Zero started.', w: { N: 3, P: 1 } },
          { emoji: '💭', label: 'Whether Mei was okay after my feedback', sub: 'Replaying the day like a director\'s cut.', w: { F: 2, N: 1, I: 0.5 } },
        ],
      },
    },
  ],
}
