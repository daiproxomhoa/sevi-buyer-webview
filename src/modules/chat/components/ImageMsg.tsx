import { Backdrop, Box, Dialog, IconButton, makeStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import Close from '@material-ui/icons/Close';
import { usePubNub } from 'pubnub-react';
import React, { useState } from 'react';
import { BLACK } from '../../../configs/colors';
import { Message } from '../lib/types';

const useStyles = makeStyles((theme) => ({
  closeBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  frame: {
    cursor: 'pointer',
    minHeight: 100,
  },
  image: {
    borderRadius: 12,
    maxWidth: 205,
    width: '100%',
  },
  dialog: {
    background: BLACK,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageDialog: {
    width: '100%',
    maxHeight: 'calc(100%-64px)',
  },
}));
interface Props {
  data: Message;
}

const ImageMsg = (props: Props) => {
  const { data } = props;
  const classes = useStyles();
  const pubnub = usePubNub();
  const [open, setOpen] = useState(false);

  const url = pubnub.getFileUrl({
    channel: data.channel || '',
    id: data?.message?.file?.id,
    name: data?.message?.file?.name,
  });

  return (
    <>
      <Box className={classes.frame} onClick={() => setOpen(true)}>
        <img alt="image_chat" src={url} className={classes.image} />
      </Box>
      <Dialog
        open={open}
        fullScreen
        PaperProps={{
          className: classes.dialog,
        }}
      >
        <IconButton onClick={() => setOpen(false)} className={classes.closeBtn}>
          <Close style={{ color: 'white' }} />
        </IconButton>
        <img alt="image_chat" src={url} className={classes.imageDialog} />
      </Dialog>
    </>
  );
};

export default ImageMsg;
