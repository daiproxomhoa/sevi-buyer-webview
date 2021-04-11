import {
  ButtonBase,
  CircularProgress,
  fade,
  Input,
  InputAdornment,
  Theme,
  withStyles,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import TuneIcon from "@material-ui/icons/Tune";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { BACKGROUND, BLACK } from "../../../configs/colors";
import { AppState } from "../../../redux/reducer";
import { HeaderDiv } from "../../common/component/elements";
import FormControlAutoComplete from "../../common/component/FormControlAutoComplete";
import { WhiteIconButton } from "../../common/component/IconButton";
import { ISellerSearchFilter } from "../model";
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
    padding: "10px 8px",
  },
}))(Input);

interface Props {
  filter: ISellerSearchFilter;
  onSellerSearch(search: string): void;
  openFilter(): void;
}

const SearchBox = (props: Props) => {
  const { filter, onSellerSearch, openFilter } = props;
  const intl = useIntl();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [searchString, setSearchString] = React.useState(filter.string);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (filter.string) {
      setSearchString(filter.string);
    }
  }, [filter.string]);

  return (
    <HeaderDiv style={{ display: "flex" }}>
      <FormControlAutoComplete
        fullWidth
        freeSolo
        value={searchString}
        onChange={async (e, str: string | null) => {
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

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginLeft: "12px",
        }}
      >
        <WhiteIconButton onClick={openFilter}>
          <TuneIcon style={{ width: "20px", height: "20px" }} />
        </WhiteIconButton>
      </div>
    </HeaderDiv>
  );
};

export default SearchBox;
