import { ISignUp } from "./model";

export function transformSignUpInfo(info: ISignUp) {
  const familyName = info.name.split(" ")[0];
  const givenName = info.name.split(familyName)[1];

  return {
    ...info,
    familyName,
    givenName,
  };
}
