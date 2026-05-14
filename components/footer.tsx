import Link from "next/link"

export function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-border" style={{ backgroundColor: "#fbf7f5" }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold font-sans text-foreground">You&Family</span>
          <span className="text-base font-sans text-foreground">
            Gemeinsame Zeit ist kein Luxus.
          </span>
          <span className="text-base font-sans text-foreground">info@familienurlaub.de</span>
        </div>

        <nav className="flex flex-wrap gap-6 text-base font-sans text-foreground">
          <Link href="#numbers" className="hover:opacity-60 transition-opacity">Zahlen</Link>
          <Link href="#what-we-do" className="hover:opacity-60 transition-opacity">Was wir tun</Link>
          <Link href="#mission" className="hover:opacity-60 transition-opacity">Mission</Link>
          <Link href="#stories" className="hover:opacity-60 transition-opacity">Familiengeschichten</Link>
          <Link href="#contact" className="hover:opacity-60 transition-opacity">Kontakt</Link>
        </nav>

        <p className="text-sm font-sans text-foreground">
          &copy; {new Date().getFullYear()} You&Family e.V.
        </p>
      </div>
    </footer>
  )
}
