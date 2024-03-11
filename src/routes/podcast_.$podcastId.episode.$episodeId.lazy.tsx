import { createLazyFileRoute, getRouteApi } from "@tanstack/react-router";
import EpisodeDetail from "@views/episodeDetail";
import MainLayout from "@layouts/mainLayout";

const routeApi = getRouteApi("/podcasts/$podcastId/episode/$episodeId");

const Episode = () => {
  const routeParams = routeApi.useParams();
  const { episodeId, podcastId } = routeParams;
  return (
    <MainLayout>
      <EpisodeDetail
        episodeId={episodeId as number}
        podcastId={podcastId as number}
      />
    </MainLayout>
  );
};

// query param id
export const Route = createLazyFileRoute(
  "/podcast/$podcastId/episode/$episodeId"
)({
  component: Episode,
});
