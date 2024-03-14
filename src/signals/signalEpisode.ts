import { Episode } from "@definitions/index";
import { signal } from "@preact/signals-react";

const episodeInitialState = {
  artworkUrl60: "",
  trackViewUrl: "",
  episodeContentType: "",
  episodeUrl: "",
  feedUrl: "",
  closedCaptioning: "",
  collectionId: 0,
  collectionName: "",
  artworkUrl160: "",
  genres: [
    {
      name: "",
      id: "0",
    },
  ],
  episodeGuid: "",
  description: "",
  releaseDate: new Date(),
  episodeFileExtension: "",
  artistIds: [],
  shortDescription: "",
  country: "",
  previewUrl: "",
  collectionViewUrl: "",
  trackTimeMillis: 0,
  artworkUrl600: "",
  kind: "",
  wrapperType: "",
  trackId: 0,
  trackName: "",
  id: 0,
};
export const episode = signal<Episode>(episodeInitialState);
