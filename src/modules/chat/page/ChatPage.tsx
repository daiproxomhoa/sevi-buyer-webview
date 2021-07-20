import { useAtom } from 'jotai';
import { useSnackbar } from 'notistack';
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
import { SUCCESS_CODE } from '../../../constants';
import { AppState } from '../../../redux/reducer';
import { snackbarSetting } from '../../common/component/elements';
import { some } from '../../common/constants';
import { fetchThunk } from '../../common/redux/thunk';
import { fetchProfile } from '../../profile/redux/profileReducer';
import { AnchorDiv } from '../components/element';
import SkeletonPage from '../components/SkeletonPage';
import { Chat } from '../lib/chat';
import ChatHeader from '../lib/header/ChatHeader';
import { MessageInput } from '../lib/message-input/message-input';
import { MessageList } from '../lib/message-list/message-list';
import { CurrentChannelAtom, ErrorFunctionAtom, TickTokLoadData } from '../lib/state-atoms';
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
  const params = useParams<some>();
  const requestData = React.useMemo(
    () =>
      ({
        ...params,
        createDate: decodeURIComponent(params.createDate),
        sellerName: decodeURIComponent(params.sellerName),
      } as some),
    [params],
  );
  const intl = useIntl();
  const dispatch: ThunkDispatch<AppState, null, AnyAction> = useDispatch();
  const [requestDataTmp, setRequestData] = React.useState<some>(requestData);
  const [loading, setLoading] = React.useState(true);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loadData] = useAtom(TickTokLoadData);
  const [channel] = useAtom(CurrentChannelAtom);
  const [onErrorObj] = useAtom(ErrorFunctionAtom);
  const onError = onErrorObj.function;

  const endRef = React.useRef<HTMLDivElement>(null);

  const { pubNubClient, channelName } = usePubNubClient(
    dispatch,
    requestData.buyerId,
    requestData.sellerId,
    requestData.createDate,
  );

  React.useEffect(() => {
    if ((window as any).SEVI) {
      (window as any).SEVI.postMessage(
        JSON.stringify({
          type: 'chatActive',
          data: {
            buyer: requestData.buyerId,
            seller: requestData.sellerId,
            requestDate: requestData.createDate,
          },
        }),
      );
    }
  }, [requestData]);

  const fireTickTok = React.useCallback(
    async (value: boolean) => {
      if (!pubNubClient || !channel) {
        return;
      }
      try {
        const message = { message: { type: 'ticktok_load_data', value }, channel };
        pubNubClient.signal(message);
      } catch (e) {
        console.log(e);

        onError(e);
      }
    },
    [channel, onError, pubNubClient],
  );

  const fetchRequest = React.useCallback(async () => {
    const json = await dispatch(
      fetchThunk(
        API_PATHS.getRequest,
        'post',
        JSON.stringify({
          sellerId: requestData.sellerId,
          requestDate: requestData.createDate,
        }),
      ),
    );
    if (json.status === SUCCESS_CODE) {
      setRequestData((one) => ({ ...json.body, ...one }));
      fireTickTok(!loadData);
    } else {
      enqueueSnackbar(
        intl.formatMessage({ id: 'chat.loadFail' }),
        snackbarSetting((key) => closeSnackbar(key), { variant: 'error' }),
      );
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeSnackbar, dispatch, enqueueSnackbar, intl, requestData.createDate, requestData.sellerId]);

  React.useEffect(() => {
    if (pubNubClient) {
      return () => {
        pubNubClient.unsubscribeAll();
      };
    }
  }, [pubNubClient]);
  React.useEffect(() => {
    fetchRequest();
  }, [fetchRequest, loadData]);

  React.useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const header = React.useMemo(
    () => (
      <ChatHeader
        key="header"
        requestData={requestDataTmp}
        fetchRequest={fetchRequest}
        fireTickTok={() => fireTickTok(!loadData)}
        loading={loading}
      />
    ),
    [fetchRequest, fireTickTok, loadData, loading, requestDataTmp],
  );

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
              name: requestData.sellerName,
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
