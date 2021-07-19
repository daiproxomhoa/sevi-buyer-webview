import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import useSWR from 'swr';
import { API_PATHS } from '../../../configs/api';
import { AppState } from '../../../redux/reducer';
import { some } from '../../common/constants';
import { fetchThunk } from '../../common/redux/thunk';
import ChatHeader from '../lib/header/ChatHeader';
import { AnchorDiv } from '../components/element';
import SkeletonPage from '../components/SkeletonPage';
import { Chat } from '../lib/chat';
import { MessageInput } from '../lib/message-input/message-input';
import { MessageList } from '../lib/message-list/message-list';
import { TypingIndicator } from '../lib/typing-indicator/typing-indicator';

export function usePubNubClient(
  dispatch: ThunkDispatch<AppState, null, AnyAction>,
  buyerId: string,
  sellerId: string,
  requestDate: string,
) {
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
      heartbeatInterval: 5,
      keepAlive: true,
    }),
    channelName: data.channelName,
  };
}

interface IChatPageProps {}

const ChatPage: React.FunctionComponent<IChatPageProps> = (props) => {
  const requestData = useParams<some>();
  const intl = useIntl();
  const dispatch: ThunkDispatch<AppState, null, AnyAction> = useDispatch();
  const endRef = React.useRef<HTMLDivElement>(null);

  const { pubNubClient, channelName } = usePubNubClient(
    dispatch,
    requestData.buyerId,
    requestData.sellerId,
    decodeURIComponent(requestData.createDate),
  );

  React.useEffect(() => {
    if ((window as any).SEVI) {
      (window as any).SEVI.postMessage(
        JSON.stringify({
          type: 'chatActive',
          data: {
            buyer: requestData.buyerId,
            seller: requestData.sellerId,
            requestDate: decodeURIComponent(requestData.createDate),
          },
        }),
      );
    }
  }, [requestData]);

  React.useEffect(() => {
    if (pubNubClient) {
      return () => {
        pubNubClient.unsubscribeAll();
      };
    }
  }, [pubNubClient]);

  const header = React.useMemo(() => <ChatHeader key="header" request={requestData} pubNubClient={pubNubClient} />, [
    pubNubClient,
    requestData,
  ]);

  if (!pubNubClient || !channelName) {
    // render loading spinner
    return <SkeletonPage header={header} />;
  }

  return (
    <PubNubProvider client={pubNubClient}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Chat
          retryOptions={{ maxRetries: 10, exponentialFactor: 1.2, timeout: 10000 }}
          theme="support"
          channels={[channelName]}
          currentChannel={channelName}
          users={[
            { name: intl.formatMessage({ id: 'chat.me' }), id: requestData.buyerId, eTag: '', updated: '' },
            {
              name: decodeURIComponent(requestData.sellerName),
              id: requestData.sellerId,
              eTag: '',
              updated: '',
              profileUrl: requestData.sellerAvatar
                ? API_PATHS.renderSellerAvatar(requestData.sellerId, requestData.sellerAvatar)
                : undefined,
            },
          ]}
        >
          <AnchorDiv>{header}</AnchorDiv>
          <div style={{ flex: 1 }}>
            <MessageList welcomeMessages={false} fetchMessages={25} endScreenRef={endRef} />
          </div>
          <TypingIndicator />
          <AnchorDiv
            style={{ bottom: 0, paddingBottom: 4, paddingTop: 4, justifyContent: 'flex-end', background: 'white' }}
          >
            <MessageInput typingIndicator endScreenRef={endRef} />
          </AnchorDiv>
        </Chat>
      </div>
    </PubNubProvider>
  );
};

export default ChatPage;
