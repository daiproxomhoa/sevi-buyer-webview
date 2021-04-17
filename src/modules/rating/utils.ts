import { some } from "../common/constants";

export const getFullName = (data: some) => {
  return `${data.familyName} ${data.givenName}`;
};
