import { ISignUp } from './model';

export function transformSignUpInfo(info: ISignUp) {
  return {
    ...info,
  };
}
