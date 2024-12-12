import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  const robotText = `
        User-agent: Googlebot
        Disallow: /nogooglebot/
    
        User-agent: *
        Allow: /
    
        Sitemap: https://www.g-code.com.hr/sitemap.xml
        `;
  return new Response(robotText, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
};
