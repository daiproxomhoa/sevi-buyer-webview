import { ISignUp, ISignUpValidation } from "./model";

export function transformSignUpInfo(info: ISignUp): ISignUp {
  const familyName = info.familyName.split(" ")[0];
  const givenName = info.familyName.split(familyName)[1];

  return {
    ...info,
    familyName,
    givenName,
  };
}

export function validateSignUpInfo(info: ISignUp): ISignUpValidation {
  return {
    id: info.id.length > 9,
    givenName: !!info.givenName.trim().length,
    familyName: !!info.givenName.trim().length,
    password: info.password.length >= 6,
    confirmPassword: info.password === info.confirmPassword,
  };
}

export function validSignUpInfo(validation: ISignUpValidation) {
  if (!validation.id) {
    return "errorMessage";
  } else if (!validation.password) {
    return "errorMessage";
  } else if (!validation.familyName) {
    return "errorMessage";
  } else if (!validation.givenName) {
    return "errorMessage";
  } else if (!validation.confirmPassword) {
    return "errorMessage";
  } else if (!validation.password) {
    return "errorMessage";
  }

  return "";
}

export function validOtp(info: ISignUp): string {
  return info.otp.length === 6 ? "" : "errorMessage";
}
