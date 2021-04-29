import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import useSWR from 'swr';
import { API_PATHS } from '../../../configs/api';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import styled from '@emotion/styled';
import { Box } from '@material-ui/core';
import { Chat } from '../lib/chat';
import { TypingIndicator } from '../lib/typing-indicator/typing-indicator';
import { MessageInput } from '../lib/message-input/message-input';
import { MessageList } from '../lib/message-list/message-list';

const AnchorDiv = styled.div`
  top: 0;
  position: sticky;
  position: -webkit-sticky;
  z-index: 100;
`;

function usePubNubClient(buyerId: string, sellerId: string, requestDate: string) {
  const dispatch: ThunkDispatch<AppState, null, AnyAction> = useDispatch();

  const { data } = useSWR(
    [sellerId, requestDate],
    async (sellerId: string, requestDate: string) => {
      const res = await dispatch(fetchThunk(API_PATHS.pubNubAuthKey(sellerId, requestDate), 'get'));
      if (res.status === 200) {
        if (res.body.result === 'success') {
          return res.body;
        } else {
          throw new Error(res.message);
        }
      }
      throw new Error(res.status);
    },
    { revalidateOnFocus: false, errorRetryCount: 5 },
  );

  if (!data) {
    return { pubNubClient: null, channelName: null };
  }

  return {
    pubNubClient: new PubNub({
      subscribeKey: data.subKey,
      publishKey: data.pubKey,
      authKey: data.authKey,
      uuid: buyerId,
      ssl: true,
      heartbeatInterval: 30,
      keepAlive: true,
    }),
    channelName: data.channelName,
  };
}

interface IChatPageProps {}

const ChatPage: React.FunctionComponent<IChatPageProps> = (props) => {
  const params = useParams<{ buyerId: string; sellerId: string; requestDate: string }>();

  const { pubNubClient, channelName } = usePubNubClient(params.buyerId, params.sellerId, params.requestDate);

  const dispatch: ThunkDispatch<AppState, null, AnyAction> = useDispatch();
  const { data: sellerData } = useSWR(API_PATHS.sellerDetail(params.sellerId), async (url) => {
    const res = await dispatch(fetchThunk(url, 'get'));
    if (res.status === 200) {
      return res.body;
    }
    throw new Error(res.status);
  });

  const intl = useIntl();

  if (pubNubClient === null || channelName === null || sellerData === null) {
    // render loading spinner
    return <></>;
  }

  return (
    <PubNubProvider client={pubNubClient}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Chat
          theme="support"
          channels={[channelName]}
          currentChannel={channelName}
          users={[
            { name: intl.formatMessage({ id: 'chat.me' }), id: params.buyerId, eTag: '', updated: '' },
            {
              name: sellerData.seller.givenName,
              id: sellerData.seller.id,
              eTag: '',
              updated: '',
              profileUrl: API_PATHS.renderSellerAvatar(sellerData.seller.id, sellerData.seller.avatar),
            },
          ]}
        >
          <AnchorDiv>
            <Box padding={2}>Sticky</Box>
          </AnchorDiv>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column-reverse' }}>
            <TypingIndicator />
            <MessageList welcomeMessages={false} fetchMessages={25} />
          </div>
          <AnchorDiv style={{ bottom: 0, paddingBottom: 10 }}>
            <MessageInput
              placeholder={intl.formatMessage({ id: 'chat.sendPlaceholder' })}
              sendButton={<FormattedMessage id="chat.send" />}
            />
          </AnchorDiv>
        </Chat>
      </div>
    </PubNubProvider>
  );
};

export default ChatPage;
