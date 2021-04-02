import * as React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../redux/reducer";
import { PageWrapperNoScroll } from "../../common/component/elements";
import FilterBox from "../component/FilterBox";
import SearchBox from "../component/SearchBox";
import SearchResultBox from "../component/SearchResultBox";
import { sellerSearch } from "../redux/searchReducer";
import queryString from "query-string";

const mapStateToProps = (state: AppState) => ({
  data: state.search.data,
});

interface ISearchPageProps extends ReturnType<typeof mapStateToProps> {
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

const SearchPage: React.FunctionComponent<ISearchPageProps> = (props) => {
  const { dispatch, data } = props;
  const history = useHistory();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [openFilter, setOpenFilter] = React.useState<boolean>(false);

  const searchParams = React.useMemo(() => {
    return queryString.parse(history.location.search);
  }, [history.location.search]);

  const setSearchParams = React.useCallback(
    (search: string) => {
      history.replace({
        search: queryString.stringify({ search }),
      });
    },
    [history]
  );

  const onSellerSearch = React.useCallback(
    async (search: string) => {
      setLoading(true);
      await dispatch(
        sellerSearch({
          en: false,
          string: "thợ điện",
          sortBy: "rating",
          offset: 0,
          radius: 1000,
          lat: 1,
          lng: 1,
        })
      );
      setLoading(false);
    },
    [dispatch]
  );

  return (
    <>
      <PageWrapperNoScroll>
        <SearchBox
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSellerSearch={onSellerSearch}
          openFilter={() => setOpenFilter(true)}
        />

        {/* <PopularKeywordSearchBox /> */}

        <SearchResultBox
          loading={loading}
          searchParams={searchParams}
          data={data}
        />
      </PageWrapperNoScroll>

      <FilterBox open={openFilter} onClose={() => setOpenFilter(false)} />
    </>
  );
};

export default connect(mapStateToProps)(SearchPage);
