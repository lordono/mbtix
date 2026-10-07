import type { Journey } from '../model'

/**
 * Last day of a Tokyo holiday. You left Singapore, but Singapore did not leave you.
 * Weighting follows saturday.ts: one main lean per answer plus small side-signals.
 */
export const SUNDAY: Journey = {
  id: 'sun',
  day: 'SUN',
  title: 'Tokyo, Lah',
  tagline: 'Last day overseas with very Singaporean habits, then the flight home to Changi.',
  emoji: '✈️',
  line: '#80c241',
  lineName: 'Yamanote Line',
  theme: 'tokyo',
  scenes: [
    {
      id: 'sun-hotel',
      time: '07:00',
      station: 'Shinjuku',
      art: 'hotel',
      tod: 0.06,
      title: 'Last day in Tokyo',
      narration:
        'You wake up in a hotel room so small you can open the fridge, the door and the window without getting out of bed. Through the window: Tokyo, and Mt Fuji on a clear day. Flight home is at 9pm.',
      prompt: "What does today's plan look like?",
      interaction: {
        kind: 'cards',
        options: [
          { emoji: '📊', label: 'Excel itinerary, every train time included', sub: 'Colour-coded. Shared with everyone. Twice. With a legend.', w: { J: 3, T: 0.5, S: 0.5 } },
          { emoji: '📌', label: 'Three must-dos, the rest we explore', sub: 'Structure with breathing room.', w: { J: 1, P: 1, N: 0.5 } },
          { emoji: '🗺️', label: 'Pick a random station and get off', sub: 'The best trips are unplanned. The worst ones too.', w: { P: 3, N: 1 } },
        ],
      },
    },
    {
      id: 'sun-konbini',
      time: '07:45',
      station: 'Shin-Okubo',
      art: 'konbini',
      tod: 0.12,
      title: 'Konbini breakfast',
      narration:
        'The convenience store is a wonderland of 400 types of onigiri. But in your bag is a packet of Milo 3-in-1 and two jars of {kaya} you brought "just in case Japan doesn\'t have breakfast".',
      prompt: 'Slide to choose breakfast.',
      interaction: {
        kind: 'slider',
        weight: 3,
        left: { label: 'Milo and kaya from home. Taste of Singapore', emoji: '🥫', pole: 'S', also: { J: 1, I: 0.5 } },
        right: { label: 'The weirdest thing on the shelf. Wasabi KitKat?', emoji: '🍙', pole: 'N', also: { P: 1, E: 0.5 } },
        ticks: ['Milo from home, of course', 'Onigiri I had yesterday', 'Popular onigiri', 'Something new-ish', 'Mystery flavour, YOLO'],
      },
    },
    {
      id: 'sun-mum',
      time: '08:30',
      station: 'Takadanobaba',
      art: 'hotel',
      tod: 0.18,
      title: 'Message from Mum',
      narration: 'Your phone buzzes. Singapore is one hour behind, but Mum has been awake since 6, and so has her shopping list.',
      prompt: 'Reply to Mum:',
      interaction: {
        kind: 'chat',
        contact: 'Mum ❤️',
        contactEmoji: '👩',
        incoming: ['Eat already or not?', 'Remember buy Tokyo Banana for Auntie Lily, Uncle Tan, Ah Ma, the neighbours, the neighbours\' neighbours…', '12 boxes ok? 😊', 'Also wear jacket. It\'s cold. I checked.'],
        options: [
          { label: "Ok Mum! I'll get everyone something nice 🥰", w: { F: 3, E: 0.5 } },
          { label: 'Luggage limit 23kg, 12 boxes = 4kg. Can do 6 max', w: { T: 3, J: 1 } },
          { label: 'I buy for Ah Ma first, the rest I see how', w: { F: 1, P: 1.5 } },
          { label: 'Can buy at Changi duty free also, same thing', w: { T: 2, S: 1 } },
        ],
      },
    },
    {
      id: 'sun-train',
      time: '09:30',
      station: 'Shibuya',
      art: 'mrt',
      tod: 0.24,
      title: 'The silent train',
      narration:
        'The Tokyo train is so silent you can hear someone blink. Then, from the other end of the carriage: "Wah, so cold sia." Fellow Singaporeans, spotted in the wild.',
      prompt: "Drag yourself to where you'd go.",
      interaction: {
        kind: 'drag',
        token: 'you',
        zones: [
          { x: 3, y: 22, width: 25, height: 70, label: 'Go say "Eh, Singaporean ah?"', w: { E: 3, F: 0.5, P: 0.5 } },
          { x: 36, y: 4, width: 30, height: 30, label: 'Study the map, count the stops', w: { J: 1.5, I: 1, S: 0.5 } },
          { x: 70, y: 40, width: 27, height: 52, label: 'Stay quiet, smile secretly', w: { I: 3, N: 0.5 } },
        ],
      },
    },
    {
      id: 'sun-crossing',
      time: '10:30',
      station: 'Shibuya',
      art: 'crossing',
      tod: 0.32,
      title: 'Shibuya Crossing',
      narration:
        'The lights turn green and a thousand people cross at once, from every direction. Somehow, no one bumps into anyone. In Singapore this would already be 3 forum letters.',
      prompt: 'What goes through your head?',
      interaction: {
        kind: 'cards',
        options: [
          { emoji: '📸', label: 'Get the classic shot from the Starbucks window', sub: "Everyone takes it because it's good. Also for the 'gram.", w: { S: 3, E: 0.5, J: 0.5 } },
          { emoji: '🌀', label: 'Imagine a thousand life stories crossing at once', sub: 'Main character energy. Background music in my head.', w: { N: 3, F: 0.5, I: 0.5 } },
          { emoji: '🧭', label: 'Cross it, then find the quiet backstreets', sub: 'The real Tokyo is one lane over.', w: { N: 1, P: 1.5, I: 0.5 } },
        ],
      },
    },
    {
      id: 'sun-ramen',
      time: '12:00',
      station: 'Harajuku',
      art: 'ramen',
      tod: 0.46,
      title: "Ramen o'clock",
      narration:
        'Two ramen shops side by side. One has solo booths with curtains, so you never see another human, not even the one who serves you. The other is a tiny, noisy counter where the chef chats with everyone and calls you "Singapore-san".',
      prompt: 'Where do you slurp?',
      interaction: {
        kind: 'cards',
        options: [
          { emoji: '🎎', label: 'Solo booth, curtain down, pure focus', sub: 'Me and the broth. A very committed relationship.', w: { I: 3, S: 0.5 } },
          { emoji: '🍥', label: 'The noisy counter, make friends with the chef', sub: "I'll leave with his Instagram and a free egg.", w: { E: 3, F: 0.5, P: 0.5, N: 0.5 } },
          { emoji: '🧾', label: 'Whichever has the longer queue', sub: 'Singaporean instinct. Queue means good. Long queue means very good.', w: { S: 1, E: 1, J: 0.5 } },
        ],
      },
    },
    {
      id: 'sun-lost',
      time: '13:30',
      station: 'Asakusa',
      art: 'crossing',
      tod: 0.52,
      title: 'Phone at 2%',
      narration:
        'You are deep in the backstreets. Google Maps is loading… and your phone dies. Your hotel is somewhere "near a big train station", which in Tokyo narrows it down to 900 options.',
      prompt: 'Think fast before panic sets in!',
      interaction: {
        kind: 'timer',
        seconds: 10.5,
        options: [
          { emoji: '🔋', label: 'Pull out the powerbank I always carry', w: { J: 3, S: 0.5 } },
          { emoji: '🚶', label: "Just walk, I'll find something interesting", w: { P: 3, N: 1 } },
          { emoji: '🙏', label: 'Ask a stranger with my 3 words of Japanese', w: { E: 2, P: 1 } },
        ],
        timeout: { label: 'Stood in the lane refreshing a dead phone. It did not come back to life.', w: { P: 2 } },
      },
    },
    {
      id: 'sun-souvenir',
      time: '15:00',
      station: 'Akihabara',
      art: 'konbini',
      tod: 0.6,
      title: 'A gift for your best friend',
      narration:
        'A mega discount store: 5 floors of everything, a jingle that will live in your head forever. You still need a gift for your best friend Priya, who is feeding your cat while you are away. The cat has sent no updates.',
      prompt: 'Slide to pick the gift.',
      interaction: {
        kind: 'slider',
        weight: 3,
        left: { label: 'Something useful: the Japanese face mask she mentioned', emoji: '🧴', pole: 'T', also: { S: 1, J: 0.5 } },
        right: { label: 'Something meaningful: a charm for luck, with a handwritten note', emoji: '🧧', pole: 'F', also: { N: 1 } },
        ticks: ['Exactly what she asked for', 'Useful, nicely wrapped', 'Bit of both', 'Cute and thoughtful', 'Handwritten letter, 3 pages'],
      },
    },
    {
      id: 'sun-shrine',
      time: '16:30',
      station: 'Ueno',
      art: 'shrine',
      tod: 0.68,
      title: 'Fortune at the shrine',
      narration: 'At a small shrine under the trees, you shake the box and draw an omikuji fortune. It says: 凶. Bad luck. A crow lands nearby and stares at you. Rude.',
      prompt: 'Your reaction?',
      interaction: {
        kind: 'cards',
        options: [
          { emoji: '🪢', label: 'Tie it on the rack like the sign says, move on', sub: 'Follow the instructions. Leave the bad luck in Japan.', w: { S: 3, J: 1 } },
          { emoji: '🔮', label: 'Wonder what it means for the year ahead', sub: 'Is the universe trying to tell me something? Is the crow?', w: { N: 3, F: 0.5, I: 0.5 } },
          { emoji: '😂', label: 'Draw again until I get good luck', sub: 'Best of three, lah. Best of five if needed.', w: { P: 2, T: 1, E: 0.5 } },
        ],
      },
    },
    {
      id: 'sun-checkin',
      time: '18:30',
      station: 'Haneda',
      art: 'airport',
      tod: 0.8,
      title: 'Check-in counter',
      narration:
        'At the airport check-in, the scale says 25.4kg. The limit is 23kg. Exactly 2.4kg of Tokyo Banana. The queue behind you sighs politely, in Japanese.',
      prompt: 'What happens next?',
      interaction: {
        kind: 'cards',
        options: [
          { emoji: '⚖️', label: 'Impossible. I weighed it at the hotel. It was 22.8', sub: 'Show them the photo of the luggage scale, with timestamp.', w: { J: 3, T: 0.5 } },
          { emoji: '🧥', label: 'Open the luggage on the floor, wear 3 jackets', sub: 'Airport fashion, Tokyo edition. Sweating, but victorious.', w: { P: 3, E: 0.5, N: 0.5 } },
          { emoji: '💳', label: 'Just pay the excess, no stress', sub: 'Time is money. My money, sadly.', w: { T: 2, S: 0.5, J: 0.5 } },
        ],
      },
    },
    {
      id: 'sun-plane',
      time: '21:00',
      station: 'In the air',
      art: 'plane',
      tod: 0.92,
      title: 'Seat 34B',
      narration:
        'Seven hours to Singapore. Your seatmate, a friendly auntie from Tampines, has already offered you a sweet, asked where you work, and whether you are married. We are still taxiing.',
      prompt: 'How does the flight go?',
      interaction: {
        kind: 'cards',
        options: [
          { emoji: '🗣️', label: "Talk the whole way. Now we're Facebook friends", sub: "She invited me to her son's wedding. I'm going.", w: { E: 3, F: 1 } },
          { emoji: '😴', label: 'Polite chat, then eye mask on, movie on', sub: 'Social battery: 0%. Phone battery: also 0%.', w: { I: 3, P: 0.5 } },
          { emoji: '📝', label: 'Chat a bit, then sort trip photos into albums', sub: 'Organised memories. 1,204 photos, 12 albums.', w: { I: 1, J: 1.5, S: 0.5 } },
        ],
      },
    },
    {
      id: 'sun-changi',
      time: '03:00',
      station: 'Changi Airport',
      art: 'airport',
      tod: 1,
      title: 'Welcome home',
      narration: 'Changi Airport at 3am. The Jewel waterfall is glowing, the air smells like haze, and it is 28 degrees again. Your jackets are now a problem.',
      prompt: 'First thing you do?',
      interaction: {
        kind: 'cards',
        options: [
          { emoji: '📲', label: 'Text everyone "Landed! Miss you all"', sub: 'Then send 200 photos to the family chat. At 3am.', w: { F: 3, E: 1, N: 0.5 } },
          { emoji: '🚕', label: 'Straight to the taxi queue. Fastest way home', sub: 'Efficiency, even at 3am. Especially at 3am.', w: { T: 3, J: 0.5, I: 0.5 } },
          { emoji: '🍜', label: 'Go eat laksa at the airport food court first', sub: 'Priorities. Japan was nice but where is my chilli.', w: { S: 1.5, F: 1, P: 0.5 } },
        ],
      },
    },
  ],
}
