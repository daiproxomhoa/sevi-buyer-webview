import { Chip, CircularProgress, List, Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { ISearchResult } from "../model";
import SearchResultItem from "./SearchResultItem";
import { ReactComponent as NoDataIcon } from "../../../svg/ic_nodata.svg";

interface Props {
  loading: boolean;
  data: ISearchResult[];
}

const SearchResultBox = (props: Props) => {
  const { loading, data } = props;

  return loading ? (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </div>
  ) : (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "12px 24px 10px",
        }}
      >
        <Typography variant="body1" style={{ flex: 1 }}>
          <FormattedMessage id="resultFor" />
        </Typography>
        <Chip
          label={<FormattedNumber value={data.length} />}
          color="primary"
          style={{ height: "24px", minWidth: "56px" }}
        />
      </div>
      {!data.length ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "48px",
          }}
        >
          <NoDataIcon />
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ textAlign: "center", paddingTop: "16px" }}
          >
            <FormattedMessage
              id="search.nodata"
              values={{
                text: (
                  <Typography
                    variant="body2"
                    color="textPrimary"
                    component="span"
                  >
                    Thở sửa chữa
                  </Typography>
                ),
              }}
            />
          </Typography>
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <List style={{ margin: "0 24px" }}>
            {data.map((one) => (
              <SearchResultItem key={one.id} info={one} />
            ))}
          </List>
        </div>
      )}
    </>
  );
};

export default SearchResultBox;
