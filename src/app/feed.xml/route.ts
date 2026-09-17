import { getPublicationsAll, getActivitiesAll } from "@/lib/repository";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://polarncpor.vercel.app";

const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

function rssDate(date: string) {
  return new Date(date).toUTCString();
}

export async function GET() {
  const [{ data: publications }, { data: activities }] = await Promise.all([
    getPublicationsAll(),
    getActivitiesAll(),
  ]);

  const pubItems = publications
    .slice(0, 15)
    .map((p) => {
      const date = new Date(`${p.year}-01-01T00:00:00Z`);
      return `<item>
        <title>${escapeXml(p.title)}</title>
        <link>${baseUrl}/publications</link>
        <guid isPermaLink="false">${baseUrl}/publications#${p.id}</guid>
        <description>${escapeXml(`${p.authors} — ${p.journal}`)}</description>
        <pubDate>${date.toUTCString()}</pubDate>
        <category>Publication</category>
      </item>`;
    })
    .join("");

  const activityItems = activities
    .slice(0, 15)
    .map((a) => {
      const date = new Date(a.date);
      return `<item>
        <title>${escapeXml(a.title)}</title>
        <link>${baseUrl}/activities</link>
        <guid isPermaLink="false">${baseUrl}/activities#${a.id}</guid>
        <description>${escapeXml(a.summary)}</description>
        <pubDate>${date.toUTCString()}</pubDate>
        <category>${escapeXml(a.category)}</category>
      </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>PolarNCPOR — NCPOR Outreach Feed</title>
    <link>${baseUrl}</link>
    <description>Latest publications, news and activities from India's polar science programme (NCPOR, Ministry of Earth Sciences).</description>
    <language>en-in</language>
    <lastBuildDate>${rssDate(new Date().toISOString())}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/favicon.ico</url>
      <title>PolarNCPOR — NCPOR</title>
      <link>${baseUrl}</link>
    </image>
    ${pubItems}
    ${activityItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=1800",
    },
  });
}