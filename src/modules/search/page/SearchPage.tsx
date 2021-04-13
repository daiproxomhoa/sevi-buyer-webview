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
import HomeSearchBox from "../component/HomeSearchBox";
import SearchBox from "../component/SearchBox";
import SearchResultBox from "../component/SearchResultBox";
import { defaultSearchFilter, ISeller, ISellerSearchFilter } from "../model";
import { sellerSearch } from "../redux/searchReducer";
import { parseSearchParams, stringifySearchParams } from "../utils";

const mapStateToProps = (state: AppState) => ({
  data: state.search.data,
  profile: state.profile.data,
});

interface ISearchPageProps extends ReturnType<typeof mapStateToProps> {
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

const SearchPage: React.FunctionComponent<ISearchPageProps> = (props) => {
  const { dispatch, data, profile } = props;
  const location = useLocation();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [filter, setFilter] = React.useState<ISellerSearchFilter>(
    defaultSearchFilter
  );

  const [openFilter, setOpenFilter] = React.useState<boolean>(false);

  const setSearchParams = React.useCallback(
    (values: ISellerSearchFilter) => {
      dispatch(
        replace({
          search: stringifySearchParams(values),
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
    setFilter(parseSearchParams(location.search, profile));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

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
          <HomeSearchBox
            onSearch={(string) =>
              onSellerSearch({ ...filter, searched: true, string })
            }
          />
        )}
      </PageWrapper>

      <FilterBox
        filter={filter}
        profile={profile}
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        onFilter={(data) => {
          onSellerSearch({ ...data, searched: true, page: 0 });
          setOpenFilter(false);
        }}
      />
    </>
  );
};

export default connect(mapStateToProps)(SearchPage);
