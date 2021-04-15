export interface IRequestTime {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}

export interface ICreateRequest {
  sellerId: string;
  sessionStamp: number;
  desc: string;
  location: string;
  date: string;
  time: IRequestTime;
}

export interface ICreateRequestForm {
  desc: string;
  location: string;
  date: string;
  time: string;
}
