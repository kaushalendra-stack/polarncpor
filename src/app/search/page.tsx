import {
  getExpeditionsAll,
  getDatasetsAll,
  getPublicationsAll,
  getMediaAll,
  getActivitiesAll,
} from "@/lib/repository";
import SearchClient from "@/components/SearchClient";

export default async function SearchPage() {
  const [expeditions, datasets, publications, mediaItems, activities] =
    await Promise.all([
      getExpeditionsAll(),
      getDatasetsAll(),
      getPublicationsAll(),
      getMediaAll(),
      getActivitiesAll(),
    ]);

  return (
    <SearchClient
      expeditions={expeditions.data}
      datasets={datasets.data}
      publications={publications.data}
      mediaItems={mediaItems.data}
      activities={activities.data}
    />
  );
}