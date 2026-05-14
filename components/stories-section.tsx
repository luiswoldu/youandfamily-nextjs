const stories = [
  {
    quote:
      "Wir hatten seit Jahren keinen gemeinsamen Urlaub mehr. Diese Woche hat uns als Familie wieder zusammengebracht. Die Kinder reden heute noch davon.",
    name: "Familie Yilmaz",
    location: "Hamburg",
    bg: "#fbf7f5",
  },
  {
    quote:
      "Ich hätte nie gedacht, dass so etwas möglich ist. Die Organisation war perfekt, und wir haben uns jederzeit begleitet gefühlt. Ein echtes Geschenk.",
    name: "Familie Meier",
    location: "Berlin",
    bg: "#f3effc",
  },
  {
    quote:
      "Als alleinerziehende Mutter war Urlaub ein Traum. Jetzt ist er Wirklichkeit geworden. Meine Tochter hat das Meer zum ersten Mal gesehen.",
    name: "Sara K.",
    location: "München",
    bg: "#e6eaff",
  },
]

export function StoriesSection() {
  return (
    <section id="stories" className="px-6 py-24" style={{ backgroundColor: "#fff4f0" }}>
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h2 className="text-6xl md:text-7xl font-bold font-sans text-foreground text-balance">
            Was andere Familien sagen
          </h2>
          <p className="text-3xl font-semibold font-sans text-foreground text-pretty">
            Echte Geschichten von Familien wie deiner — was ihre Woche verändert hat, und was sie mit nach Hause genommen haben.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story.name}
              className="rounded-2xl p-8 flex flex-col gap-6"
              style={{ backgroundColor: story.bg }}
            >
              <p className="text-xl font-sans text-foreground leading-relaxed">
                &ldquo;{story.quote}&rdquo;
              </p>
              <div className="flex flex-col gap-1 mt-auto">
                <span className="text-base font-semibold font-sans text-foreground">{story.name}</span>
                <span className="text-base font-sans text-foreground">{story.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
