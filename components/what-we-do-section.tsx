const pillars = [
  {
    micro: "GEFÖRDERTER URLAUB",
    heading: "Reisen, ohne dir Sorgen zu machen.",
    body: "Wir übernehmen die Kosten für Unterkunft, Anreise und Aktivitäten — komplett, ohne versteckte Bedingungen.",
    bg: "#e6eaff",
  },
  {
    micro: "PERSÖNLICHE BEGLEITUNG",
    heading: "Jemand ist immer für euch da.",
    body: "Von der ersten Anfrage bis zur Rückkehr begleiten wir eure Familie mit Rat, Koordination und einem offenen Ohr.",
    bg: "#f3effc",
  },
  {
    micro: "NACHHALTIGE VERNETZUNG",
    heading: "Anschluss, der über den Urlaub hinausgeht.",
    body: "Wir verbinden euch mit anderen Familien und lokalen Angeboten — damit die positive Energie langfristig bleibt.",
    bg: "#fff4f0",
  },
]

export function WhatWeDoSection() {
  return (
    <section id="what-we-do" className="px-6 py-24" style={{ backgroundColor: "#fbf7f5" }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-6xl md:text-7xl font-bold font-sans text-foreground text-balance">
            Wie wir Familien helfen
          </h2>
          <p className="text-3xl font-semibold font-sans text-foreground">Drei Bausteine — ein Ziel</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.micro}
              className="rounded-2xl p-8 flex flex-col gap-4"
              style={{ backgroundColor: pillar.bg }}
            >
              <span className="text-sm font-semibold font-sans tracking-widest text-foreground uppercase">
                {pillar.micro}
              </span>
              <h3 className="text-2xl font-semibold font-sans text-foreground leading-snug">
                {pillar.heading}
              </h3>
              <p className="text-xl font-sans text-foreground leading-relaxed">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
