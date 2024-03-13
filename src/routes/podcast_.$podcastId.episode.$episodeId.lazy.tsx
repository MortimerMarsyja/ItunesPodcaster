import { createLazyFileRoute, getRouteApi } from "@tanstack/react-router";
import EpisodeDetail from "@views/episodeDetail";
import MainLayout from "@layouts/mainLayout";

const routeApi = getRouteApi("/podcasts/$podcastId/episode/$episodeId");

const Episode = () => {
  const routeParams = routeApi.useParams<{
    podcastId: string;
    episodeId: string;
  }>();
  const { episodeId, podcastId } = routeParams;
  return (
    <MainLayout>
      <EpisodeDetail episodeId={episodeId} podcastId={podcastId} />
    </MainLayout>
  );
};

// query param id
export const Route = createLazyFileRoute(
  "/podcast/$podcastId/episode/$episodeId"
)({
  component: Episode,
});
