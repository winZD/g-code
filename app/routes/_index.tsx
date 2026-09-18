import { ActionFunctionArgs, MetaFunction, Form, useNavigation } from "react-router";
import { useState, useEffect } from "react";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendEmail } from "~/utils/sendMail";
import { dataWithSuccess } from "remix-toast";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import { Reveal } from "~/components/Reveal";

export const meta: MetaFunction = () => {
  return [
    { title: "G-CODE | Custom Web Development & Digital Solutions in Croatia" },
    {
      name: "description",
      content:
        "G-CODE is a Croatian digital agency specializing in custom web development, UX/UI design, and business analysis. We build scalable, high-performance web applications that drive digital transformation.",
    },
    {
      name: "keywords",
      content:
        "web development Croatia, custom software development, UX/UI design, business analysis, digital transformation, G-CODE, web agency Croatia, React development, enterprise web solutions, e-commerce development",
    },
    { name: "author", content: "G-CODE" },
    { name: "robots", content: "index, follow" },
    { name: "geo.region", content: "HR" },
    { name: "geo.placename", content: "Croatia" },
    { name: "language", content: "en" },
    {
      property: "og:title",
      content: "G-CODE | Custom Web Development & Digital Solutions",
    },
    {
      property: "og:description",
      content:
        "Transform your business with G-CODE's expert web development, UX/UI design, and digital strategy services. Based in Croatia, serving clients worldwide.",
    },
    { property: "og:url", content: "https://www.g-code.com.hr/" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "G-CODE" },
    { property: "og:locale", content: "en_US" },
    { property: "og:image", content: "https://www.g-code.com.hr/logo_1.png" },
    {
      property: "og:image:alt",
      content: "G-CODE - Custom Web Development & Digital Solutions",
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "G-CODE | Custom Web Development & Digital Solutions",
    },
    {
      name: "twitter:description",
      content:
        "Transform your business with G-CODE's expert web development, UX/UI design, and digital strategy services.",
    },
    { name: "twitter:image", content: "https://www.g-code.com.hr/logo_1.png" },
  ];
};

const schema = zod.object({
  name: zod.string().min(1, { message: "Ime je obavezno." }),
  email: zod
    .string()
    .min(1, { message: "Email je obavezan." })
    .email({ message: "Unesite ispravnu email adresu." }),
  query: zod.string().min(1, { message: "Poruka je obavezna." }),
});
type FormData = zod.infer<typeof schema>;
const resolver = zodResolver(schema);

export const action = async ({ request }: ActionFunctionArgs) => {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<FormData>(request, resolver);

  if (errors) {
    return { errors, defaultValues };
  }

  await sendEmail({
    to: "info@g-code.com.hr",
    name: data.name,
    email: data.email,
    query: data.query,
  });

  return dataWithSuccess(data, "Vaša poruka je uspješno poslana!");
};

const serviceCards = [
  {
    src: "undraw_progressive_app_m-9-ms.svg",
    alt: "Custom web development illustration",
    title: "Razvoj",
    description:
      "Razvijamo web, mobilne i AI-native aplikacije — od automatizacije poslovnih procesa do inteligentnih sučelja koja uče i prilagođavaju se korisnicima.",
  },
  {
    src: "undraw_design_process.svg",
    alt: "UX/UI design process illustration",
    title: "Dizajn",
    description:
      "Kreiramo digitalna iskustva vođena podacima i analizom ponašanja korisnika — dizajn koji je intuitivan, moderan i usmjeren na konverziju.",
  },
  {
    src: "undraw_business_plan_re_0v81.svg",
    alt: "Business analysis illustration",
    title: "Poslovna Analiza",
    description:
      "Koristimo analitiku za otkrivanje poslovnih uvida, predviđanje trendova i optimizaciju procesa — odluke temeljene na podacima, ne pretpostavkama.",
  },
];

function ServiceCard({ card }: { card: (typeof serviceCards)[number] }) {
  return (
    <article className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-950/5 transition-all duration-300 ease-out border border-slate-100 hover:border-accent-300">
      <div className="bg-accent-50 group-hover:bg-accent-100 transition-colors duration-300 rounded-2xl p-5 w-fit mx-auto mb-6">
        <img
          className="w-16 h-16 object-contain"
          src={card.src}
          alt={card.alt}
          width={64}
          height={64}
          loading="lazy"
        />
      </div>
      <h3 className="text-xl font-bold text-blue-950 mb-3 text-center">
        {card.title}
      </h3>
      <p className="text-slate-600 text-center leading-relaxed">
        {card.description}
      </p>
    </article>
  );
}

