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
