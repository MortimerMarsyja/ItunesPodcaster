import MainLayout from "@layouts/mainLayout";
import { createLazyFileRoute, getRouteApi } from "@tanstack/react-router";
import PodcastDetail from "@views/podcastDetail";
import { Suspense } from "react";

const routeApi = getRouteApi("/podcast/$podcastId");

const Podcast = () => {
  const routeParams = routeApi.useParams();
  const { podcastId } = routeParams;
  return (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <PodcastDetail podcastId={podcastId} />
      </Suspense>
    </MainLayout>
  );
};

export const Route = createLazyFileRoute("/podcast/$podcastId")({
  component: Podcast,
});