export default function Index() {
  const [mounted, setMounted] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50" id="main-content">
      <Header />

      <main className="flex flex-col grow">
        {/* Hero */}
        <section className="relative flex flex-col bg-[url('/tech.jpg')] min-h-[90vh] w-full bg-cover bg-center items-center justify-center text-center text-white">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-950/60 to-slate-900/90" />
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <p
              className={`text-sm md:text-base font-medium tracking-widest uppercase text-accent-300 mb-4 ${
                mounted ? "animate-fade-in" : "opacity-0"
              }`}
            >
              Razvoj &middot; Dizajn &middot; Strategija
            </p>
            <h1
              className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 ${
                mounted ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              G-CODE
              <br />
              <span className="bg-gradient-to-r from-blue-300 to-accent-400 bg-clip-text text-transparent">
                Digitalni Partner
              </span>
            </h1>
            <p
              className={`text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 ${
                mounted ? "animate-fade-in-delay" : "opacity-0"
              }`}
            >
              Gradimo pametne, skalabilne web, mobilne i AI-native aplikacije —
              brže, učinkovitije, za vaš uspjeh.
            </p>
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center ${
                mounted ? "animate-fade-in-up-delay" : "opacity-0"
              }`}
            >
              <a href="#contact" className="btn-primary bg-white text-blue-950 hover:bg-slate-100 shadow-lg shadow-black/10">
                Kontaktirajte Nas
              </a>
              <a href="#services" className="btn-secondary">
                Naše Usluge
              </a>
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="py-24 md:py-32 bg-white"
          aria-labelledby="about-heading"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
              <Reveal className="flex-1 flex items-center justify-center" animation="fade-in">
                <img
                  src="logo_1.png"
                  alt="G-CODE company logo"
                  className="w-full max-w-sm"
                  width={384}
                  height={384}
                  loading="lazy"
                />
              </Reveal>
              <Reveal className="flex-1" animation="fade-in-up-delay-150">
                <p className="text-accent-600 text-sm font-semibold tracking-widest uppercase mb-3">
                  O nama
                </p>
                <h2
                  id="about-heading"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-blue-950 mb-8"
                >
                  O G-CODE-u
                </h2>
                <div className="space-y-5 text-slate-600 leading-relaxed">
                  <p>
                    Specijaliziramo se za razvoj web i mobilnih aplikacija te AI
                    native rješenja prilagođenih vašem poslovanju. Spajamo
                    moderan razvoj, intuitivni dizajn i pametnu automatizaciju
                    kako bismo isporučili skalabilne i sigurne aplikacije.
                  </p>
                  <p>
                    Od e-commerce platformi do AI native poslovnih sustava —
                    razvijamo rješenja koja optimiziraju procese i ubrzavaju
                    digitalnu transformaciju. Svaki projekt isporučujemo na
                    vrijeme, uz visoke standarde kvalitete i dugoročnu podršku.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Services */}
        <section
          id="services"
          className="py-24 md:py-32 bg-slate-50"
          aria-labelledby="services-heading"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-accent-600 text-sm font-semibold tracking-widest uppercase mb-3">
                Usluge
              </p>
              <h2
                id="services-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-blue-950 mb-4"
              >
                Što Radimo
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                Pružamo sveobuhvatne digitalne usluge — od ideje do produkcije.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {serviceCards.map((card) => (
                <ServiceCard key={card.title} card={card} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="py-24 md:py-32 bg-white"
          aria-labelledby="contact-heading"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16">
              <Reveal className="flex-1 flex flex-col gap-y-6">
                <p className="text-accent-600 text-sm font-semibold tracking-widest uppercase">
                  Kontakt
                </p>
                <h2
                  id="contact-heading"
                  className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-blue-950 mb-4"
                >
                  Kontaktirajte Nas
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Imate ideju ili projekt? Javite nam se — zajedno ćemo pronaći
                  najbrže i najpametnije rješenje za vaš biznis.
                </p>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Ispunite obrazac i javit ćemo vam se u najkraćem mogućem roku.
                </p>
                <img
                  className="h-60 mt-4 self-center lg:self-start"
                  src="undraw_business_deal_re_up4u.svg"
                  alt="Business partnership illustration"
                  width={320}
                  height={240}
                  loading="lazy"
                />
              </Reveal>
              <Reveal className="flex-1" animation="fade-in-up-delay-150">
                <Form
                  className="flex flex-col gap-5 bg-slate-50 rounded-2xl p-8 border border-slate-200"
                  onSubmit={handleSubmit}
                  method="POST"
                >
                  <div className="flex flex-col gap-5 md:flex-row">
                    <label className="flex flex-col gap-1.5 w-full">
                      <span className="text-sm font-medium text-slate-700">
                        Ime
                      </span>
                      <input
                        className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-shadow cursor-text"
                        type="text"
                        placeholder="Vaše ime"
                        {...register("name")}
                        aria-invalid={errors.name ? "true" : "false"}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600" role="alert">
                          {errors.name.message}
                        </p>
                      )}
                    </label>
                    <label className="flex flex-col gap-1.5 w-full">
                      <span className="text-sm font-medium text-slate-700">
                        Email
                      </span>
                      <input
                        className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-shadow cursor-text"
                        type="email"
                        placeholder="your@email.com"
                        {...register("email")}
                        aria-invalid={errors.email ? "true" : "false"}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600" role="alert">
                          {errors.email.message}
                        </p>
                      )}
                    </label>
                  </div>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-medium text-slate-700">
                      Poruka
                    </span>
                    <textarea
                      className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-shadow min-h-[140px] resize-y cursor-text"
                      placeholder="Opišite vaš projekt..."
                      {...register("query")}
                      aria-invalid={errors.query ? "true" : "false"}
                    />
                    {errors.query && (
                      <p className="text-sm text-red-600" role="alert">
                        {errors.query.message}
                      </p>
                    )}
                  </label>
                  <button
                    className="btn-primary w-full mt-2"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Slanje..." : "Pošalji Poruku"}
                  </button>
                </Form>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
