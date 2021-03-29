import { fade, List, ListItem } from "@material-ui/core";
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
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { BACKGROUND, BLACK } from "../../../configs/colors";
import { AppState } from "../../../redux/reducer";
import ClearIcon from "@material-ui/icons/Clear";
import TuneIcon from "@material-ui/icons/Tune";
import SearchIcon from "@material-ui/icons/Search";
import { WhiteIconButton } from "../../common/component/IconButton";
import { searchKeyword } from "../redux/searchReducer";
import CardHeader from "../../common/component/CardHeader";

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

interface Props {
  searchParams: queryString.ParsedQuery<string>;
  onSellerSearch(search: string): void;
  setSearchParams(value: string): void;
}

const SearchBox = (props: Props) => {
  const { searchParams, setSearchParams, onSellerSearch } = props;

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const intl = useIntl();
  const scrollingDiv = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchString, setSearchString] = React.useState("");
  const [suggestSearch, setSuggestSearch] = React.useState<string[]>([]);
  const [showAutoSuggestBox, setShowAutoSuggestBox] = React.useState(false);

  const searchDebounce = useCallback(
    debounce(
      async (value: string) => {
        setSearchParams(value);

        const data = await dispatch(searchKeyword());
        setSuggestSearch(data);

        if (!data.length || !value) {
          setShowAutoSuggestBox(false);
        } else {
          setShowAutoSuggestBox(true);
        }

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
        minHeight: "206px",
      }}
    >
      <CardHeader />
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
              <TuneIcon style={{ width: "20px", height: "20px" }} />
            </WhiteIconButton>
          </div>

          <Typography
            variant="subtitle1"
            style={{
              margin: "8px 0",
              zIndex: 1,
              textAlign: "center",
              color: "white",
            }}
          >
            <FormattedMessage id="search" />
          </Typography>

          <SearchInput
            inputRef={searchInputRef}
            value={searchString}
            placeholder={intl.formatMessage({ id: "enterSearchInfo" })}
            fullWidth
            disableUnderline
            onChange={(e) => {
              setSearchString(e.target.value);
              searchDebounce(e.target.value);
            }}
            onBlur={() => {
              setImmediate(() => setShowAutoSuggestBox(false));
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
                {!!searchString && (
                  <InputAdornment position="end">
                    <ButtonBase
                      onClick={() => {
                        setSearchString("");
                        searchDebounce("");
                        setShowAutoSuggestBox(false);
                        searchInputRef?.current?.focus();
                      }}
                      style={{
                        borderRadius: "50%",
                        marginRight: "16px",
                        padding: "1px",
                        color: BACKGROUND,
                        backgroundColor: fade(BLACK, 0.34),
                      }}
                    >
                      <ClearIcon style={{ width: "15px", height: "15px" }} />
                    </ButtonBase>
                  </InputAdornment>
                )}
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
          >
            {!!suggestSearch.length && showAutoSuggestBox && (
              <List>
                {suggestSearch.map((one) => (
                  <ListItem
                    key={one}
                    button
                    onClick={() => {
                      setShowAutoSuggestBox(false);
                      setSearchString(one);
                      setSearchParams(one);
                      onSellerSearch(one);
                    }}
                  >
                    <Typography variant="body2" style={{ padding: "6px 0" }}>
                      {one}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
