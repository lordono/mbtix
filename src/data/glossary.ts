/** Singlish terms that get a hover/tap definition when written as {term} in story text. */
export const GLOSSARY: Record<string, string> = {
  lah: 'All-purpose sentence ender. Adds emphasis, warmth or impatience, depending on tone.',
  leh: 'Softens a statement, a bit like "you know?" or "come on".',
  lor: 'Resigned acceptance. "Like that lor" = "Well, that\'s how it is."',
  can: '"Yes", "okay", "sure". The answer to most questions.',
  chope: 'To reserve a seat, usually by leaving a packet of tissue on the table.',
  shiok: 'Extremely satisfying, usually about food.',
  sian: 'Bored, frustrated, fed up.',
  belanja: 'To treat someone (Malay). "I belanja you" = "It\'s on me".',
  kopitiam: 'Traditional coffee shop serving kopi, kaya toast and soft-boiled eggs.',
  kopi: 'Local coffee, brewed through a cloth sock with sugar and condensed milk.',
  'kopi-c-kosong': 'Kopi with evaporated milk and no sugar.',
  kaya: 'Sweet coconut-and-egg jam, eaten on toast.',
  uncle: 'Respectful way to address an older man, related or not.',
  auntie: 'Respectful way to address an older woman, related or not.',
  hawker: 'Open-air food centre with dozens of cheap, excellent stalls.',
  makan: 'To eat (Malay). Also: food in general.',
  paiseh: 'Embarrassed, sorry, shy.',
  jialat: 'Terrible, disastrous.',
  wah: 'Expression of surprise or awe.',
  aiyo: 'Exclamation of dismay or sympathy.',
  'see-how': '"We\'ll see how it goes." Commitment level: very low.',
  paynow: 'Instant bank transfer via phone number. Splitting bills to the cent is a national sport.',
  'void-deck': 'Open ground floor of an HDB block, used for weddings, funerals, chess and gossip.',
  hdb: 'Public housing flats, home to most Singaporeans.',
  sia: 'Intensifier. "Damn sian sia" = "So frustrating, man".',
  steady: 'Reliable, well done. "Steady lah!" = "Nice one!"',
}

export function glossaryHtml(text: string, name: string): string {
  return text
    .replaceAll('@name', escapeHtml(name))
    .replace(/\{([a-z-]+)(?:\|([^}]+))?\}/gi, (_, key: string, shown?: string) => {
      const def = GLOSSARY[key.toLowerCase()]
      const label = shown ?? key.replaceAll('-', ' ')
      if (!def) return label
      return `<span class="lingo" tabindex="0" data-def="${escapeHtml(def)}">${label}</span>`
    })
}

/** Story text with glossary markup removed, for plain-text summaries. */
export function plain(text: string, name: string): string {
  return text
    .replaceAll('@name', name)
    .replace(/\{([a-z-]+)(?:\|([^}]+))?\}/gi, (_, key: string, shown?: string) => shown ?? key.replaceAll('-', ' '))
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
}
