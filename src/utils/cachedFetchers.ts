import { Episode, PodcastResponse } from "src/definitions/index";

export const getCachedPodcastCollectionName = (
  cachedPodcast: PodcastResponse | undefined,
  results: PodcastResponse | undefined
) => {
  if (
    !results?.results?.length ||
    (results?.results?.length === 0 &&
      cachedPodcast?.results[0]?.collectionName)
  ) {
    return cachedPodcast?.results[0]?.collectionName || "no collection";
  }
  if (results?.results[0]?.collectionName)
    return results?.results[0]?.collectionName;
  return "no collection";
};

export const getCachedPodcastDescription = (
  cachedPodcast: PodcastResponse | undefined,
  results: PodcastResponse | undefined
) => {
  if (
    !results?.results?.length ||
    (results?.results.length === 0 && cachedPodcast?.results[1]?.description)
  ) {
    return cachedPodcast?.results[1]?.description;
  }
  if (results?.results[1]?.description) return results?.results[1]?.description;
  return "no description";
};

export const getCachedPodcastImage = (
  cachedPodcast: PodcastResponse | undefined,
  results: PodcastResponse | undefined
) => {
  if (
    !results?.results?.length ||
    (results?.results.length === 0 && cachedPodcast?.results[0]?.artworkUrl100)
  ) {
    return cachedPodcast?.results[0]?.artworkUrl100;
  }
  if (results?.results[0]?.artworkUrl100)
    return results?.results[0]?.artworkUrl100;
  return "";
};

export const getCachedPodcastArtist = (
  cachedPodcast: PodcastResponse | undefined,
  results: PodcastResponse | undefined
) => {
  if (
    !results?.results?.length ||
    (results?.results?.length === 0 && cachedPodcast?.results[0]?.artistName)
  ) {
    return cachedPodcast?.results[0]?.artistName;
  }
  if (results?.results[0]?.artistName) return results?.results[0]?.artistName;
  return "unknown artist";
};

export const getEpisodeShortDescription = (
  episodeInStorage: Episode | undefined,
  episodeData: Episode | undefined
) => {
  if (episodeInStorage?.shortDescription)
    return episodeInStorage?.shortDescription;
  if (episodeData?.shortDescription) return episodeData?.shortDescription;
  return "no description";
};

export const getCachedEpisodeTrackName = (
  episodeInStorage: Episode | undefined,
  episodeData: Episode | undefined
) => {
  if (episodeInStorage?.trackName) return episodeInStorage?.trackName;
  if (episodeData?.trackName) return episodeData?.trackName;
  return "Error 404";
};

export const getCachedEpisodeShortDescription = (
  episodeInStorage: Episode | undefined,
  episodeData: Episode | undefined
) => {
  if (episodeInStorage?.description) return episodeInStorage?.description;
  if (episodeData?.description) return episodeData?.description;
  return "no description";
};

export const getCachedEpisodeAudio = (
  episodeInStorage: Episode | undefined,
  episodeData: Episode | undefined
) => {
  if (episodeInStorage?.episodeUrl) return episodeInStorage?.episodeUrl;
  if (episodeData?.episodeUrl) return episodeData?.episodeUrl;
  return "";
};

export const getCachedEpisodeDescription = (
  episodeInStorage: Episode | undefined,
  episodeData: Episode | undefined
) => {
  if (episodeInStorage?.description) return episodeInStorage?.description;
  if (episodeData?.description) return episodeData?.description;
  return "no description";
};
