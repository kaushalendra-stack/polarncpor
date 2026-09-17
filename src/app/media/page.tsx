import { getMediaAll } from "@/lib/repository";
import MediaClient from "@/components/MediaClient";

export default async function MediaPage() {
  const { data } = await getMediaAll();
  return <MediaClient mediaItems={data} />;
}