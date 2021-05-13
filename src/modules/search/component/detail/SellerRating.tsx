import { Box, fade, Typography } from '@material-ui/core';
import GradeRoundedIcon from '@material-ui/icons/GradeRounded';
import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { SECONDARY } from '../../../../configs/colors';
import { CardDiv } from '../../../common/component/elements';
import { ISeller, ISellerRating } from '../../model';
import ReviewInfoItem from './ReviewInfoItem';

interface Props {
  info?: ISeller;
  ratings?: ISellerRating[];
}

const SellerRating = (props: Props) => {
  const { info, ratings } = props;

  return (
    <div
      style={{
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {!info?.ratingCount ? (
        <CardDiv>
          <Typography variant="body2" color="primary" style={{ padding: '8px 0', textAlign: 'center' }}>
            <FormattedMessage id="search.noReview" />
          </Typography>
        </CardDiv>
      ) : (
        <>
          <CardDiv
            style={{
              background: fade(SECONDARY, 0.1),
              padding: '8px',
            }}
          >
            <Typography
              variant="subtitle1"
              color="primary"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <GradeRoundedIcon
                color="inherit"
                style={{
                  marginRight: '3px',
                  marginLeft: '8px',
                }}
              />
              {info?.rating}
            </Typography>

            <Box display="flex">
              <Typography
                variant="caption"
                color="primary"
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flex: 1,
                  alignItems: 'center',
                }}
              >
                <Typography variant="caption" component="span" color="textSecondary">
                  <FormattedMessage id="search.attitude" />
                </Typography>

                <GradeRoundedIcon
                  color="inherit"
                  style={{
                    fontSize: 12,
                    marginRight: '3px',
                    marginLeft: '8px',
                  }}
                />
                {info?.attitudeRating}
              </Typography>

              <Typography
                variant="caption"
                color="primary"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flex: 1,
                  alignItems: 'center',
                }}
              >
                <Typography variant="caption" component="span" color="textSecondary">
                  <FormattedMessage id="search.priceRating" />
                </Typography>

                <GradeRoundedIcon
                  color="inherit"
                  style={{
                    fontSize: 12,
                    marginRight: '3px',
                    marginLeft: '8px',
                  }}
                />
                {info?.priceRating}
              </Typography>

              <Typography
                variant="caption"
                color="primary"
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  flex: 1,
                  alignItems: 'center',
                }}
              >
                <Typography variant="caption" component="span" color="textSecondary">
                  <FormattedMessage id="search.qualityRating" />
                </Typography>

                <GradeRoundedIcon
                  color="inherit"
                  style={{
                    fontSize: 12,
                    marginRight: '3px',
                    marginLeft: '8px',
                  }}
                />
                {info?.qualityRating}
              </Typography>
            </Box>
          </CardDiv>

          <Typography
            variant="caption"
            color="textPrimary"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '8px 0',
            }}
          >
            <FormattedNumber value={info.ratingCount} />
            &nbsp;
            <Typography variant="caption" component="span" color="textSecondary">
              <FormattedMessage id="search.reviewCount" />
            </Typography>
          </Typography>

          {ratings?.map((one: ISellerRating) => (
            <ReviewInfoItem data={one} key={one.rateDate} />
          ))}
        </>
      )}
    </div>
  );
};

export default SellerRating;
