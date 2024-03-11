import MainLayout from "@layouts/mainLayout";
import { createLazyFileRoute, getRouteApi } from "@tanstack/react-router";
import PodcastDetail from "@views/podcastDetail";

const routeApi = getRouteApi("/podcasts/$podcastsId");

const Podcast = () => {
  const routeParams = routeApi.useParams();
  const { podcastId } = routeParams;
  return (
    <MainLayout>
      <PodcastDetail podcastId={podcastId as number} />
    </MainLayout>
  );
};

export const Route = createLazyFileRoute("/podcast/$podcastId")({
  component: Podcast,
});
