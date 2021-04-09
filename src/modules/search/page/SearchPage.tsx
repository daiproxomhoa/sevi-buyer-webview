import { push, replace } from "connected-react-router";
import queryString from "query-string";
import * as React from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ROUTES } from "../../../configs/routes";
import { AppState } from "../../../redux/reducer";
import { PageWrapper } from "../../common/component/elements";
import FilterBox from "../component/FilterBox";
import SearchBox from "../component/SearchBox";
import SearchResultBox from "../component/SearchResultBox";
import { ISeller } from "../model";
import { sellerSearch } from "../redux/searchReducer";

const mapStateToProps = (state: AppState) => ({
  data: state.search.data,
});

interface ISearchPageProps extends ReturnType<typeof mapStateToProps> {
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

const SearchPage: React.FunctionComponent<ISearchPageProps> = (props) => {
  const { dispatch, data } = props;

  const location = useLocation();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [openFilter, setOpenFilter] = React.useState<boolean>(false);

  const searchParams = React.useMemo(() => {
    return queryString.parse(location.search);
  }, [location]);
  console.log(location.search, searchParams);

  const setSearchParams = React.useCallback(
    (search: string) => {
      dispatch(
        replace({
          search: queryString.stringify({ search }),
        })
      );
    },
    [dispatch]
  );

  const onSellerSearch = React.useCallback(
    async (search: string) => {
      setLoading(true);
      await dispatch(
        sellerSearch({
          en: false,
          string: "tất cả",
          sortBy: "quality",
          radius: 10000,
          lat: 21.019779,
          lng: 105.849649,
          offset: 0,
        })
      );
      setLoading(false);
    },
    [dispatch]
  );

  const onViewSearchDetail = React.useCallback(
    async (info: ISeller) => {
      dispatch(
        push({
          pathname: ROUTES.searchDetail,
          search: queryString.stringify({ id: info.id }),
        })
      );
    },
    [dispatch]
  );

  return (
    <>
      <PageWrapper>
        <SearchBox
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSellerSearch={onSellerSearch}
          openFilter={() => setOpenFilter(true)}
        />
        <SearchResultBox
          loading={loading}
          searchParams={searchParams}
          data={data}
          onSelectSeller={(info: ISeller) => onViewSearchDetail(info)}
        />
      </PageWrapper>

      <FilterBox open={openFilter} onClose={() => setOpenFilter(false)} />
    </>
  );
};

export default connect(mapStateToProps)(SearchPage);
