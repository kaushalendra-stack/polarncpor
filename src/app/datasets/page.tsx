import { getDatasetsAll } from "@/lib/repository";
import { datasetCategories } from "@/lib/data";
import DatasetsClient from "@/components/DatasetsClient";

export default async function DatasetsPage() {
  const { data } = await getDatasetsAll();

  const categories = datasetCategories.map((cat) => ({
    name: cat.name,
    icon: cat.icon,
    desc: cat.desc,
  }));

  return <DatasetsClient datasets={data} categories={categories} />;
}