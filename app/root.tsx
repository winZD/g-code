import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { ToastContainer, toast as notify } from "react-toastify";

import { LoaderFunctionArgs } from "@remix-run/node";
import { getToast } from "remix-toast";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./tailwind.css";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { toast, headers } = await getToast(request);
  return json({ toast }, { headers });
};

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  // Preload the font stylesheet for performance
  {
    rel: "preload",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    as: "style",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { toast } = useLoaderData<typeof loader>();

  useEffect(() => {
    if (toast) {
      notify(toast.message, { type: toast.type });
    }
  }, [toast]);

  return (
    <html lang="en">
      <head>
        {/* Cookie consent script */}
        <script
          id="cookieyes"
          type="text/javascript"
          src="https://cdn-cookieyes.com/client_data/f7f7dff8effb551a9942ac4e/script.js"
        ></script>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* SEO Meta Tags added by Remix meta function */}
        <Meta />

        {/* Canonical URL for SEO */}
        <link rel="canonical" href="https://www.g-code.com.hr/" />

        {/* Preload important assets if needed */}

        {/* Organization Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "G-CODE",
              url: "https://www.g-code.com.hr/",
              logo: "https://www.g-code.com.hr/logo_1.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+385993255982",
                contactType: "customer service",
              },
            }),
          }}
        />

        {/* Twitter Card Meta */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="G-CODE | Web | Development" />
        <meta
          name="twitter:description"
          content="Custom web development, UX/UI design, and business analysis to help businesses grow digitally."
        />
        <Links />
      </head>
      <body>
        {/* Skip to content link for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
        <ToastContainer />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
