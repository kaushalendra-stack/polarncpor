import type { MetadataRoute } from "next";
import { getExpeditionsAll } from "@/lib/repository";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://polarncpor.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();
  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily" as const, priority: 1 },
    { url: `${baseUrl}/expeditions`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/observatory`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/vessels`, lastModified: now, changeFrequency: "daily" as const, priority: 0.8 },
    { url: `${baseUrl}/polar-timeline`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/datasets`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.85 },
    { url: `${baseUrl}/publications`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/media`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.75 },
    { url: `${baseUrl}/activities`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/student`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/login`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/scientist`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/api-docs`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/search`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/accessibility`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.4 },
  ];

  const { data: expeditions } = await getExpeditionsAll();
  const expeditionPages = expeditions.map((exp) => ({
    url: `${baseUrl}/expeditions/${exp.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...expeditionPages];
}