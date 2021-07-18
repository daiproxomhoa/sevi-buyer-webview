import { Box, Button, Checkbox, Dialog, FormControlLabel, Typography } from '@material-ui/core';
import React from 'react';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { matchPath, useLocation } from 'react-router';
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
  const [disableShowAgain, setDisableShowAgain] = React.useState(false);
  const guideStorage = localStorage.getItem(GUIDE_LIST_KEY);

  const currentGuide = useMemo(() => {
    if (guideStorage) {
      const guideStorageJson = JSON.parse(guideStorage) as IGuideInfo[];
      const guideStorageInfo = guideStorageJson.find(
        (one) => !!matchPath(location.pathname, { path: one.pathname, exact: true, strict: false }),
      );
      return guideStorageInfo;
    }
    const currentGuide = guideList.find(
      (one) => !!matchPath(location.pathname, { path: one.pathname, exact: true, strict: false }),
    );
    return currentGuide;
  }, [guideStorage, location.pathname]);

  const checkShowGuideInfo = React.useCallback(() => {
    if (!currentGuide) {
      return;
    }

    if (!currentGuide) {
      setShowDialog(true);
      return;
    }
    if (currentGuide?.disable) {
      return;
    }
    setShowDialog(true);
  }, [currentGuide]);

  const onCloseDialog = React.useCallback(
    (disable: boolean) => {
      const guideInfoSet = { ...currentGuide, disable };

      if (!guideStorage) {
        localStorage.setItem(GUIDE_LIST_KEY, JSON.stringify([guideInfoSet]));
        return;
      }

      const guideStorageJson = JSON.parse(guideStorage) as IGuideInfo[];
      const gIndex = guideStorageJson.findIndex(
        (one) => !!matchPath(location.pathname, { path: one.pathname, exact: true, strict: false }),
      );

      if (gIndex === -1) {
        localStorage.setItem(GUIDE_LIST_KEY, JSON.stringify([...guideStorageJson, guideInfoSet]));
        return;
      }

      guideStorageJson[gIndex].disable = disable;
      localStorage.setItem(GUIDE_LIST_KEY, JSON.stringify(guideStorageJson));
    },
    [currentGuide, guideStorage, location.pathname],
  );

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkShowGuideInfo();
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [checkShowGuideInfo]);

  return (
    <Dialog open={showDialog} onClose={() => setShowDialog(false)} PaperProps={{ style: { padding: '24px' } }}>
      <Box textAlign="center">
        <Typography variant="subtitle1" color={'textPrimary'}>
          <FormattedMessage id="guide" />
        </Typography>

        <Typography variant="body2" style={{ paddingTop: '36px', textAlign: 'center' }}>
          <FormattedMessage id={currentGuide?.messageId || ' '} />
        </Typography>
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={disableShowAgain}
            onChange={(e, checked) => setDisableShowAgain(checked)}
            name="checkedB"
            color="primary"
          />
        }
        label={
          <Typography variant="body2">
            <FormattedMessage id="guide.disableShowAgain" />
          </Typography>
        }
        style={{ paddingTop: '16px' }}
      />

      <Button
        style={{ margin: '8px 0px 16px' }}
        variant="contained"
        color="primary"
        size="large"
        onClick={() => {
          setShowDialog(false);
          onCloseDialog(disableShowAgain);
        }}
      >
        <FormattedMessage id="guide.understand" />
      </Button>
    </Dialog>
  );
};

export default GuideDialog;
