import Podcard from "@components/podcard/podcard";
import { Episode, PodcastResponse } from "@definitions/index";
import PodcastLayout from "@layouts/podcastLayout";
import { podcasts } from "@signals/podcastSignal";
import { episode } from "@signals/signalEpisode";
import { useNavigate } from "@tanstack/react-router";
import {
  getCachedEpisodeDescription,
  getCachedEpisodeTrackName,
  getCachedEpisodeShortDescription,
  getCachedEpisodeAudio,
  getCachedPodcastCollectionName,
  getCachedPodcastImage,
  getCachedPodcastArtist,
} from "@utils/cachedFetchers";

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
  const episodeData = episode.value as Episode;
  const results = podcasts.value as PodcastResponse;
  const collectionName = getCachedPodcastCollectionName(cachedPodcast, results);
  const image = getCachedPodcastImage(cachedPodcast, results);
  const artist = getCachedPodcastArtist(cachedPodcast, results);
  const episodeShortDescription = getCachedEpisodeShortDescription(
    episodeInStorage,
    episodeData
  );
  const episodeTrackName = getCachedEpisodeTrackName(
    episodeInStorage,
    episodeData
  );
  const episodeDescription = getCachedEpisodeDescription(
    episodeInStorage,
    episodeData
  );
  const episodeAudio = getCachedEpisodeAudio(episodeInStorage, episodeData);
  return (
    <PodcastLayout
      leftSide={
        <Podcard
          collectionName={collectionName}
          description={episodeShortDescription}
          image={image}
          artist={artist}
          onClick={backToPodcasts}
        />
      }
      rightSide={
        <div className="shadow-md">
          <h2 className="font-bold p-3 text-start">{episodeTrackName}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: episodeDescription }}
            className="text-start p-3 border-b-2 border-gray-100 "
          ></div>
          {/* the audio element will be provided by the browser so it might not look like the one in the image provided */}
          <audio
            className="w-full p-3 rounded-none"
            controls
            aria-disabled={episodeAudio === ""}
            src={episodeAudio}
          />
        </div>
      }
    />
  );
};

export default EpisodeDetail;
