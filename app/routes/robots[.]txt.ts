import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  const robotText = `
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://www.g-code.com.hr/sitemap.xml
  `.trim();

  return new Response(robotText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
