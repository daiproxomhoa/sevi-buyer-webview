import {
  ButtonBase,
  Input,
  InputAdornment,
  Theme,
  Typography,
  withStyles,
} from "@material-ui/core";
import { debounce } from "lodash";
import queryString from "query-string";
import React, { useCallback, useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { BACKGROUND } from "../../../configs/colors";
import { AppState } from "../../../redux/reducer";
import CardHeader from "../../../svg/card_header.svg";
import { ReactComponent as CancelIcon } from "../../../svg/ic_cancel.svg";
import { ReactComponent as FilterIcon } from "../../../svg/ic_filter.svg";
import { ReactComponent as SearchIcon } from "../../../svg/vector_search.svg";
import { WhiteIconButton } from "../../common/component/IconButton";
import { searchKeyword } from "../redux/searchReducer";

const SearchInput = withStyles((theme: Theme) => ({
  root: {
    borderRadius: 500,
    position: "relative",
    border: "none",
    fontSize: theme.typography.body2.fontSize,
    backgroundColor: BACKGROUND,
  },
  input: {
    padding: "18px 8px",
  },
}))(Input);

interface Props {}

const SearchBox = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const history = useHistory();
  const intl = useIntl();
  const scrollingDiv = useRef<HTMLDivElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);

  const [searchString, setSearchString] = React.useState("");

  const searchParams = React.useMemo(() => {
    return queryString.parse(history.location.search);
  }, [history.location.search]);

  const searchDebounce = useCallback(
    debounce(
      (value: string) => {
        history.replace({ search: queryString.stringify({ search: value }) });

        dispatch(searchKeyword());
        scrollingDiv.current?.scrollTo(0, 0);
      },
      300,
      {
        trailing: true,
        leading: false,
      }
    ),
    []
  );

  React.useEffect(() => {
    if (searchParams?.search) {
      setSearchString(searchParams.search as string);
    }
  }, [searchParams.search]);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "214px",
      }}
    >
      <img src={CardHeader} alt="" style={{ width: "100%" }} />
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          top: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            margin: "52px 24px 24px",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <WhiteIconButton>
              <FilterIcon />
            </WhiteIconButton>
          </div>

          <Typography
            variant="h6"
            style={{ margin: "16px 0", zIndex: 1, textAlign: "center" }}
          >
            <FormattedMessage id="search" />
          </Typography>

          <SearchInput
            inputRef={searchInput}
            value={searchString}
            placeholder={intl.formatMessage({ id: "enterSearchInfo" })}
            fullWidth
            disableUnderline
            onChange={(e) => {
              setSearchString(e.target.value);
              searchDebounce(e.target.value);
            }}
            startAdornment={
              <InputAdornment
                position="start"
                style={{ marginLeft: "16px", opacity: 0.6 }}
              >
                <SearchIcon style={{ width: "20px", height: "20px" }} />
              </InputAdornment>
            }
            endAdornment={
              <>
                <InputAdornment position="end">
                  <ButtonBase
                    onClick={() => {
                      setSearchString("");
                      searchDebounce("");
                      searchInput?.current?.focus();
                    }}
                    style={{
                      borderRadius: "50%",
                      marginRight: "16px",
                    }}
                  >
                    <CancelIcon />
                  </ButtonBase>
                </InputAdornment>
              </>
            }
          />

          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              left: 0,
              flex: 1,
              display: "none",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
              borderRadius: "12px",
              backgroundColor: BACKGROUND,
              marginTop: "2px",
              zIndex: 1,
              maxHeight: "268px",
            }}
            ref={scrollingDiv}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
