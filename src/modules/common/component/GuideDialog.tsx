import { Button, Dialog, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router';
import { ROUTES } from '../../../configs/routes';

const GUIDE_LIST_KEY = 'guideList';

interface IGuideInfo {
  pathname: string;
  messageId: string;
  disable?: boolean;
}

const guideList: IGuideInfo[] = [{ pathname: ROUTES.searchDetail, messageId: 'guide.sellerRequestDetail' }];

interface Props {}

const GuideDialog = (props: Props) => {
  const location = useLocation();

  const [showDialog, setShowDialog] = React.useState(false);
  const [guideInfo, setGuideInfo] = React.useState<IGuideInfo>();

  const guideStorage = React.useMemo(() => {
    return localStorage.getItem(GUIDE_LIST_KEY);
  }, []);

  const checkShowGuideInfo = React.useCallback(() => {
    const guide = guideList.find((one) => one.pathname === location.pathname);

    if (!guide) {
      return;
    }

    setGuideInfo(guide);

    if (!guideStorage) {
      setShowDialog(true);
      return;
    }

    const guideStorageJson = JSON.parse(guideStorage) as IGuideInfo[];
    const guideStorageInfo = guideStorageJson.find((one) => one.pathname === location.pathname);

    if (guideStorageInfo?.disable) {
      return;
    }

    setShowDialog(true);
  }, [guideStorage, location.pathname]);

  const onCloseDialog = React.useCallback(() => {
    if (!guideStorage) {
      localStorage.setItem(GUIDE_LIST_KEY, JSON.stringify([guideInfo]));
      return;
    }

    const guideStorageJson = JSON.parse(guideStorage) as IGuideInfo[];
    const guideStorageInfo = guideStorageJson.find((one) => one.pathname === location.pathname);

    if (!guideStorageInfo) {
      localStorage.setItem(GUIDE_LIST_KEY, JSON.stringify([...guideStorageJson, guideInfo]));
      return;
    }
  }, [guideInfo, guideStorage, location.pathname]);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkShowGuideInfo();
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [checkShowGuideInfo]);

  return (
    <Dialog
      open={showDialog}
      onClose={() => setShowDialog(false)}
      PaperProps={{ style: { padding: '24px', alignItems: 'center' } }}
    >
      <Typography variant="subtitle1" color={'textPrimary'}>
        <FormattedMessage id="guide" />
      </Typography>

      <Typography variant="body2" style={{ paddingTop: '36px', textAlign: 'center' }}>
        <FormattedMessage id={guideInfo?.messageId} />
      </Typography>

      <Button
        style={{ margin: '24px 0px 16px', minWidth: '200px' }}
        variant="contained"
        color="primary"
        size="large"
        onClick={() => {
          setShowDialog(false);
          onCloseDialog();
        }}
      >
        <FormattedMessage id="guide.understand" />
      </Button>
    </Dialog>
  );
};

export default GuideDialog;
