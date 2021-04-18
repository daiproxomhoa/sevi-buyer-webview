import { ISeller } from "./../search/model";

export interface IRequest {
  accept: boolean;
  buyer: null;
  buyerId: string;
  cancel: boolean;
  confirm: boolean;
  createDate: string;
  date: string;
  deferRatingTo: string;
  desc: string;
  seller: ISeller;
  sellerId: string;
  sessionStamp: number;
  time: string;
}

export interface IAccept extends IRequest {}
export interface ICreateRequest {
  sellerId: string;
  sessionStamp: number;
  desc: string;
  location: string;
  date: string;
  time: string;
}

export interface ICreateRequestForm {
  desc: string;
  location: string;
  date: string;
  time: string;
}

export interface ICreateRequestResult {
  result: string;
  reqDate: string;
  remaining: number;
}

export interface IGetRequestParams {
  accept: boolean;
  offset: number;
  ratedFilter: "rated" | " unrated";
}
