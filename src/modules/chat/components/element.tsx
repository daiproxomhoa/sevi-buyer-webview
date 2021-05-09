import { TextField, Theme } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { BACKGROUND } from '../../../configs/colors';
import styled from '@emotion/styled';

export const TextInput = withStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    '& .MuiOutlinedInput-input': {
      padding: '12px 16px',
      backgroundColor: BACKGROUND,
      fontSize: theme.typography.body2.fontSize,
    },
    '& .MuiOutlinedInput-multiline': {
      borderRadius: 18,
      padding: 0,
    },
  },
}))(TextField);

export const AnchorDiv = styled.div`
  top: 0;
  position: sticky;
  position: -webkit-sticky;
  z-index: 100;
`;
