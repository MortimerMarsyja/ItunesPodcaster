export interface ImgInfo {
  alt: string;
  url: string;
}

export interface Podcast {
  "im:name": { label: string };
  "im:image": { label: string }[];
  "im:artist": { label: string };
  id: { attributes: { "im:id": string } };
}

export type Entries = Podcast[];

export interface Episode {
  country: string;
  artworkUrl600: string;
  episodeUrl: string;
  collectionViewUrl: string;
  trackViewUrl: string;
  artworkUrl60: string;
  trackTimeMillis: number;
  contentAdvisoryRating: string;
  closedCaptioning: string;
  collectionId: number;
  collectionName: string;
  genres: Genre[];
  episodeGuid: string;
  description: string;
  shortDescription: string;
  releaseDate: string;
  artistIds: any[];
  artworkUrl160: string;
  episodeFileExtension: string;
  episodeContentType: string;
  trackId: number;
  trackName: string;
  feedUrl: string;
  previewUrl: string;
  kind: string;
  wrapperType: string;
}

export interface Genre {
  name: string;
  id: string;
}

export interface PodcastEpisode {
  description?: string;
  wrapperType: string;
  kind: string;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  collectionViewUrl: string;
  feedUrl: string;
  trackViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  trackPrice: number;
  trackRentalPrice: number;
  collectionHdPrice: number;
  trackHdPrice: number;
  trackHdRentalPrice: number;
  releaseDate: string;
  collectionExplicitness: string;
  trackExplicitness: string;
  trackCount: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating: string;
  artworkUrl600: string;
  genreIds: string[];
  genres: string[];
}

export interface PodcastResponse {
  resultCount: number;
  results: PodcastEpisode[];
}