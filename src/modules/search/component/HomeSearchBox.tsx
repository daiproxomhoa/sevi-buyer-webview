import { Chip, Theme, Typography, withStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { API_PATHS } from "../../../configs/api";
import { SUCCESS_CODE } from "../../../constants";
import { AppState } from "../../../redux/reducer";
import { fetchThunk } from "../../common/redux/thunk";
import { IRecentSearch } from "../model";
import HomeSearchSkeleton from "./HomeSearchSkeleton";

const CustomChip = withStyles((theme: Theme) => ({
  root: {
    borderRadius: 64,
    backgroundColor: theme.palette.grey[300],
    margin: 6,
    fontSize: theme.typography.body2.fontSize,
  },
}))(Chip);

interface Props {
  onSearch(str: string): void;
}

const HomeSearchBox = (props: Props) => {
  const { onSearch } = props;

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [popularSearches, setPopularSearches] = React.useState<string[]>([]);
  const [recentSearches, setRecentSearches] = React.useState<IRecentSearch[]>();
  const [loading, setLoading] = React.useState(false);

  const fetchPopularKeyword = React.useCallback(async () => {
    setLoading(true);
    const popularSearchCall = dispatch(fetchThunk(API_PATHS.popularSearches));
    const recentSearchCall = dispatch(fetchThunk(API_PATHS.recentSearches));

    const popularJson = await popularSearchCall;
    const recentJson = await recentSearchCall;

    setLoading(false);
    if (popularJson?.status === SUCCESS_CODE) {
      setPopularSearches(popularJson.body);
    }

    if (recentJson?.status === SUCCESS_CODE) {
      setRecentSearches(recentJson?.body?.searches);
    }
  }, [dispatch]);

  React.useEffect(() => {
    fetchPopularKeyword();
  }, [fetchPopularKeyword]);

  return (
    <div
      style={{
        flex: 1,
        overflow: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div>
        <Typography variant="subtitle1" style={{ margin: "24px 24px 10px" }}>
          <FormattedMessage id="searchRecent" />
        </Typography>

        {loading && <HomeSearchSkeleton />}

        {!!recentSearches?.length && (
          <div
            style={{ display: "flex", flexWrap: "wrap", margin: "0px 18px" }}
          >
            {recentSearches.map(
              (one) =>
                one.search && (
                  <CustomChip
                    key={one.search}
                    label={one.search}
                    clickable
                    onClick={() => onSearch(one.search)}
                  />
                )
            )}
          </div>
        )}
      </div>

      <div
        style={{
          marginBottom: "80px",
        }}
      >
        <Typography variant="subtitle1" style={{ margin: "24px 24px 10px" }}>
          <FormattedMessage id="popularKeyword" />
        </Typography>

        {loading && <HomeSearchSkeleton />}

        {!!popularSearches?.length && (
          <div
            style={{ display: "flex", flexWrap: "wrap", margin: "0px 18px" }}
          >
            {popularSearches?.map(
              (one) =>
                one && (
                  <CustomChip
                    key={one}
                    label={one}
                    clickable
                    onClick={() => onSearch(one)}
                  />
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeSearchBox;
