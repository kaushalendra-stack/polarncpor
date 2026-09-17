import { getActivitiesAll } from "@/lib/repository";
import ActivitiesClient from "@/components/ActivitiesClient";

export default async function ActivitiesPage() {
  const { data } = await getActivitiesAll();
  return <ActivitiesClient activities={data} />;
}