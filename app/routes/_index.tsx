import { ActionFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { useRef, useState, useEffect } from "react";
import { FaBars, FaLinkedin } from "react-icons/fa";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaX } from "react-icons/fa6";
import { sendEmail } from "~/utils/sendMail";
import { jsonWithSuccess } from "remix-toast";

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
  name: zod.string().min(1),
  email: zod.string().email().min(1),
  query: zod.string().min(1),
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
    return json({ errors, defaultValues });
  }

  await sendEmail({
    to: "info@g-code.com.hr",
    name: data.name,
    email: data.email,
    query: data.query,
  });

  return jsonWithSuccess(data, "You successfully submitted your e-mail!");
};

export default function Index() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const contactRef = useRef<HTMLDivElement | null>(null);
  const aboutUsRef = useRef<HTMLDivElement | null>(null);
  const servicesRef = useRef<HTMLDivElement | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver,
  });

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToAboutUs = () => {
    aboutUsRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-slate-50" id="main-content">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="flex max-w-7xl px-6 py-4 justify-between items-center mx-auto">
          <span className="text-2xl font-bold tracking-tight text-blue-950">
            G-CODE
          </span>
          <div className="flex md:hidden">
            <button
              onClick={() => setOpen(!open)}
              aria-label={
                open ? "Close navigation menu" : "Open navigation menu"
              }
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {open ? <FaX size={20} /> : <FaBars size={20} />}
            </button>
            {open && (
              <nav
                className="flex flex-col w-full absolute top-full left-0 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-lg"
                aria-label="Mobile Navigation"
              >
                <div className="flex flex-col">
                  <button
                    className="px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-950 transition-colors text-left"
                    onClick={() => {
                      scrollToAboutUs();
                      setOpen(false);
                    }}
                  >
                    About
                  </button>
                  <button
                    className="px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-950 transition-colors text-left"
                    onClick={() => {
                      scrollToServices();
                      setOpen(false);
                    }}
                  >
                    Services
                  </button>
                  <button
                    className="px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-950 transition-colors text-left"
                    onClick={() => {
                      scrollToContact();
                      setOpen(false);
                    }}
                  >
                    Contact
                  </button>
                </div>
              </nav>
            )}
          </div>
          <nav
            className="hidden md:flex items-center gap-x-8"
            aria-label="Primary Navigation"
          >
            <button
              onClick={scrollToAboutUs}
              className="text-sm font-medium text-slate-600 hover:text-blue-950 transition-colors"
            >
              About
            </button>
            <button
              onClick={scrollToServices}
              className="text-sm font-medium text-slate-600 hover:text-blue-950 transition-colors"
            >
              Services
            </button>
            <button
              onClick={scrollToContact}
              className="text-sm font-medium bg-blue-950 text-white px-5 py-2 rounded-full hover:bg-blue-900 transition-colors"
            >
              Contact
            </button>
          </nav>
        </div>
      </header>

      <main className="flex flex-col grow">
        {/* Hero */}
        <section className="relative flex flex-col bg-[url('/tech.jpg')] min-h-[90vh] w-full bg-cover bg-center items-center justify-center text-center text-white">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-950/60 to-slate-900/90" />
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <p
              className={`text-sm md:text-base font-medium tracking-widest uppercase text-blue-300 mb-4 ${
                mounted ? "animate-fade-in" : "opacity-0"
              }`}
            >
              Development &middot; Design &middot; Strategy
            </p>
            <h1
              className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 ${
                mounted ? "animate-fade-in-up" : "opacity-0"
              }`}
            >
              Your Best
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Digital Partner
              </span>
            </h1>
            <p
              className={`text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 ${
                mounted ? "animate-fade-in-delay" : "opacity-0"
              }`}
            >
              We build scalable, high-performance web applications that drive
              digital transformation for businesses worldwide.
            </p>
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center ${
                mounted ? "animate-fade-in-up-delay" : "opacity-0"
              }`}
            >
              <button
                className="px-8 py-3.5 bg-white text-blue-950 font-semibold rounded-full hover:bg-slate-100 transition-all hover:shadow-lg hover:shadow-white/20"
                onClick={scrollToContact}
              >
                Get in Touch
              </button>
              <button
                className="px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
                onClick={scrollToServices}
              >
                Our Services
              </button>
            </div>
          </div>
        </section>

        {/* About */}
        <section
          ref={aboutUsRef}
          className="py-20 md:py-28 bg-white"
          aria-labelledby="about-heading"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
              <div className="flex-1 flex items-center justify-center">
                <img
                  src="logo_1.png"
                  alt="G-CODE company logo"
                  className="w-full max-w-sm"
                  width={384}
                  height={384}
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <h2
                  id="about-heading"
                  className="text-3xl md:text-4xl font-bold text-blue-950 mb-8"
                >
                  About G-CODE
                </h2>
                <div className="space-y-5 text-slate-600 leading-relaxed">
                  <p>
                    Our business specializes in developing custom web software
                    solutions tailored to meet the unique needs of our clients.
                    We combine modern technologies with user-friendly design to
                    create scalable, secure, and high-performance web
                    applications.
                  </p>
                  <p>
                    From e-commerce platforms to enterprise management systems,
                    we deliver solutions that streamline operations and drive
                    digital transformation. Our team of expert developers is
                    dedicated to ensuring each project is delivered on time and
                    exceeds expectations.
                  </p>
                  <p>
                    We focus on understanding our clients&apos; goals to provide
                    innovative solutions that enhance their online presence.
                    With a commitment to quality and ongoing support, we help
                    businesses grow in the digital space.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section
          ref={servicesRef}
          className="py-20 md:py-28 bg-slate-50"
          aria-labelledby="services-heading"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2
                id="services-heading"
                className="text-3xl md:text-4xl font-bold text-blue-950 mb-4"
              >
                What We Do
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                We offer end-to-end digital services to bring your vision to
                life.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <article className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-200 hover:-translate-y-1">
                <div className="mb-6">
                  <img
                    className="h-28 mx-auto"
                    src="undraw_progressive_app_m-9-ms.svg"
                    alt="Custom web development illustration"
                    width={160}
                    height={112}
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-3 text-center">
                  Development
                </h3>
                <p className="text-slate-600 text-center leading-relaxed">
                  We create custom, high-performance web applications tailored
                  to meet specific client needs, using modern technologies and
                  ensuring scalability, security, and efficiency.
                </p>
              </article>
              <article className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-200 hover:-translate-y-1">
                <div className="mb-6">
                  <img
                    className="h-28 mx-auto"
                    src="undraw_design_process.svg"
                    alt="UX/UI design process illustration"
                    width={160}
                    height={112}
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-3 text-center">
                  Design
                </h3>
                <p className="text-slate-600 text-center leading-relaxed">
                  Our design services focus on user experience, combining
                  aesthetics with functionality to create intuitive, visually
                  appealing digital interfaces that drive engagement.
                </p>
              </article>
              <article className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-200 hover:-translate-y-1">
                <div className="mb-6">
                  <img
                    className="h-28 mx-auto"
                    src="undraw_business_plan_re_0v81.svg"
                    alt="Business analysis illustration"
                    width={160}
                    height={112}
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-bold text-blue-950 mb-3 text-center">
                  Business Analysis
                </h3>
                <p className="text-slate-600 text-center leading-relaxed">
                  We help businesses optimize their digital strategies by
                  analyzing data and providing actionable insights to improve
                  operational efficiency and digital transformation.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          ref={contactRef}
          className="py-20 md:py-28 bg-white"
          aria-labelledby="contact-heading"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="flex-1 flex flex-col gap-y-6">
                <h2
                  id="contact-heading"
                  className="text-3xl md:text-4xl font-bold text-blue-950"
                >
                  Get in Touch
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Whether you&apos;re looking to transform your business with
                  innovative tech solutions or have questions about our
                  services, we&apos;re here to help.
                </p>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Reach out to our team, and let&apos;s make IT simple together.
                  Fill out the form with your details, and we&apos;ll get back
                  to you promptly to discuss your needs.
                </p>
                <img
                  className="h-60 mt-4 self-center lg:self-start"
                  src="undraw_business_deal_re_up4u.svg"
                  alt="Business partnership illustration"
                  width={320}
                  height={240}
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <Form
                  className="flex flex-col gap-5 bg-slate-50 rounded-2xl p-8 border border-slate-200"
                  onSubmit={handleSubmit}
                  method="POST"
                >
                  <div className="flex flex-col gap-5 md:flex-row">
                    <label className="flex flex-col gap-1.5 w-full">
                      <span className="text-sm font-medium text-slate-700">
                        Name
                      </span>
                      <input
                        className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow cursor-text"
                        type="text"
                        placeholder="Your name"
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
                        className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow cursor-text"
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
                      Message
                    </span>
                    <textarea
                      className="px-4 py-2.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow min-h-[140px] resize-y cursor-text"
                      placeholder="Tell us about your project..."
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
                    className="w-full py-3 bg-blue-950 text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors mt-2"
                    type="submit"
                  >
                    Send Message
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-xl font-bold tracking-tight">G-CODE</span>
              <p className="text-sm text-slate-400">
                Your partner in digital transformation.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-3">
              <a
                href="tel:+385993255982"
                className="text-sm text-slate-300 hover:text-white transition-colors"
              >
                Phone: +385 99 325 5982
              </a>
              <a
                href="mailto:info@g-code.com.hr"
                className="text-sm text-slate-300 hover:text-white transition-colors"
              >
                Email: info@g-code.com.hr
              </a>
              <Link
                rel="noreferrer"
                target="_blank"
                to="https://www.linkedin.com/company/g-code-info/about/?viewAsMember=true"
                aria-label="G-CODE on LinkedIn"
                className="text-slate-300 hover:text-white transition-colors"
              >
                <FaLinkedin size={20} />
              </Link>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} G-CODE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
