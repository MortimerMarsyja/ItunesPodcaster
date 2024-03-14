import Podcard from "@components/podcard/podcard";
import Table from "@components/table";
import fetcher from "@helpers/fetcher";
import { Episode, PodcastData } from "src/definitions/index";
import PodcastLayout from "@layouts/podcastLayout";
import { podcasts } from "@signals/podcastSignal";
import { episode } from "@signals/signalEpisode";
import { useNavigate } from "@tanstack/react-router";
import useSWR from "swr";
import { useEffect, useState } from "react";

interface Props {
  podcastId: string;
}

type TableData = Episode & { id: number };

const getDesc = async (
  podcastData: PodcastData,
  setter: (desc: string) => void
) => {
  fetch(podcastData.feedUrl)
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

  const navigate = useNavigate();
  if (!podcastId)
    navigate({
      to: "/",
    });
  podcasts.value = JSON.parse(data?.contents);

  const handleNavigate = (rowData: Episode) => {
    const { trackId } = rowData;
    episode.value = rowData;
    localStorage.setItem("episodeData", JSON.stringify(rowData));
    navigate({
      to: "/podcast/$podcastId/episode/$episodeId",
      params: { podcastId: `${podcastId}`, episodeId: `${trackId}` },
    });
  };

  const [podcastData, ...podcastList] = podcasts.value.results;
  const podcastLength = podcasts.value.resultCount;

  useEffect(() => {
    if (podcastData) {
      getDesc(podcastData, setDescription);
    }
  }, [podcastData]);

  return (
    <div className="flex gap-4">
      {error && <div>Error {error}</div>}
      {podcastLength > 0 && !error && (
        <PodcastLayout
          leftSide={
            <Podcard
              collectionName={podcastData.collectionName}
              description={description}
              image={podcastData.artworkUrl100}
              artist={podcastData.artistName}
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
                    data={podcastList.map((podcast: Episode) => ({
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
                        render: (value) => {
                          const date = `${value}`;
                          return date && new Date(date).toLocaleDateString();
                        },
                      },
                      {
                        id: "trackTimeMillis",
                        key: "trackTimeMillis",
                        label: "Duration",
                        render: (value) => {
                          const date = value as number;
                          return date && new Date(date).toLocaleTimeString();
                        },
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
