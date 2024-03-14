import { Episode, PodcastData, PodcastResponse } from "src/definitions/index";

const getFallbackData = (key: keyof Episode | keyof PodcastData) => {
  switch (key) {
    case "description":
      return "No description available";
    case "trackName":
      return "No track name available";
    case "shortDescription":
      return "No short description available";
    case "collectionName":
      return "No collection name available";
    case "artworkUrl100":
      return "";
    case "artistName":
      return "No artist available";
    default:
      return "";
  }
};

export const getCachedPodcastInfoByKey = (
  cachedPodcast: PodcastData | undefined,
  results: PodcastResponse,
  key: keyof PodcastData
) => {
  if (results) {
    const podcastData = results.results;
    return podcastData[0][key];
  }
  if (cachedPodcast) {
    return cachedPodcast[key];
  }
  return getFallbackData(key);
};

export const getEpisodeCachedDataByKey = (
  episodeInStorage: Episode | undefined,
  episodeData: Episode,
  key: keyof Episode
) => {
  if (episodeInStorage) {
    if (key in episodeInStorage) {
      const episodeKey = key as keyof Episode;
      return episodeInStorage[episodeKey];
    }
    return getFallbackData(key);
  }
  if (key in episodeData) {
    const episodeKey = key as keyof Episode;
    return episodeData[episodeKey];
  }
  return getFallbackData(key);
};
