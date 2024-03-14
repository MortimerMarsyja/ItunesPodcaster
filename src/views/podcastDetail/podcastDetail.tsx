import Podcard from "@components/podcard/podcard";
import Table from "@components/table";
import { PodcastEpisode } from "src/definitions/index";
import PodcastLayout from "@layouts/podcastLayout";
import { podcasts } from "@signals/podcastSignal";
import { episode } from "@signals/signalEpisode";
import { useNavigate } from "@tanstack/react-router";
import { fetcher } from "@utils/fetcher";
import useSWR from "swr";
import { useEffect, useState } from "react";

// I am using Signal here differently than in the other view, because
// I want to show how powerful and flexible it is, also how much complexity it can remove from the view
// as you can see it eliminates the need to use any other state managers
// (I could use Redux or Zustand if needed but this is much cleaner and the test doesn't tells you to use them)
interface Props {
  podcastId: string;
}

type TableData = PodcastEpisode & { id: number };

const getDesc = async (
  podcastList: PodcastEpisode[],
  setter: (desc: string) => void
) => {
  fetch(podcastList[0].feedUrl)
    .then((response) => {
      if (response.status === 200) {
        return response.text();
      } else {
        throw new Error("Request failed");
      }
    })
    .then((data) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");
      const description =
        xmlDoc.getElementsByTagName("description")[0].textContent;
      setter(description || "");
    })
    .catch((error) => {
      console.error(error);
    });
};

const PodcastDetail = ({ podcastId }: Props) => {
  const [description, setDescription] = useState<string>("");
  const url = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`;
  const urlWithoutCors = `https://api.allorigins.win/get?charset=UTF-8&url=${encodeURIComponent(url)}`;

  const { data, error } = useSWR(urlWithoutCors, fetcher, {
    suspense: true,
  });

  // const parsedData = data && JSON.parse(data.contents);
  const navigate = useNavigate();
  if (!podcastId)
    navigate({
      to: "/",
    });
  podcasts.value = JSON.parse(data?.contents);
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

  const [podcastDescription, ...podcastList] = podcasts.value.results;
  const podcastLength = podcasts.value.resultCount;

  useEffect(() => {
    if (podcastList) {
      getDesc(podcastList, setDescription);
    }
  }, [podcastList]);

  return (
    <div className="flex gap-4">
      {error && <div>Error {error}</div>}
      {podcastLength > 0 && !error && (
        <PodcastLayout
          leftSide={
            <Podcard
              collectionName={podcastDescription.collectionName}
              description={description}
              image={podcastDescription.artworkUrl100}
              artist={podcastDescription.artistName}
            />
          }
          rightSide={
            <>
              <div className="text-start w-full shadow-md p-3 font-bold">
                Episodes: {podcastLength || 0}
              </div>
              {podcastList && podcastLength > 0 && (
                <div className="w-full shadow-md mt-3 flex justify-center p-3">
                  <Table<TableData>
                    data={podcastList.map((podcast: PodcastEpisode) => ({
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
                        render: (value) =>
                          value && new Date(value).toLocaleDateString(),
                      },
                      {
                        id: "trackTimeMillis",
                        key: "trackTimeMillis",
                        label: "Duration",
                        render: (value) =>
                          value && new Date(value).toLocaleTimeString(),
                      },
                    ]}
                  />
                </div>
              )}
            </>
          }
        />
      )}
    </div>
  );
};

export default PodcastDetail;
