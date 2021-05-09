import { Backdrop, Box, Chip, Dialog, IconButton, makeStyles } from '@material-ui/core';
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
  isOwn?: boolean;
}

const TextMsg = (props: Props) => {
  const { data, isOwn } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="pn-msg__bubble">{data.message.text}</div>
    </>
  );
};

export default TextMsg;
