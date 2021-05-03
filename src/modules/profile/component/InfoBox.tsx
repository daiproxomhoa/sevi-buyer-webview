import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { FormattedMessage } from 'react-intl';
import { CardDiv } from '../../common/component/elements';
import { some } from '../../common/constants';

interface Props {
  profile?: some;
  loading?: boolean;
}
const InfoBox = (props: Props) => {
  const { profile, loading } = props;

  if (!profile || loading) {
    return (
      <>
        <CardDiv>
          <Box className="border-bottom p-b-8">
            <Typography variant="caption">
              <Skeleton variant="text" width="30%" />
            </Typography>
            <Typography variant="body2">
              <Skeleton variant="text" />
            </Typography>
          </Box>
          {[1, 2].map((value, index) => {
            return (
              <Box key={value} className={`${index && 'border-top p-b-8'} p-t-8`}>
                <Typography variant="caption">
                  <Skeleton variant="text" width="40%" />
                </Typography>
                <Typography variant="body2">
                  <Skeleton variant="text" />
                </Typography>
              </Box>
            );
          })}
        </CardDiv>
        <Typography variant="subtitle2" className="m-t-24 m-b-16">
          <FormattedMessage id="profile.review" />
        </Typography>
      </>
    );
  }
  return (
    <>
      <CardDiv>
        <Box className="border-bottom m-b-8">
          <Typography variant="caption" color="textSecondary">
            <FormattedMessage id="profile.phoneNumber" />
          </Typography>
          <Typography variant="body2" style={{ marginTop: 2 }}>
            {profile?.id}
          </Typography>
        </Box>
        {profile?.addresses?.map((address: some, index: number) => {
          return (
            <Box className={`${index && 'border-top p-b-8'} p-t-8`}>
              <Typography variant="caption" color="textSecondary">
                {address.name}
              </Typography>
              <Typography variant="body2" style={{ margin: '2px 0px 10px' }}>
                {address?.address?.formattedAddress}
              </Typography>
            </Box>
          );
        })}
      </CardDiv>
      <Typography variant="subtitle2" className="m-t-24 m-b-16">
        <FormattedMessage id="profile.review" />
      </Typography>
    </>
  );
};
export default InfoBox;
