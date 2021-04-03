export interface ISearchRecent {
  searchPopular: string[];
  searchRecent: string[];
}

export interface ISeller {
  id: string;
  avatar: string;
  familyName: string;
  givenName: string;
  sellerType: string;
  product: string;
  productEn: string;
  dateOfBirth: string;
  signDate: string;
  verified: true;
  rating: number;
  ratingCount: number;
  priceRating: number;
  priceRatingCount: number;
  qualityRating: number;
  qualityRatingCount: number;
  attitudeRating: number;
  attitudeRatingCount: number;
  suspend: string;
  docId: string;
  docType: string;
  headId: string;
  point: number;
}

export interface ISellerSearchParams {
  en: boolean;
  string: string;
  sortBy: string;
  offset: number;
  radius: number;
  lat: number;
  lng: number;
}
