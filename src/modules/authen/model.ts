export interface ILogin {
  id: string;
  password: string;
}

export interface ISignUp {
  id: string;
  password: string;
  confirmPassword: string;
  name: string;
  otp: string;
}

export const defaultLoginData: ILogin = {
  id: "",
  password: "",
};

export const defaultSignUpData: ISignUp = {
  id: "",
  password: "",
  confirmPassword: "",
  name: "",
  otp: "",
};
