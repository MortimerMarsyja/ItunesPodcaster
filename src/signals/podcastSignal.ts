import { PodcastResponse } from "@definitions/index";
import { signal } from "@preact/signals-react";

const initialPodcastSignal: PodcastResponse = {
  resultCount: 0,
  results: [
    {
      artistName: "",
      artworkUrl100: "",
      artworkUrl30: "",
      artworkUrl60: "",
      artworkUrl600: "",
      collectionCensoredName: "",
      collectionExplicitness: "",
      collectionHdPrice: 0,
      collectionId: 0,
      collectionName: "",
      collectionPrice: 0,
      collectionViewUrl: "",
      country: "",
      currency: "",
      feedUrl: "",
      genreIds: [],
      genres: [],
      kind: "",
      primaryGenreName: "",
      releaseDate: new Date(),
      trackCensoredName: "",
      trackCount: 0,
      trackExplicitness: "",
      trackId: 0,
      trackName: "",
      trackPrice: 0,
      trackTimeMillis: 0,
      trackViewUrl: "",
      wrapperType: "",
    },
  ],
};

export const podcasts = signal<PodcastResponse>(initialPodcastSignal);
