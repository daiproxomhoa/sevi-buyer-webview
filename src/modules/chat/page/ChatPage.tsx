import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Redirect, useLocation } from 'react-router';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import useSWR from 'swr';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { AppState } from '../../../redux/reducer';
import { some } from '../../common/constants';
import { fetchThunk } from '../../common/redux/thunk';
import ChatHeader from '../components/ChatHeader';
import { AnchorDiv } from '../components/element';
import SkeletonPage from '../components/SkeletonPage';
import { Chat } from '../lib/chat';
import { MessageInput } from '../lib/message-input/message-input';
import { MessageList } from '../lib/message-list/message-list';
import { TypingIndicator } from '../lib/typing-indicator/typing-indicator';

function usePubNubClient(
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
      heartbeatInterval: 30,
      keepAlive: true,
    }),
    channelName: data.channelName,
  };
}

interface IChatPageProps {}

const ChatPage: React.FunctionComponent<IChatPageProps> = (props) => {
  const location = useLocation();
  const state = location.state as some;
  const { requestData } = state;
  const dispatch: ThunkDispatch<AppState, null, AnyAction> = useDispatch();

  const { pubNubClient, channelName } = usePubNubClient(
    dispatch,
    requestData?.buyerId,
    requestData?.sellerId,
    requestData?.createDate,
  );
  const seller = requestData?.seller;

  const intl = useIntl();

  React.useEffect(() => {
    if (!requestData) {
      // dispatch(push(ROUTES.request));
    }
  }, [dispatch, requestData]);

  if (!requestData) {
    return <Redirect to={ROUTES.request} />;
  }
  if (!pubNubClient || !channelName) {
    // render loading spinner
    return <SkeletonPage request={requestData} />;
  }

  return (
    <>
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
                name: seller.givenName,
                id: seller.id,
                eTag: '',
                updated: '',
                profileUrl: API_PATHS.renderSellerAvatar(seller.id, seller.avatar),
              },
            ]}
          >
            <AnchorDiv>
              <ChatHeader request={requestData} />
            </AnchorDiv>
            <div style={{ flex: 1 }}>
              <MessageList welcomeMessages={false} fetchMessages={25} />
            </div>
            <TypingIndicator />
            <AnchorDiv
              style={{ bottom: 0, paddingBottom: 4, paddingTop: 4, justifyContent: 'flex-end', background: 'white' }}
            >
              <MessageInput />
            </AnchorDiv>
          </Chat>
        </div>
      </PubNubProvider>
    </>
  );
};

export default ChatPage;
