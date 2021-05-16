import { green, red, yellow } from '@material-ui/core/colors';
import { PRIMARY } from '../../configs/colors';
import { some } from '../common/constants';

export const getStatus = (request: some) => {
  const { accept, cancel, confirm } = request;
  if (accept) {
    return { id: 'requestStatus.accept', color: green[500] };
  }
  if (cancel) {
    return { id: 'requestStatus.cancel', color: red[500] };
  }
  if (confirm) {
    return { id: 'requestStatus.confirm', color: PRIMARY };
  }
  return { id: 'requestStatus.waiting', color: yellow[500] };
};

export const textOveflowEllipsis = (text: string) => {
  if (text?.length > 50) {
    return `${text.slice(0, 50)}...`;
  }
  return text;
};
