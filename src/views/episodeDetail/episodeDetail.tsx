import Podcard from "@components/podcard/podcard";
import PodcastLayout from "@layouts/podcastLayout";
import { podcasts } from "@signals/podcastSignal";
import { episode } from "@signals/signalEpisode";
import { useNavigate } from "@tanstack/react-router";
import {
  getCachedPodcastInfoByKey,
  getEpisodeCachedDataByKey,
} from "@helpers/cachedFetchers";

interface Props {
  episodeId: string;
  podcastId: string;
}

const EpisodeDetail = ({ episodeId, podcastId }: Props) => {
  const episodeInStorage =
    localStorage.getItem("episodeData") !== null
      ? JSON.parse(localStorage.getItem("episodeData") as string)
      : undefined;
  const cachedPodcast =
    localStorage.getItem("podcastData") !== null
      ? JSON.parse(localStorage.getItem("podcastData") as string)
      : undefined;
  const navigate = useNavigate();
  if (!episodeId || !podcastId)
    navigate({
      to: "/",
    });
  const backToPodcasts = () => {
    navigate({
      to: `/podcast/${podcastId}`,
      params: { podcastId },
    });
  };
  const episodeData = episode.value;
  const results = podcasts.value;
  const collectionName = getCachedPodcastInfoByKey(
    cachedPodcast,
    results,
    "collectionName"
  );
  const image = getCachedPodcastInfoByKey(
    cachedPodcast,
    results,
    "artworkUrl100"
  );
  const artist = getCachedPodcastInfoByKey(
    cachedPodcast,
    results,
    "artistName"
  );
  const episodeShortDescription = getEpisodeCachedDataByKey(
    episodeInStorage,
    episodeData,
    "shortDescription"
  );
  const episodeTrackName = getEpisodeCachedDataByKey(
    episodeInStorage,
    episodeData,
    "trackName"
  );
  const episodeDescription = getEpisodeCachedDataByKey(
    episodeInStorage,
    episodeData,
    "description"
  );
  const episodeAudio = getEpisodeCachedDataByKey(
    episodeInStorage,
    episodeData,
    "episodeUrl"
  );
  return (
    <PodcastLayout
      leftSide={
        <Podcard
          collectionName={collectionName as string}
          description={episodeShortDescription as string}
          image={image as string}
          artist={artist as string}
          onClick={backToPodcasts}
        />
      }
      rightSide={
        <div className="shadow-md">
          <h2 className="font-bold p-3 text-start">
            {episodeTrackName as string}
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: episodeDescription || <p></p> }}
            className="text-start p-3 border-b-2 border-gray-100 "
          ></div>
          <audio
            className="w-full p-3 rounded-none"
            controls
            aria-disabled={episodeAudio === ""}
            src={episodeAudio as string}
          />
        </div>
      }
    />
  );
};

export default EpisodeDetail;
