import { createFileRoute } from "@tanstack/react-router";
import MainLayout from "../layouts/mainLayout";
import PodCastList from "../views/podcastList";

const HomePage = () => {
  return (
    <MainLayout>
      <PodCastList />;
    </MainLayout>
  );
};

export const Route = createFileRoute("/")({
  validateSearch: () => true,
  component: HomePage,
});
