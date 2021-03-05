import { Chip, Theme, Typography, withStyles } from "@material-ui/core";
import fetchMock from "fetch-mock";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { API_PATHS } from "../../../configs/api";
import keywordSearch from "../../../json/searchHistory.json";
import { AppState } from "../../../redux/reducer";
import { fetchThunk } from "../../common/redux/thunk";
import { ISearchRecent } from "../model";

const CustomChip = withStyles((theme: Theme) => ({
  root: {
    borderRadius: 64,
    backgroundColor: theme.palette.grey[200],
    margin: 6,
    fontSize: theme.typography.body2.fontSize,
  },
}))(Chip);

interface Props {}

const PopularKeywordSearchBox = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [data, setData] = React.useState<ISearchRecent>({
    searchPopular: [],
    searchRecent: [],
  });

  const fetchPopularKeyword = React.useCallback(async () => {
    fetchMock.get(API_PATHS.popularKeyword, keywordSearch);

    const json = await dispatch(fetchThunk(API_PATHS.popularKeyword));
    if (json?.body) {
      setData(json.body);
      console.log(json.body);
    }

    fetchMock.reset();
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
      {!!data?.searchRecent.length && (
        <div>
          <Typography variant="subtitle1" style={{ margin: "24px 24px 10px" }}>
            <FormattedMessage id="searchRecent" />
          </Typography>
          <div
            style={{ display: "flex", flexWrap: "wrap", margin: "0px 18px" }}
          >
            {data?.searchRecent?.map((one) => (
              <CustomChip key={one} label={one} clickable />
            ))}
          </div>
        </div>
      )}

      {!!data?.searchPopular.length && (
        <div
          style={{
            marginBottom: "80px",
          }}
        >
          <Typography variant="subtitle1" style={{ margin: "24px 24px 10px" }}>
            <FormattedMessage id="popularKeyword" />
          </Typography>
          <div
            style={{ display: "flex", flexWrap: "wrap", margin: "0px 18px" }}
          >
            {data?.searchPopular?.map((one) => (
              <CustomChip key={one} label={one} clickable />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularKeywordSearchBox;
