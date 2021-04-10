import {
  Button,
  Chip,
  CircularProgress,
  List,
  Typography,
} from "@material-ui/core";
import React from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { ISeller, ISellerSearchFilter } from "../model";
import SearchResultItem from "./SearchResultItem";
import { ReactComponent as NoDataIcon } from "../../../svg/ic_nodata.svg";
import { SEARCH_PAGE_SIZE } from "../constants";

interface Props {
  loading: boolean;
  filter: ISellerSearchFilter;
  data: ISeller[];
  onSelectSeller(seller: ISeller): void;
  loadMore(): void;
}

const SearchResultBox = (props: Props) => {
  const { loading, filter, data, onSelectSeller, loadMore } = props;

  const pageSize = (filter.page + 1) * SEARCH_PAGE_SIZE;

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
          &nbsp; “{filter?.string}”
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
            {data.map(
              (one, index) =>
                index < pageSize && (
                  <SearchResultItem
                    key={one.id}
                    info={one}
                    onSelect={() => onSelectSeller(one)}
                  />
                )
            )}
          </List>

          <div
            style={{
              display: "flex",
              padding: "0 0 64px",
              justifyContent: "center",
            }}
          >
            {pageSize < data.length && (
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                size="small"
                style={{ width: "96px", height: "24px" }}
                onClick={loadMore}
              >
                <FormattedMessage id="search.seeMore" />
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResultBox;
