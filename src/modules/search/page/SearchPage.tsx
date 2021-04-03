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
import { fetchSellerDetail, sellerSearch } from "../redux/searchReducer";
import queryString from "query-string";
import SellerDetailBox from "../component/detail/SellerDetailBox";
import SellerRequestBox from "../component/request/SellerRequestBox";
import { ISeller } from "../model";
import { some } from "../../common/constants";
import { SUCCESS_CODE } from "../../../constants";

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
  const [openSellerDetail, setOpenSellerDetail] = React.useState(false);
  const [openSellerRequest, setOpenSellerRequest] = React.useState(false);
  const [sellerDetail, setSellerDetail] = React.useState<some>();

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

  const onFetchSellerDetail = React.useCallback(
    async (info: ISeller) => {
      const json = await dispatch(fetchSellerDetail(info.id));
      console.log(json);

      if (json.status === SUCCESS_CODE) {
        setSellerDetail(json.body);
        setOpenSellerDetail(true);
      }
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

        <SearchResultBox
          loading={loading}
          searchParams={searchParams}
          data={data}
          onSelectSeller={(info: ISeller) => onFetchSellerDetail(info)}
        />
      </PageWrapperNoScroll>

      <FilterBox open={openFilter} onClose={() => setOpenFilter(false)} />

      <SellerDetailBox
        open={openSellerDetail}
        info={sellerDetail}
        onClose={() => setOpenSellerDetail(false)}
        onSendRequest={() => setOpenSellerRequest(true)}
      />

      <SellerRequestBox
        open={openSellerRequest}
        onClose={() => setOpenSellerRequest(false)}
      />
    </>
  );
};

export default connect(mapStateToProps)(SearchPage);
