export interface ILogin {
  id: string;
  password: string;
}

export interface ISignUp {
  id: string;
  password: string;
  confirmPassword: string;
  familyName: string;
  givenName: string;
  otp: string;
}

export interface ISignUpValidation {
  id: boolean;
  password: boolean;
  confirmPassword: boolean;
  familyName: boolean;
  givenName: boolean;
}

export const defaultLoginData: ILogin = {
  id: "",
  password: "",
};

export const defaultSignUpData: ISignUp = {
  id: "",
  password: "",
  confirmPassword: "",
  familyName: "",
  givenName: "",
  otp: "",
};

export const validSignUpValidation: ISignUpValidation = {
  id: true,
  password: true,
  confirmPassword: true,
  familyName: true,
  givenName: true,
};
