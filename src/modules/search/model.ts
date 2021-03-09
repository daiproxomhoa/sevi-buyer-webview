export interface ISearchRecent {
  searchPopular: string[];
  searchRecent: string[];
}

export interface ISearchResult {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  review: number;
  description: string;
}
