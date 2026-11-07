import { getVideos } from "@/features/content/actions";
import { ContentView } from "@/features/content/components/content-view";

export default async function ContentPage() {
  const videos = await getVideos();
  return <ContentView initialVideos={videos} />;
}