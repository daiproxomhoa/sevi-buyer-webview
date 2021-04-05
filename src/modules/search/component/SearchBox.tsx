import {
  ButtonBase,
  CircularProgress,
  fade,
  Input,
  InputAdornment,
  Theme,
  Typography,
  withStyles,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import TuneIcon from "@material-ui/icons/Tune";
import queryString from "query-string";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { BACKGROUND, BLACK } from "../../../configs/colors";
import { AppState } from "../../../redux/reducer";
import FormControlAutoComplete from "../../common/component/FormControlAutoComplete";
import { WhiteIconButton } from "../../common/component/IconButton";
import { searchKeyword } from "../redux/searchReducer";
import { HeaderDiv } from "../../common/component/elements";

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
  openFilter(): void;
}

const SearchBox = (props: Props) => {
  const { searchParams, setSearchParams, onSellerSearch, openFilter } = props;
  const intl = useIntl();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [searchString, setSearchString] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (searchParams?.search) {
      setSearchString(searchParams.search as string);
    }
  }, [searchParams.search]);

  return (
    <HeaderDiv>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <WhiteIconButton onClick={openFilter}>
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

      <FormControlAutoComplete
        fullWidth
        value={searchString}
        onChange={async (e, str: string | null) => {
          setSearchParams(str || "");
          setSearchString(str || "");
          if (str) {
            onSellerSearch(str);
          }
        }}
        loadOptions={async (str: string) => {
          setLoading(true);
          const json = await dispatch(searchKeyword(str));
          setLoading(false);
          return json;
        }}
        getOptionLabel={(value: string) => value}
        getOptionSelected={(option: string, value: string) => option === value}
        loading={loading}
        loadingText={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormattedMessage id="search.loading" />
            &nbsp;
            <CircularProgress color="inherit" size={16} />
          </div>
        }
        renderInput={(params) => (
          <SearchInput
            {...params}
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
            fullWidth
            placeholder={intl.formatMessage({ id: "enterSearchInfo" })}
            disableUnderline
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
        )}
      />
    </HeaderDiv>
  );
};

export default SearchBox;
