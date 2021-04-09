import { some } from "./../common/constants";
export interface ISearchRecent {
  searchPopular: string[];
  searchRecent: string[];
}

export interface IPricedItem {
  name: string;
  minPrice: number;
  maxPrice: number;
  unit: string;
}

export interface ICertificate {}

export interface ISeller {
  id: string;
  avatar: number;
  familyName: string;
  givenName: string;
  sellerType: string;
  product: string;
  productEn: string;
  desc: string;
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
  idDocStamp: number;
  headId: string;
  point: number;
  items: IPricedItem[];
  reviews: some[];
  certificates: some[];
}

export interface ISellerSearchFilter {
  en: boolean;
  string: string;
  sortBy: string;
  offset: number;
  radius: number;
  lat: number;
  lng: number;
  searched: boolean;
  page: number;
}

export const defaultSearchFilter: ISellerSearchFilter = {
  en: false,
  string: "",
  sortBy: "quality",
  radius: 5,
  lat: 21.019779,
  lng: 105.849649,
  offset: 0,
  searched: false,
  page: 0,
};
