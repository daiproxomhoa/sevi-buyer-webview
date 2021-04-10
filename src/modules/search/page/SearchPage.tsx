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
import FilterBox from "../component/filter/FilterBox";
import SearchBox from "../component/SearchBox";
import SearchResultBox from "../component/SearchResultBox";
import { defaultSearchFilter, ISeller, ISellerSearchFilter } from "../model";
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
  const [filter, setFilter] = React.useState<ISellerSearchFilter>(
    defaultSearchFilter
  );

  const [openFilter, setOpenFilter] = React.useState<boolean>(false);

  const searchParams: ISellerSearchFilter = React.useMemo(() => {
    return location.search
      ? ((queryString.parse(location.search) as unknown) as ISellerSearchFilter)
      : defaultSearchFilter;
  }, [location.search]);

  const setSearchParams = React.useCallback(
    (values: ISellerSearchFilter) => {
      dispatch(
        replace({
          search: queryString.stringify(values),
        })
      );
    },
    [dispatch]
  );

  const onSellerSearch = React.useCallback(
    async (values: ISellerSearchFilter) => {
      setFilter(values);

      setSearchParams(values);

      setLoading(true);

      await dispatch(sellerSearch(values));

      setLoading(false);
    },
    [dispatch, setSearchParams]
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

  React.useEffect(() => {
    setFilter((searchParams as unknown) as ISellerSearchFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageWrapper>
        <SearchBox
          filter={filter}
          onSellerSearch={(str: string) =>
            onSellerSearch({ ...filter, string: str, searched: true, page: 0 })
          }
          openFilter={() => setOpenFilter(true)}
        />

        {filter.searched ? (
          <SearchResultBox
            filter={filter}
            loading={loading}
            data={data}
            onSelectSeller={(info: ISeller) => onViewSearchDetail(info)}
            loadMore={() => {
              const newFilter = { ...filter, page: filter.page + 1 };
              setFilter(newFilter);
              setSearchParams(newFilter);
            }}
          />
        ) : (
          <>Search Recent</>
        )}
      </PageWrapper>

      <FilterBox
        filter={filter}
        open={openFilter}
        onClose={() => setOpenFilter(false)}
      />
    </>
  );
};

export default connect(mapStateToProps)(SearchPage);
