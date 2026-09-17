import { getPublicationsAll } from "@/lib/repository";
import PublicationsClient from "@/components/PublicationsClient";

export default async function PublicationsPage() {
  const { data } = await getPublicationsAll();
  return <PublicationsClient publications={data} />;
}