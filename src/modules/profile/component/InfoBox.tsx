import { Avatar, Box, Divider, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { FormattedMessage } from "react-intl";
import { CardDiv } from "../../common/component/elements";
import { some } from "../../common/constants";

interface Props {
  profile: some;
}
const InfoBox = (props: Props) => {
  const { profile } = props;

  return (
    <>
      <CardDiv>
        <Box className="border-bottom p-b-8">
          <Typography variant="caption" color="textSecondary">
            <FormattedMessage id="profile.phoneNumber" />
          </Typography>
          <Typography variant="body2" style={{ margin: "2px 0px 10px" }}>
            {profile?.id}
          </Typography>
        </Box>
        {profile?.addresses?.map((address: some, index: number) => {
          return (
            <Box className={`${index && "border-top p-b-8"} p-t-8`}>
              <Typography variant="caption" color="textSecondary">
                {address.title}
              </Typography>
              <Typography variant="body2" style={{ margin: "2px 0px 10px" }}>
                {address?.detail}
              </Typography>
            </Box>
          );
        })}
      </CardDiv>
      <Typography variant="subtitle2" className="m-t-24 m-b-16">
        <FormattedMessage id="profile.review" />
      </Typography>
      {profile?.reviews?.map((review: some, index: number) => {
        const { title, assessor, rating } = review;
        return (
          <CardDiv>
            <Typography variant="subtitle2">{title}</Typography>
            <Divider className="m-t-8 m-b-8" />
            <div className="d-flex align-items-center">
              <Avatar
                src={assessor?.avatar}
                className="m-r-4"
                style={{ height: 32, width: 32 }}
              />
              <Typography variant="caption" className="flex-1">
                {assessor?.name}
              </Typography>
              <Rating value={rating} size="small" />
            </div>
          </CardDiv>
        );
      })}
    </>
  );
};
export default InfoBox;
