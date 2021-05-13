import { Box, IconButton } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { useAtom } from 'jotai';
import { usePubNub } from 'pubnub-react';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { TextInput } from '../../components/element';
import { CurrentChannelAtom, ErrorFunctionAtom, TypingIndicatorTimeoutAtom, UsersMetaAtom } from '../state-atoms';

export interface MessageInputProps {
  /** Set a draft message to display in the text window. */
  senderInfo?: boolean;
  /** Enable/disable firing the typing events when user is typing a message. */
  typingIndicator?: boolean;
}

export const MessageInput: FC<MessageInputProps> = (props: MessageInputProps) => {
  const pubnub = usePubNub();
  const intl = useIntl();
  const [users] = useAtom(UsersMetaAtom);
  const [channel] = useAtom(CurrentChannelAtom);
  const [onErrorObj] = useAtom(ErrorFunctionAtom);
  const [typingIndicatorSent, setTypingIndicatorSent] = useState(false);
  const [typingIndicatorTimeout] = useAtom(TypingIndicatorTimeoutAtom);
  const onError = onErrorObj.function;
  const inputRef = useRef<any>();

  const { handleSubmit, control, reset } = useForm({
    mode: 'onSubmit',
  });

  /*
  /* Helper functions
  */

  /*
  /* Commands
  */

  const sendMessage = async (text: any) => {
    try {
      if (!text) return;
      if (typeof text === 'string') {
        const message = {
          type: 'text',
          text,
          ...(props.senderInfo && { sender: users.find((u) => u.id === pubnub.getUUID()) }),
        };
        await pubnub.publish({ channel, message });
      }
    } catch (e) {
      onError(e);
    }
  };

  const sendImage = async (files: FileList | null) => {
    const file = files?.[0];

    if (file) {
      await pubnub.sendFile({
        channel,
        file,
      });
    } else {
      window.alert('dmdmdm');
    }
  };

  const stopTypingIndicator = async () => {
    if (!typingIndicatorSent) return;
    try {
      setTypingIndicatorSent(false);
      const message = { message: { type: 'typing_off' }, channel };
      pubnub.signal(message);
    } catch (e) {
      onError(e);
    }
  };

  const startTypingIndicator = async () => {
    if (typingIndicatorSent) return;
    try {
      setTypingIndicatorSent(true);
      const message = { message: { type: 'typing_on' }, channel };
      pubnub.signal(message);
    } catch (e) {
      onError(e);
    }
  };

  const handleInputChange = (event) => {
    try {
      const textArea = event.target;
      const newText = textArea.value;
      if (props.typingIndicator && newText.length) startTypingIndicator();
      if (props.typingIndicator && !newText.length) stopTypingIndicator();
    } catch (e) {
      onError(e);
    }
  };

  useEffect(() => {
    let timer: any = null;

    if (typingIndicatorSent) {
      timer = setTimeout(() => {
        setTypingIndicatorSent(false);
      }, (typingIndicatorTimeout - 1) * 1000);
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typingIndicatorSent]);

  return (
    <Box
      display="flex"
      alignItems="center"
      component="form"
      onSubmit={handleSubmit((value) => {
        sendMessage(value.text);
        reset({ text: '' });
        inputRef.current?.focus();
      })}
    >
      <IconButton component="label">
        <ImageIcon color="primary" />
        <input
          accept="image/*"
          hidden
          type="file"
          onChange={(e) => {
            sendImage(e.target.files);
          }}
        />
      </IconButton>
      <Controller
        name={'text'}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value, ref } }) => {
          return (
            <TextInput
              placeholder={intl.formatMessage({ id: 'chat.sendPlaceholder' })}
              fullWidth
              value={value}
              onChange={(e) => {
                handleInputChange(e);
                onChange(e);
              }}
              multiline={true}
              rowsMax={5}
              variant="outlined"
              inputRef={inputRef}
            />
          );
        }}
      />
      <IconButton type="submit">
        <SendRoundedIcon color="primary" />
      </IconButton>
    </Box>
  );
};

MessageInput.defaultProps = {
  senderInfo: false,
  typingIndicator: false,
};
