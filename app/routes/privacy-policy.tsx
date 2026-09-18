import type { MetaFunction } from "react-router";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "Pravila privatnosti | G-CODE" },
    {
      name: "description",
      content:
        "Pravila privatnosti G-CODE-a: koje osobne podatke prikupljamo putem kontakt obrasca, kako ih obrađujemo i koja prava imate temeljem GDPR-a.",
    },
    { name: "robots", content: "index, follow" },
    { name: "geo.region", content: "HR" },
    { property: "og:title", content: "Pravila privatnosti | G-CODE" },
    {
      property: "og:description",
      content:
        "Saznajte kako G-CODE prikuplja, koristi i štiti vaše osobne podatke.",
    },
    { property: "og:url", content: "https://www.g-code.com.hr/privacy-policy" },
    { property: "og:type", content: "website" },
  ];
};

const lastUpdated = "18.9.2026.";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xl md:text-2xl font-bold text-blue-950 mb-3">
        {title}
      </h2>
      <div className="space-y-3 text-slate-600 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50" id="main-content">
      <Header />

      <main className="flex flex-col grow bg-white py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 w-full">
          <p className="text-accent-600 text-sm font-semibold tracking-widest uppercase mb-3">
            Pravna obavijest
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-blue-950 mb-2">
            Pravila privatnosti
          </h1>
          <p className="text-sm text-slate-500 mb-12">
            Zadnje ažurirano: {lastUpdated}
          </p>

          <Section title="1. Uvod i voditelj obrade">
            <p>
              Voditelj obrade osobnih podataka prikupljenih putem ove web
              stranice je:{" "}
              <strong>
                [Naziv obrta/tvrtke, OIB, adresa sjedišta — POPUNITI PRIJE
                OBJAVE]
              </strong>{" "}
              (u daljnjem tekstu: &quot;G-CODE&quot; ili &quot;mi&quot;), s
              kontakt adresom e-pošte{" "}
              <a
                href="mailto:info@g-code.com.hr"
                className="text-blue-950 underline underline-offset-2 hover:text-accent-600"
              >
                info@g-code.com.hr
              </a>
              . Ova pravila privatnosti objašnjavaju koje osobne podatke
              prikupljamo, u koje svrhe ih obrađujemo te koja prava imate kao
              ispitanik temeljem Opće uredbe o zaštiti podataka (GDPR).
            </p>
          </Section>

          <Section title="2. Koje osobne podatke prikupljamo">
            <p>
              Osobne podatke prikupljamo isključivo putem kontakt obrasca na
              ovoj stranici, i to:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>ime i prezime,</li>
              <li>email adresa,</li>
              <li>sadržaj poruke koju nam pošaljete.</li>
            </ul>
            <p>
              Ne koristimo alate za analitiku posjetitelja niti prikupljamo
              druge osobne podatke izvan onoga što nam dobrovoljno pošaljete
              putem obrasca.
            </p>
          </Section>

          <Section title="3. Svrha obrade">
            <p>
              Podatke prikupljene putem kontakt obrasca koristimo isključivo u
              svrhu odgovaranja na vaš upit i poslovne komunikacije vezane uz
              vaš zahtjev.
            </p>
          </Section>

          <Section title="4. Pravna osnova obrade">
            <p>
              Pravna osnova za obradu vaših osobnih podataka je vaša privola,
              izražena slanjem kontakt obrasca (čl. 6. st. 1. t. (a) GDPR-a),
              odnosno naš legitimni interes za odgovaranje na zaprimljene
              upite.
            </p>
          </Section>

          <Section title="5. Razdoblje čuvanja podataka">
            <p>
              Vaše podatke čuvamo samo onoliko dugo koliko je potrebno za
              rješavanje vašeg upita i naknadnu poslovnu komunikaciju. Podatke
              možete zatražiti na brisanje u bilo kojem trenutku, sukladno
              odjeljku 9. ovih pravila.
            </p>
          </Section>

          <Section title="6. Kolačići">
            <p>
              Za upravljanje pristankom na korištenje kolačića koristimo uslugu{" "}
              <strong>CookieYes</strong>, koja prilikom vašeg prvog posjeta
              stranici prikazuje baner za upravljanje postavkama kolačića.
              Putem tog banera možete u svakom trenutku pregledati, prihvatiti
              ili odbiti pojedine kategorije kolačića.
            </p>
          </Section>

          <Section title="7. Primatelji podataka">
            <p>
              Poruke poslane putem kontakt obrasca šaljemo putem usluge
              elektroničke pošte <strong>Zoho Mail</strong>, koja u ovom
              slučaju djeluje kao izvršitelj obrade. Vaše podatke ne dijelimo
              s trećim stranama u druge svrhe niti ih prodajemo.
            </p>
          </Section>

          <Section title="8. Sigurnost podataka">
            <p>
              Poduzimamo razumne tehničke i organizacijske mjere kako bismo
              zaštitili vaše osobne podatke od neovlaštenog pristupa, gubitka
              ili zlouporabe.
            </p>
          </Section>

          <Section title="9. Vaša prava">
            <p>
              Kao ispitanik, temeljem GDPR-a imate pravo na: pristup svojim
              osobnim podacima, ispravak netočnih podataka, brisanje podataka,
              ograničenje obrade, prigovor na obradu te prenosivost podataka.
              Također imate pravo podnijeti pritužbu Agenciji za zaštitu
              osobnih podataka (AZOP), ako smatrate da je obrada vaših
              podataka u suprotnosti s GDPR-om.
            </p>
            <p>
              Za ostvarivanje bilo kojeg od navedenih prava, obratite nam se
              putem{" "}
              <a
                href="mailto:info@g-code.com.hr"
                className="text-blue-950 underline underline-offset-2 hover:text-accent-600"
              >
                info@g-code.com.hr
              </a>
              .
            </p>
          </Section>

          <Section title="10. Izmjene ovih pravila">
            <p>
              Ova pravila privatnosti povremeno možemo ažurirati. O svim
              značajnijim izmjenama obavijestit ćemo vas objavom ažurirane
              verzije na ovoj stranici, uz naznaku datuma zadnje izmjene na
              vrhu dokumenta.
            </p>
          </Section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
