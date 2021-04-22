import { Avatar, Box, IconButton } from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../configs/api';
import { SUCCESS_CODE } from '../../../constants';
import { AppState } from '../../../redux/reducer';
import { snackbarSetting } from '../../common/component/elements';
import { fetchThunk } from '../../common/redux/thunk';

interface Props {
  src?: number;
  id: number;
  onChange?: (avatar: string) => void;
}

const AvatarUpload = (props: Props) => {
  const { src, onChange, id } = props;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const intl = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const setAvatar = async (files: FileList | null) => {
    const formData = new FormData();
    if (files) {
      formData.append('data', files[0]);
    }
    const json = await dispatch(fetchThunk(API_PATHS.setAvatar, 'post', formData, undefined, 'multipart/form-data'));
    if (json.status === SUCCESS_CODE) {
      onChange && onChange(json.body?.avatar);
    } else {
      enqueueSnackbar(
        intl.formatMessage({ id: 'update_fail' }),
        snackbarSetting((key) => closeSnackbar(key), { variant: 'error' }),
      );
    }
  };
  return (
    <Box>
      <IconButton style={{ padding: 0 }} component="label">
        <Avatar src={API_PATHS.renderAvatar(id, src)} style={{ height: 100, width: 100 }} />
        <input
          accept="image/*"
          hidden
          type="file"
          onChange={(e) => {
            setAvatar(e.target.files);
          }}
        />
        <CameraAltIcon
          className={'svgFillAll'}
          style={{
            height: 16,
            width: 16,
            position: 'absolute',
            bottom: 4,
            fill: 'white',
          }}
        />
      </IconButton>
    </Box>
  );
};

export default AvatarUpload;
