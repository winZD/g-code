import { useState } from "react";
import { Link } from "react-router";
import { FaBars } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const navLinkClass =
  "text-sm font-medium text-slate-600 hover:text-blue-950 transition-colors duration-200 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="flex max-w-7xl px-6 py-4 justify-between items-center mx-auto">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-blue-950 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
        >
          G-CODE
        </Link>
        <div className="flex md:hidden">
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
          >
            {open ? <FaX size={20} /> : <FaBars size={20} />}
          </button>
          {open && (
            <nav
              className="flex flex-col w-full absolute top-full left-0 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-lg"
              aria-label="Mobile Navigation"
            >
              <div className="flex flex-col">
                <Link
                  to="/#about"
                  className="px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-950 transition-colors duration-200 text-left"
                  onClick={() => setOpen(false)}
                >
                  O nama
                </Link>
                <Link
                  to="/#services"
                  className="px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-950 transition-colors duration-200 text-left"
                  onClick={() => setOpen(false)}
                >
                  Usluge
                </Link>
                <Link
                  to="/#contact"
                  className="px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-950 transition-colors duration-200 text-left"
                  onClick={() => setOpen(false)}
                >
                  Kontakt
                </Link>
              </div>
            </nav>
          )}
        </div>
        <nav
          className="hidden md:flex items-center gap-x-8"
          aria-label="Primary Navigation"
        >
          <Link to="/#about" className={navLinkClass}>
            O nama
          </Link>
          <Link to="/#services" className={navLinkClass}>
            Usluge
          </Link>
          <Link to="/#contact" className="btn-primary px-5 py-2 text-sm">
            Kontakt
          </Link>
        </nav>
      </div>
    </header>
  );
}
