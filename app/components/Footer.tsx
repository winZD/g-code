import { Link } from "react-router";
import { FaLinkedin } from "react-icons/fa";

const footerLinkClass =
  "text-sm text-slate-300 hover:text-white transition-colors duration-200 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2";

export function Footer() {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-bold tracking-tight">G-CODE</span>
            <p className="text-sm text-slate-400">
              Vaš partner u digitalnoj transformaciji.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-3">
            <a href="tel:+385993255982" className={footerLinkClass}>
              Telefon: +385 99 325 5982
            </a>
            <a href="mailto:info@g-code.com.hr" className={footerLinkClass}>
              Email: info@g-code.com.hr
            </a>
            <Link
              rel="noreferrer"
              target="_blank"
              to="https://www.linkedin.com/company/g-code-info/about/?viewAsMember=true"
              aria-label="G-CODE on LinkedIn"
              className="text-slate-300 hover:text-white transition-colors duration-200 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
            >
              <FaLinkedin size={20} />
            </Link>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} G-CODE. Sva prava pridržana.
          </p>
          <span className="hidden sm:inline text-slate-600">&middot;</span>
          <Link
            to="/privacy-policy"
            className="text-sm text-slate-400 hover:text-accent-300 underline underline-offset-4 transition-colors duration-200 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
          >
            Pravila privatnosti
          </Link>
        </div>
      </div>
    </footer>
  );
}
