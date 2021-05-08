import { Avatar, Box, ButtonBase, IconButton, makeStyles, Popover, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { API_PATHS } from '../../../configs/api';
import { GREY_300 } from '../../../configs/colors';
import { ReactComponent as IconDotList } from '../../../svg/ic_dot_list.svg';
import Header from '../../common/component/Header';
import { some } from '../../common/constants';
import { getFullName } from '../../rating/utils';

const useStyles = makeStyles(() => ({
  item: {
    minWidth: 190,
    justifyContent: 'flex-start',
    borderBottom: `1px solid ${GREY_300}`,
    padding: '8px 12px',
    width: '100%',
  },
  header: {
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
}));
interface Props {
  action?: () => void;
  sellerData: some;
}

const ChatHeader = (props: Props) => {
  const { action, sellerData } = props;
  console.log('sellerData', sellerData);

  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Header
        title={
          <Box display="flex">
            <Avatar
              src={API_PATHS.renderSellerAvatar(sellerData.seller.id, sellerData.seller.avatar)}
              style={{ marginRight: 12 }}
            />
            {getFullName(sellerData.seller)}
          </Box>
        }
        endAdornment={
          <IconButton
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
          >
            <IconDotList style={{ height: 14 }} />
          </IconButton>
        }
        action={action}
        appBarProps={{ className: classes.header, elevation: 1 }}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        elevation={1}
      >
        <Box className="d-flex d-flex-column">
          <ButtonBase className={classes.item}>
            <Typography variant="body1">
              <FormattedMessage id="chat.complain" />
            </Typography>
          </ButtonBase>
          <ButtonBase className={classes.item}>
            <Typography variant="body1">
              <FormattedMessage id="chat.cancelRequest" />
            </Typography>
          </ButtonBase>
          <ButtonBase className={classes.item}>
            <Typography variant="body1">
              <FormattedMessage id="chat.deleteConversation" />
            </Typography>
          </ButtonBase>
          <ButtonBase className={classes.item}>
            <Typography variant="body1">
              <FormattedMessage id="chat.block" />
            </Typography>
          </ButtonBase>
        </Box>
      </Popover>
    </>
  );
};

export default ChatHeader;
