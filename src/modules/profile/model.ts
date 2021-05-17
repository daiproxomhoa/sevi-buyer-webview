export interface IAddress {
  lat: number;
  lng: number;
  formattedAddress: string;
}

export interface IAddresses {
  name: string;
  address: IAddress;
}

export interface IProfile {
  avatar: number;
  dateOfBirth: string;
  familyName: string;
  givenName: string;
  id: string;
  signDate: string;
  addresses: IAddresses[];
}

export const defaultAddress: IAddresses = {
  name: '',
  address: {
    lat: 0,
    lng: 0,
    formattedAddress: '',
  },
};
