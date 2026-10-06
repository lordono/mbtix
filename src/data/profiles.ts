export interface Match {
  type: string
  why: string
}

export interface Profile {
  persona: string
  emoji: string
  tagline: string
  blurb: string
  habitat: string
  order: string
  strengths: string[]
  career: [Match, Match]
  partner: [Match, Match]
}

export const PROFILES: Record<string, Profile> = {
  INTJ: {
    persona: 'The MRT Line Planner',
    emoji: '🗺️',
    tagline: 'Already drafted the Cross Island Line in your head. Twice.',
    blurb:
      'You see systems where others see chaos. While everyone argues about where to eat, you have quietly optimised the route, the queue time and the backup stall. You value competence over small talk and would rather build something lasting than chase what\'s trending.',
    habitat: 'A quiet library carrel at the National Library, level 10',
    order: 'Same yong tau foo, same 7 items, every time. Efficient.',
    strengths: ['Long-range strategy', 'Independent thinking', 'Raises the bar for everyone'],
    career: [
      { type: 'ENTJ', why: 'You design the master plan, they rally the people. Unstoppable in a boardroom.' },
      { type: 'ISTJ', why: 'They turn your blueprint into a reliable, on-schedule reality, no shortcuts.' },
    ],
    partner: [
      { type: 'ENFP', why: 'Their warmth softens your edges and they find your depth fascinating, not intimidating.' },
      { type: 'ENTP', why: 'Endless debates over supper that somehow count as flirting.' },
    ],
  },
  INTP: {
    persona: 'The Void Deck Philosopher',
    emoji: '🧠',
    tagline: 'Wondering why the void deck is called a void deck. Since 2009.',
    blurb:
      'Curious to the core, you take ideas apart just to see how they tick. You notice the logic gap in every argument, including your own. Deadlines are… theoretical. But when you lock onto a problem, nobody out-thinks you.',
    habitat: 'Sim Lim Square, "just browsing" for 3 hours',
    order: 'Whatever has the most interesting name on the menu',
    strengths: ['Original ideas', 'Sharp analysis', 'Calm under pressure'],
    career: [
      { type: 'ENTJ', why: 'They ship your brilliant prototypes before you get distracted by the next one.' },
      { type: 'INTJ', why: 'Two deep thinkers, one whiteboard, zero meetings. Bliss.' },
    ],
    partner: [
      { type: 'ENTJ', why: 'They bring direction; you bring the "but have you considered…". Great balance.' },
      { type: 'ESTJ', why: 'They keep life running so your mind can wander. You keep them curious.' },
    ],
  },
  ENTJ: {
    persona: 'The CBD Boss',
    emoji: '💼',
    tagline: 'Booked the BBQ pit, the venue and your next promotion.',
    blurb:
      'Natural-born leader with a five-year plan and a spreadsheet to back it up. You see what needs to happen and you make it happen, fast. People follow you because you\'re decisive. Just remember: not every lunch is a negotiation.',
    habitat: 'Raffles Place rooftop bar, talking about Q3',
    order: 'Pre-ordered on the app. Picked up. Zero queue.',
    strengths: ['Decisive leadership', 'Big-picture execution', 'Turns chaos into KPIs'],
    career: [
      { type: 'INTJ', why: 'Their quiet strategy plus your drive makes plans that actually get built.' },
      { type: 'ISTJ', why: 'Detail-proof execution. They catch what you sprint past.' },
    ],
    partner: [
      { type: 'INTP', why: 'They challenge your thinking without competing for the steering wheel.' },
      { type: 'INFP', why: 'They remind you why you\'re hustling, and you help their dreams get real.' },
    ],
  },
  ENTP: {
    persona: 'The Kopitiam Debater',
    emoji: '🗯️',
    tagline: 'Will argue chicken rice vs. nasi lemak for sport. Switches sides halfway.',
    blurb:
      'Quick, witty and endlessly curious, you love poking at ideas to see if they hold up. You thrive on novelty and possibility, and you can talk your way into (and out of) anything. Routine bores you, but brainstorms make you come alive.',
    habitat: 'A 24-hour prata shop at 2am, solving world problems',
    order: 'Prata with every topping at once. Including cheese AND banana.',
    strengths: ['Inventive thinking', 'Charisma', 'Sees five angles at once'],
    career: [
      { type: 'INTJ', why: 'You generate the wild ideas; they pick the one that will actually win.' },
      { type: 'ESTJ', why: 'They ground your concepts in timelines and budgets. Annoying, but it works.' },
    ],
    partner: [
      { type: 'INFJ', why: 'They match your depth and see through your jokes to the real you.' },
      { type: 'INTJ', why: 'A sparring partner who never gets bored of your theories.' },
    ],
  },
  INFJ: {
    persona: 'The Botanic Gardens Sage',
    emoji: '🌿',
    tagline: 'Can read the room from across the Swan Lake.',
    blurb:
      'Quietly intense and deeply intuitive, you understand people sometimes better than they understand themselves. You want your life to mean something. Friends come to you for advice, and you give it gently, with uncanny accuracy.',
    habitat: 'A bench at the Botanic Gardens, journaling under a tembusu tree',
    order: 'Herbal soup and a warm barley. Nourishing, intentional.',
    strengths: ['Insight into people', 'Principled', 'Turns vision into purpose'],
    career: [
      { type: 'ENTJ', why: 'They scale your mission; you keep it human.' },
      { type: 'INTJ', why: 'Shared long-term vision, minimal small talk, maximum progress.' },
    ],
    partner: [
      { type: 'ENFP', why: 'Their sunshine draws you out; your depth gives them an anchor.' },
      { type: 'ENTP', why: 'They keep you laughing and thinking. You keep them honest.' },
    ],
  },
  INFP: {
    persona: 'The Haji Lane Dreamer',
    emoji: '🎨',
    tagline: 'Has a half-written novel, a playlist for every MRT line and big feelings about both.',
    blurb:
      'Idealistic, creative and soft-hearted, you live by your values and see beauty in small things: shophouse colours, a kind stranger, the smell of rain on hot tarmac. You may seem quiet, but your inner world is a whole universe.',
    habitat: 'Indie bookstore on Haji Lane, rain outside',
    order: 'Whatever the uncle recommends, because he looked happy talking about it',
    strengths: ['Empathy', 'Creativity', 'Authenticity'],
    career: [
      { type: 'ENFJ', why: 'They champion your ideas in rooms you\'d rather not be in.' },
      { type: 'ISTJ', why: 'Structure for your creativity, and somehow they really respect your craft.' },
    ],
    partner: [
      { type: 'ENFJ', why: 'Warm, encouraging and fluent in your emotional language.' },
      { type: 'ENTJ', why: 'They help your dreams get a launch date. You help them slow down.' },
    ],
  },
  ENFJ: {
    persona: 'The Kampung Spirit Captain',
    emoji: '🤝',
    tagline: 'Organised the block party, the welfare drive and your friend\'s surprise birthday. Same week.',
    blurb:
      'Charismatic and caring, you bring people together and bring out the best in them. You remember everyone\'s birthday and their auntie\'s surgery date. You lead with heart, but don\'t forget to look after yourself too.',
    habitat: 'Community Club event committee, holding a clipboard and a megaphone',
    order: 'Orders for the whole table so nobody has to queue',
    strengths: ['Inspiring others', 'Emotional intelligence', 'Building community'],
    career: [
      { type: 'INTJ', why: 'Their strategy plus your people skills makes initiatives everyone buys into.' },
      { type: 'ESTJ', why: 'Structure meets heart. Events run on time AND everyone feels included.' },
    ],
    partner: [
      { type: 'INFP', why: 'You help them shine; they show you the quiet depths you sometimes skip.' },
      { type: 'ISFP', why: 'Gentle, present and creative. They help you just be, not do.' },
    ],
  },
  ENFP: {
    persona: 'The Pasar Malam Spark',
    emoji: '🎆',
    tagline: 'Walked in for one ramly burger, left with 4 new friends and a business idea.',
    blurb:
      'Enthusiastic, imaginative and wildly warm, you see possibility everywhere and in everyone. You make strangers feel like old friends. Your energy is contagious; follow-through can be… a work in progress.',
    habitat: 'Pasar malam on a Friday night, trying everything',
    order: 'One of everything. Sharing is caring.',
    strengths: ['Contagious enthusiasm', 'Creative connections', 'Sees potential in people'],
    career: [
      { type: 'ESTJ', why: 'They turn your sparks into roadmaps. You make their projects fun.' },
      { type: 'INTJ', why: 'Your ideas plus their rigour equals something genuinely new.' },
    ],
    partner: [
      { type: 'INFJ', why: 'They understand your depth beneath the sparkle. A rare, deep connection.' },
      { type: 'INTJ', why: 'Opposites in energy, aligned in vision. They ground you; you light them up.' },
    ],
  },
  ISTJ: {
    persona: 'The Chope Guardian',
    emoji: '🧻',
    tagline: 'Respects the tissue packet. Always. Without exception.',
    blurb:
      'Reliable, thorough and principled, you are the backbone of every team, family and group project. When you say you\'ll do it, it\'s done, on time and correctly. You trust what\'s proven and you\'re proud of it.',
    habitat: 'Exactly where you said you\'d be, 5 minutes early',
    order: 'Chicken rice, same stall, since 2011',
    strengths: ['Dependability', 'Attention to detail', 'Calm, steady judgement'],
    career: [
      { type: 'ENTJ', why: 'They set the direction, you make sure it actually holds up.' },
      { type: 'ESTJ', why: 'Two rule-respecters running a tight ship. Nothing gets missed.' },
    ],
    partner: [
      { type: 'ESFP', why: 'They pull you out of routine; you give them a steady home base.' },
      { type: 'ESTP', why: 'Spontaneous adventures with someone who appreciates your reliability.' },
    ],
  },
  ISFJ: {
    persona: 'The Tingkat Keeper',
    emoji: '🍱',
    tagline: 'Packed extra food "just in case". Someone always needs it.',
    blurb:
      'Warm, loyal and quietly attentive, you notice who\'s hungry, who\'s tired, who needs a hand, before they ask. You keep traditions alive and keep people cared for. Remember: you deserve the same care you give.',
    habitat: 'Grandma\'s kitchen on Sunday, helping with the dumplings',
    order: 'Fish soup, less salt, and you remembered your friend likes extra lime',
    strengths: ['Thoughtfulness', 'Loyalty', 'Practical kindness'],
    career: [
      { type: 'ESTJ', why: 'They organise the systems; you make sure people are taken care of within them.' },
      { type: 'ENFJ', why: 'Shared values, complementary energy. Great at people-first work.' },
    ],
    partner: [
      { type: 'ESFP', why: 'They bring fun and spontaneity; you bring warmth and stability.' },
      { type: 'ESTP', why: 'They make life exciting; you make it feel like home.' },
    ],
  },
  ESTJ: {
    persona: 'The Town Council Chairman',
    emoji: '📋',
    tagline: 'Has opinions about the lift upgrading schedule. Correct ones.',
    blurb:
      'Organised, direct and dependable, you make things run. You believe in clear rules, hard work and doing things properly. Groups naturally hand you the clipboard. And honestly? Things go better when they do.',
    habitat: 'Residents\' Committee meeting, agenda printed and stapled',
    order: 'Kopi O, kaya toast, eggs. Done in 12 minutes.',
    strengths: ['Organisation', 'Accountability', 'Gets things done'],
    career: [
      { type: 'ISTJ', why: 'Equally committed to quality. You lead, they guarantee the details.' },
      { type: 'ENTP', why: 'They spot opportunities you\'d miss; you make sure they get delivered.' },
    ],
    partner: [
      { type: 'ISTP', why: 'Calm, capable and low-drama. You\'ll respect each other\'s competence.' },
      { type: 'INTP', why: 'They bring curiosity into your structured world, and you help them land ideas.' },
    ],
  },
  ESFJ: {
    persona: 'The CC Event Organiser',
    emoji: '🎉',
    tagline: 'Has a WhatsApp group for every occasion. Including one for organising WhatsApp groups.',
    blurb:
      'Sociable, caring and organised, you make sure everyone feels welcome and nobody is left out. You remember the details that matter to people. You keep traditions alive and gatherings flowing.',
    habitat: 'The kitchen at a gathering, making sure everyone has a plate',
    order: 'Zi char for 10, family style. You already know who doesn\'t eat beef.',
    strengths: ['Hospitality', 'Reliability', 'Harmony-building'],
    career: [
      { type: 'ESTJ', why: 'Structure plus warmth: you\'ll run the best-organised, happiest team.' },
      { type: 'ISFJ', why: 'Quietly dependable allies who share your care for people.' },
    ],
    partner: [
      { type: 'ISFP', why: 'They bring gentle creativity; you bring a warm, organised world for it to thrive.' },
      { type: 'ISTP', why: 'They keep things cool and practical; you keep them connected.' },
    ],
  },
  ISTP: {
    persona: 'The Sim Lim Tinkerer',
    emoji: '🔧',
    tagline: 'Fixed the aircon, the bicycle and the office printer. Didn\'t mention it.',
    blurb:
      'Cool-headed and hands-on, you learn by doing and figure out how things work by taking them apart. You\'re unflappable in a crisis and allergic to unnecessary meetings. Freedom and competence are your love languages.',
    habitat: 'Garage, workshop or anywhere with a toolbox',
    order: 'Whatever\'s fast. Eats while fixing something.',
    strengths: ['Practical problem-solving', 'Composure', 'Adaptability'],
    career: [
      { type: 'ESTP', why: 'Action-oriented duo. Fast, hands-on and fearless.' },
      { type: 'INTJ', why: 'They plan the system, you make it physically work.' },
    ],
    partner: [
      { type: 'ESFJ', why: 'They bring warmth and connection; you bring calm and capability.' },
      { type: 'ESTJ', why: 'Mutual respect for getting things done, with very little drama.' },
    ],
  },
  ISFP: {
    persona: 'The Hawker Artisan',
    emoji: '🎨',
    tagline: 'Plated your economy rice like it\'s a gallery piece.',
    blurb:
      'Gentle, observant and quietly artistic, you live in the present and notice beauty others walk past. You express yourself through what you make and do, not grand speeches. Kind and easygoing, but firm about what matters to you.',
    habitat: 'Pottery class in Tiong Bahru, or a sketchbook at the beach',
    order: 'Something seasonal from the young hawkerpreneur stall',
    strengths: ['Aesthetic sense', 'Compassion', 'Living in the moment'],
    career: [
      { type: 'ESFJ', why: 'They create the stage and the audience for your craft.' },
      { type: 'ENFP', why: 'Creative energy meets artistic execution. Very fun to work with.' },
    ],
    partner: [
      { type: 'ENFJ', why: 'They champion you; you show them how to slow down and savour.' },
      { type: 'ESFJ', why: 'Warm, attentive and steady. They make your world feel safe.' },
    ],
  },
  ESTP: {
    persona: 'The Sentosa Daredevil',
    emoji: '🏄',
    tagline: 'First one off the Mega Zip. Already booking the second round.',
    blurb:
      'Bold, energetic and street-smart, you live for action and read people instantly. You solve problems in real time and make every outing an adventure. Long lectures? No thanks. Let\'s just go.',
    habitat: 'Sentosa beach club, or wakeboarding at Bishan',
    order: 'Spiciest thing on the menu. Dares accepted.',
    strengths: ['Quick thinking', 'Charm', 'Thrives under pressure'],
    career: [
      { type: 'ISTP', why: 'Practical, fast, unfussy. You close the deal, they build the thing.' },
      { type: 'ENTJ', why: 'They aim the rocket, you fly it.' },
    ],
    partner: [
      { type: 'ISFJ', why: 'Their warmth and care make your adventures feel like coming home.' },
      { type: 'ISTJ', why: 'They anchor your energy; you shake up their routine in the best way.' },
    ],
  },
  ESFP: {
    persona: 'The Clarke Quay Star',
    emoji: '🎤',
    tagline: 'Turned a quiet Tuesday into karaoke night. Everyone came.',
    blurb:
      'Fun-loving, generous and fully alive in the moment, you light up every room (and every karaoke booth). You make people feel seen and included. Life is for living, and you\'re very, very good at it.',
    habitat: 'Karaoke booth, mic in hand, tambourine in the other',
    order: 'Whatever looks best on camera, then shares it with everyone',
    strengths: ['Joyful energy', 'Generosity', 'Reads the vibe instantly'],
    career: [
      { type: 'ESTJ', why: 'They handle the logistics; you handle the crowd. Great events team.' },
      { type: 'ENFP', why: 'Double the energy, endless ideas, the best launch parties.' },
    ],
    partner: [
      { type: 'ISFJ', why: 'Gentle, loyal and quietly devoted. They\'re your safe harbour.' },
      { type: 'ISTJ', why: 'They bring the stability that lets you shine even brighter.' },
    ],
  },
}
