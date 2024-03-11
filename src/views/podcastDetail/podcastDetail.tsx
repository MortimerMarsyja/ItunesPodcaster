import Podcard from "@components/podcard/podcard";
import Table from "@components/table";
import { PodcastEpisode, PodcastResponse } from "@definitions/index";
import PodcastLayout from "@layouts/podcastLayout";
import { podcasts } from "@signals/podcastSignal";
import { episode } from "@signals/signalEpisode";
import { useNavigate } from "@tanstack/react-router";
import { fetcher } from "@utils/fetcher";
import useSWR from "swr";

// I am using Signal here differently than in the other view, because
// I want to show how powerful and flexible it is, also how much complexity it can remove from the view
// as you can see it eliminates the need to use any other state managers
// (I could use Redux or Zustand if needed but this is much cleaner and the test doesn't tells you to use them)
interface Props {
  podcastId: number;
}

type TableData = PodcastEpisode & { id: number };
const PodcastDetail = ({ podcastId }: Props) => {
  const url = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`;
  const { data, error, isLoading } = useSWR(url, fetcher);
  const navigate = useNavigate();
  if (!podcastId)
    navigate({
      to: "/",
    });
  podcasts.value = data;
  localStorage.setItem("podcastData", JSON.stringify(podcasts.value));

  // I store the values in cache in case the user refreshes the page
  // here it wouldn't matter however in the episodeDetail view it would
  const handleNavigate = (rowData: PodcastEpisode) => {
    const { trackId } = rowData;
    episode.value = rowData;
    localStorage.setItem("episodeData", JSON.stringify(rowData));
    navigate({
      to: "/podcast/$podcastId/episode/$episodeId",
      params: { podcastId: `${podcastId}`, episodeId: `${trackId}` },
    });
  };
  const results = podcasts.value as PodcastResponse;
  const collectionName =
    results?.results?.length > 0
      ? results?.results[0]?.collectionName
      : "no collection";
  const description =
    results?.results?.length > 0
      ? results?.results[1]?.description
      : "no description";
  const image =
    results?.results?.length > 0 ? results?.results[0]?.artworkUrl100 : "";
  const artist =
    results?.results?.length > 0
      ? results?.results[0]?.artistName
      : "unknown artist";
  return (
    <div className="flex gap-4">
      {isLoading && <div>Loading...</div>}
      {error && <div>Error {error}</div>}
      {!isLoading && podcasts.value && (
        <PodcastLayout
          leftSide={
            <Podcard
              collectionName={collectionName}
              description={description || "no description"}
              image={image}
              artist={artist}
            />
          }
          rightSide={
            <>
              <div className="text-start w-full shadow-md p-3 font-bold">
                Episodes: {results?.resultCount}
              </div>
              <div className="w-full shadow-md mt-3 flex justify-center p-3">
                <Table<TableData>
                  data={results?.results.map((podcast: PodcastEpisode) => ({
                    ...podcast,
                    id: podcast.trackId,
                  }))}
                  onRowClick={handleNavigate}
                  headers={[
                    {
                      id: "trackName",
                      key: "trackName",
                      label: "Title",
                    },
                    {
                      id: "releaseDate",
                      key: "releaseDate",
                      label: "Date",
                      render: (value) => new Date(value).toLocaleDateString(),
                    },
                    {
                      id: "trackTimeMillis",
                      key: "trackTimeMillis",
                      label: "Duration",
                      render: (value) => new Date(value).toLocaleTimeString(),
                    },
                  ]}
                />
              </div>
            </>
          }
        />
      )}
    </div>
  );
};

export default PodcastDetail;
