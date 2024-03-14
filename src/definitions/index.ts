export interface ImgInfo {
  alt: string;
  url: string;
}
export interface Genre {
  name: string;
  id: string;
}

export type Episode = {
  artistIds: string[];
  artworkUrl160: string;
  artworkUrl60: string;
  artworkUrl600: string;
  closedCaptioning: string;
  collectionId: number;
  collectionName: string;
  collectionViewUrl: string;
  contentAdvisoryRating?: string;
  country: string;
  description: string;
  episodeContentType: string;
  episodeFileExtension: string;
  episodeGuid: string;
  episodeUrl: string;
  feedUrl: string;
  genres: Genre[];
  kind: string;
  previewUrl: string;
  releaseDate: Date;
  shortDescription: string;
  trackId: number;
  trackName: string;
  trackTimeMillis: number;
  trackViewUrl: string;
  wrapperType: string;
};

export type PodcastData = {
  artistName: string;
  artworkUrl100: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl600: string;
  collectionCensoredName: string;
  collectionExplicitness: string;
  collectionHdPrice: number;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  collectionViewUrl: string;
  country: string;
  currency: string;
  feedUrl: string;
  genreIds: string[];
  genres: string[];
  kind: string;
  primaryGenreName: string;
  releaseDate: Date;
  trackCensoredName: string;
  trackCount: number;
  trackExplicitness: string;
  trackId: number;
  trackName: string;
  trackPrice: number;
  trackTimeMillis: number;
  trackViewUrl: string;
  wrapperType: string;
};

export type PodcastResults = [PodcastData, ...Episode[]];

export interface PodcastResponse {
  resultCount: number;
  results: PodcastResults;
}

export interface IMPriceAttributes {
  amount: string;
  currency: string;
}

export interface IMPrice {
  label: string;
  attributes: IMPriceAttributes;
}

export interface Icon {
  label: string;
}

export interface IMContentTypeAttributes {
  term: string;
  label: string;
}

export interface LinkAttributes {
  rel: string;
  type?: string;
  href: string;
}

export interface IMArtist {
  label: string;
}

export type Entries = {
  "im:name": {
    label: string;
  };
  "im:image": ImgInfo[];
  summary: Icon;
  "im:price": IMPrice;
  "im:contentType": {
    attributes: IMContentTypeAttributes;
  };
  rights?: Icon;
  title: Icon;
  link: {
    attributes: LinkAttributes;
  };
  id: {
    label: string;
    attributes: {
      "im:id": string;
    };
  };
  "im:artist": IMArtist;
  category: {
    attributes: {
      "im:id": string;
      term: string;
      label: string;
    };
  };
  "im:releaseDate": {
    label: Date;
    attributes: Icon;
  };
};
