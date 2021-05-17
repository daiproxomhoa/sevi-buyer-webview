import { Box, Fade, IconButton } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { useAtom } from 'jotai';
import { usePubNub } from 'pubnub-react';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { setLoadingBackDrop } from '../../../common/redux/commonReducer';
import { TextInput } from '../../components/element';
import {
  CurrentChannelAtom,
  ErrorFunctionAtom,
  MessagesAtom,
  TypingIndicatorTimeoutAtom,
  UsersMetaAtom,
} from '../state-atoms';
import ArrowDropDownCircleRoundedIcon from '@material-ui/icons/ArrowDropDownCircleRounded';
import { cloneDeep } from 'lodash';

export interface MessageInputProps {
  /** Set a draft message to display in the text window. */
  senderInfo?: boolean;
  /** Enable/disable firing the typing events when user is typing a message. */
  typingIndicator?: boolean;
  endScreenRef?: React.RefObject<HTMLDivElement>;
}

export const MessageInput: FC<MessageInputProps> = (props: MessageInputProps) => {
  const { typingIndicator, senderInfo, endScreenRef } = props;
  const pubnub = usePubNub();
  const intl = useIntl();
  const [users] = useAtom(UsersMetaAtom);
  const [channel] = useAtom(CurrentChannelAtom);
  const [onErrorObj] = useAtom(ErrorFunctionAtom);
  const [typingIndicatorSent, setTypingIndicatorSent] = useState(false);
  const [typingIndicatorTimeout] = useAtom(TypingIndicatorTimeoutAtom);
  const onError = onErrorObj.function;
  const inputRef = useRef<any>();
  const [, setMessages] = useAtom(MessagesAtom);

  const dispatch = useDispatch();

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
          ...(senderInfo && { sender: users.find((u) => u.id === pubnub.getUUID()) }),
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
      dispatch(setLoadingBackDrop(true));
      try {
        await pubnub
          .sendFile({
            channel,
            file,
          })
          .then((val: any) => {
            if (val) {
              setMessages((messages) => {
                const messagesClone = cloneDeep(messages) || {};
                messagesClone[channel!] = messagesClone[channel!] || [];
                messagesClone[channel!].push({
                  channel,
                  timetoken: val.timetoken,
                  messageType: 4,
                  uuid: pubnub.getUUID(),
                  message: {
                    type: '',
                    text: '',
                    file: { id: val.id, name: val.name },
                  },
                });
                return messagesClone;
              });
            }
          });
      } finally {
        dispatch(setLoadingBackDrop(false));
        scrollToBottom();
      }
    } else {
      window.alert('No file has selected');
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
      if (typingIndicator && newText.length) startTypingIndicator();
      if (typingIndicator && !newText.length) stopTypingIndicator();
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

  const [tickTock, setTickTock] = useState(false);
  const [autoFocus, setAutoFocus] = useState(false);
  const [showBtnScollBottom, setShowBtnScollBottom] = useState(false);

  const scrollToBottom = () => {
    if (!endScreenRef?.current || !inputRef?.current) return;
    endScreenRef?.current.scrollIntoView();
    inputRef?.current.focus();
  };

  const showScrollBottomBtn = useCallback(() => {
    const elemRect = endScreenRef?.current?.getBoundingClientRect();
    if (!elemRect) {
      return;
    }

    if (elemRect?.top > 3000) {
      !showBtnScollBottom && setShowBtnScollBottom(true);
    } else {
      showBtnScollBottom && setShowBtnScollBottom(false);
    }
  }, [endScreenRef, showBtnScollBottom]);

  useEffect(() => {
    window.addEventListener('scroll', showScrollBottomBtn);
    return () => window.removeEventListener('scroll', showScrollBottomBtn);
  }, [showScrollBottomBtn]);

  return (
    <>
      <Fade in={showBtnScollBottom}>
        <IconButton
          style={{ position: 'absolute', bottom: 60, left: '50%', transform: 'translate(-50%, 0)' }}
          onClick={scrollToBottom}
        >
          <ArrowDropDownCircleRoundedIcon />
        </IconButton>
      </Fade>
      <Box
        display="flex"
        alignItems="center"
        component="form"
        onSubmit={handleSubmit((value) => {
          sendMessage(value.text);
          reset({ text: '' });
          setAutoFocus(true);
          scrollToBottom();
          setTickTock((old) => !old);
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
                autoFocus={autoFocus}
                key={`${tickTock}`}
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
    </>
  );
};

MessageInput.defaultProps = {
  senderInfo: false,
  typingIndicator: false,
};
