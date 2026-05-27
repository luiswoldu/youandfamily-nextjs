"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useConsent } from "@/lib/consent"

export default function DatenschutzPage() {
  const { reopen } = useConsent()

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#fbf7f5" }}>
      <div className="px-6 pt-8 max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-base font-sans text-foreground hover:opacity-60 transition-opacity"
        >
          <ArrowLeft size={18} />
          Zurück
        </Link>
      </div>

      <div className="px-6 py-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-sans leading-tighter text-balance text-foreground">
            Datenschutzerklärung
          </h1>
        </div>

        <div className="flex flex-col gap-8 text-base md:text-lg font-sans text-foreground leading-relaxed">
          <section className="flex flex-col gap-3 pt-28">
            <h2 className="text-xl md:text-2xl font-bold font-sans">1 Geltungsbereich dieser Datenschutzerklärung</h2>
            <p>
              Diese Datenschutzerklärung gilt für die Website von You&amp;Family. Sie informiert Sie über Art, Umfang
              und Zweck der Erhebung und Verwendung personenbezogener Daten beim Besuch unserer Website.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-bold font-sans">
              2 Name und Kontaktdaten des Verantwortlichen und des Datenschutzbeauftragten
            </h2>
            <p>
              Verantwortlicher: You&amp;Family Vorwerkstraße 12 20357 Hamburg E-Mail: info@youandfamily.de
            </p>
            <p>
              Datenschutzbeauftragter: Graf Consultings GmbH Karwendelstraße 7 86949 Windach E-Mail:
              datenschutz@youandfamily.de
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-bold font-sans">
              3 Verarbeitung personenbezogener Daten beim Aufruf unserer Website
            </h2>
            <p>
              Beim Aufruf unserer Website werden sogenannte Zugriffsdaten erhoben und in Logfiles gespeichert.
            </p>
            <p>Zu diesen Zugriffsdaten zählen insbesondere:</p>
            <ul className="list-disc pl-6 flex flex-col gap-1">
              <li>Besuchte Website und zuvor besuchte Seite</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>Aufgerufene Datei / URL</li>
              <li>Übertragene Datenmenge und Statusmeldung</li>
              <li>Browsertyp und Betriebssystem</li>
              <li>IP-Adresse und anfragender Provider</li>
            </ul>
            <p>Diese Daten werden verarbeitet, um:</p>
            <ul className="list-disc pl-6 flex flex-col gap-1">
              <li>einen reibungslosen Verbindungsaufbau der Website sicherzustellen,</li>
              <li>die komfortable Nutzung der Website zu gewährleisten,</li>
              <li>Systemstabilität und -sicherheit auszuwerten,</li>
              <li>statistische und administrative Zwecke zu erfüllen.</li>
            </ul>
            <p>
              Die IP-Adresse wird nur vorübergehend gespeichert, um die Website bereitzustellen. Eine Speicherung
              erfolgt in Logfiles für maximal 30 Tage und wird anschließend gelöscht. Eine gesetzliche oder
              vertragliche Pflicht zur Bereitstellung dieser Daten besteht nicht.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-bold font-sans">4 Rechtsgrundlagen</h2>
            <p>
              Die Verarbeitung personenbezogener Daten erfolgt gemäß DSGVO. Sofern nicht anders angegeben, gelten
              folgende RechtsgrundlageO i.V.m. Art. 7 DSGVO
            </p>
            <ul className="list-disc pl-6 flex flex-col gap-1">
              <li>Vertragserfüllung: Art. 6 Abs. 1 lit. b DSGVO</li>
              <li>Rechtliche Verpflichtung: Art. 6 Abs. 1 lit. c DSGVO</li>
              <li>Berechtigte Interessen: Art. 6 Abs. 1 lit. f DSGVO</li>
              <li>Lebenswichtige Interessen: Art. 6 Abs. 1 lit. d DSGVO</li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-bold font-sans">
              5 Zusammenarbeit mit Auftragsverarbeitern und Dritten
            </h2>
            <p>Eine Weitergabe personenbezogener Daten erfolgt nur, wenn:</p>
            <ul className="list-disc pl-6 flex flex-col gap-1">
              <li>eine gesetzliche Erlaubnis besteht,</li>
              <li>Sie eingewilligt haben,</li>
              <li>eine rechtliche Verpflichtung besteht oder</li>
              <li>dies zur Wahrung berechtigter Interessen erforderlich ist.</li>
            </ul>
            <p>
              Werden Dienstleister als Auftragsverarbeiter eingesetzt, erfolgt dies gemäß Art. 28 DSGVO auf Basis
              entsprechender Verträge.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-bold font-sans">6 Übermittlungen in Drittländer</h2>
            <p>Eine Verarbeitung personenbezogener Daten in Drittländern erfolgt nur, wenn:</p>
            <ul className="list-disc pl-6 flex flex-col gap-1">
              <li>dies zur Vertragserfüllung erforderlich ist,</li>
              <li>Sie eingewilligt haben oder</li>
              <li>eine gesetzliche Grundlage besteht.</li>
            </ul>
            <p>
              In diesen Fällen erfolgt die Verarbeitung nur unter Einhaltung der Art. 44 ff. DSGVO, z. B. durch
              Standardvertragsklauseln oder ein anerkanntes Dativeau.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-bold font-sans">7 Hosting</h2>
            <p>
              Unsere Hosting-Leistungen umfassen Infrastruktur-, Speicher- und Datenbankdienste sowie Sicherheits- und
              Wartungsleistungen.
            </p>
            <p>
              Dabei werden personenbezogene Daten wie Bestands-, Kontakt-, Nutzungs-, Meta- und Kommunikationsdaten
              verarbeitet. Dies erfolgt auf Grundlage unserer berechtigten Interessen an einer sicheren und effizienten
              Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO i.V.m. Art. 28 DSGVO).
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-bold font-sans">8 Cookies</h2>
            <p>Cookies sind kleine Dateien, die auf Ihrem Endgerät gespeichert werden.</p>
            <p>Es gibt:</p>
            <ul className="list-disc pl-6 flex flex-col gap-1">
              <li>Session-Cookies (werden nach dem Schließen des Browsers gelöscht)</li>
              <li>Persistente Cookies (bleiben gespeichert)</li>
              <li>First-Party- und Third-Party-Cookies</li>
            </ul>
            <p>
              Wir verwenden hauptsächlich Session-Cookies. Technisch notwendige Cookies sind für die Funktion der
              Website erforderlich und können nicht deaktiviert werden. Andere Cookies (z. B. Analyse oder Marketing)
              können Sie über unser Consent-Tool steuern.
            </p>
            <button
              type="button"
              onClick={reopen}
              className="self-start mt-1 px-5 py-3 rounded-full text-base font-semibold font-sans border border-border bg-white text-foreground transition-opacity hover:opacity-70"
            >
              Cookie-Einstellungen verwalten
            </button>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-bold font-sans">9 Kontaktaufnahme</h2>
            <p>
              Bei Kontaktaufnahme (z. B. per E-Mail oder Telefon) werden Ihre Angaben g der Anfrage gemäß Art. 6 Abs. 1
              lit. b DSGVO verarbeitet.
            </p>
            <p>
              Die Daten werden gelöscht, sobald sie nicht mehr erforderlich sind, unter Berücksichtigung gesetzlicher
              Aufbewahrungspflichten.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-bold font-sans">10 Verlinkte Websites Dritter</h2>
            <p>
              Unsere Website kann Links zu externen Websites enthalten. Für deren Inhalte sowie deren
              Datenschutzpraktiken übernehmen wir keine Verantwortung. Bitte informieren Sie sich dort über die
              jeweiligen Datenschutzbestimmungen.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-bold font-sans">11 Onlinepräsenzen in sozialen Medien</h2>
            <p>
              Wir unterhalten Onlinepräsenzen in sozialen Netzwerken, um mit Nutzer:innen zu kommunizieren und über
              Leistungen zu informieren.
            </p>
            <p>
              Es gelten die Datenschutzrichtlinien der jeweiligen Plattformen. Wenn Sie mit uns dort interagieren,
              verarbeiten wir Ihre Daten entsprechend der gesetzlichen Grundlagen.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-bold font-sans">12 Google Analytics</h2>
            <p>Diese Website nutzt Google Analytics, einen Webanalysedienst der Google Inc.</p>
            <p>
              Google Analytics verwendet Cookies zur Analyse der Website-Nutzung. Die erzeugten Informationen werden
              in der Regel an Server von übertragen.
            </p>
            <p>
              Wir verwenden Google Analytics mit IP-Anonymisierung. Die IP-Adresse wird innerhalb der EU bzw. des EWR
              gekürzt, bevor sie übertragen wird.
            </p>
            <p>
              Wir nutzen außerdem Funktionen wie demografische Merkmale zur Erstellung aggregierter Berichte.
            </p>
            <p>
              Sie können die Datenerfassung durch Browser-Add-ons oder Opt-Out-Tools verhindern.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-bold font-sans">13 Google Fonts</h2>
            <p>Wir verwenden Google Fonts zur einheitlichen Darstellung von Schriftarten.</p>
            <p>
              Die Nutzung erfolgt ohne Authentifizierung. Es werden keine Cookies an die Google Fonts API gesendet.
              Google kann jedoch technische Daten wie CSS-Anfragen erfassen.
            </p>
            <p>Weitere Informationen finden Sie in der Datenschutzerklärung von Google.</p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-bold font-sans">14 Betroffenenrechte</h2>
            <p>Sie haben folgende Rechte:</p>
            <ul className="list-disc pl-6 flex flex-col gap-1">
              <li>Auskunft (Art. 15 DSGVO)</li>
              <li>Berichtigung (Art. 16 DSGVO)</li>
              <li>Löschung (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
              <li>Widerspruch (Art. 21 DSGVO)</li>
              <li>Beschwerde bei einer AufsichtsbehördeO)</li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-bold font-sans">15 Bewerbungen</h2>
            <p>
              Im Rahmen von Bewerbungen über unser Online-Portal verarbeiten wir Ihre Daten ausschließlich zur
              Durchführung des Bewerbungsprozesses.
            </p>
            <p>
              Die Verarbeitung erfolgt vertraulich und gemäß DSGVO. Das Bewerberportal wird durch einen externen
              Dienstleister betrieben, und Daten werden verschlüsselt übertragen und in Deutschland gespeichert.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-bold font-sans">16 Widerrufs- und Widerspruchsrecht</h2>
            <p>
              Sie können der Verarbeitung Ihrer personenbezogenen Daten jederzeit widersprechen oder eine erteilte
              Einwilligung widerrufen.
            </p>
            <p>
              Dies gilt insbesondere für Verarbeitung auf Grundlage berechtigter Interessen (Art. 6 Abs. 1 lit. f
              DSGVO) sowie für Direktwerbung.
            </p>
            <p>
              Zur Ausübung Ihrer Rechte genügt eine E-Mail an:{" "}
              <a
                href="mailto:datenschutz@youandfamily.de"
                className="underline hover:opacity-60 transition-opacity"
              >
                datenschutz@youandfamily.de
              </a>
            </p>
          </section>
        </div>
      </div>

      <footer className="px-6 py-10 border-t border-border mt-8" style={{ backgroundColor: "#fff4f0" }}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-sans text-foreground">
            &copy; {new Date().getFullYear()} You&amp;Family gGmbH
          </p>
        </div>
      </footer>
    </main>
  )
}
