import { PodcastEpisode } from "@definitions/index";
import { signal } from "@preact/signals-react";

interface PodcastSignalInterface {
  results: PodcastEpisode[];
  resultCount: number;
}

const initialPodcastSignal: PodcastSignalInterface = {
  results: [],
  resultCount: 0,
};

export const podcasts = signal<PodcastSignalInterface>(initialPodcastSignal);
