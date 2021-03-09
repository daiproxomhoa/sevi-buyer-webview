import * as React from "react";
import { connect } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../redux/reducer";
import { PageWrapperNoScroll } from "../../common/component/elements";
import PopularKeywordSearchBox from "../component/PopularKeywordSearchBox";
import SearchBox from "../component/SearchBox";
import SearchResultBox from "../component/SearchResultBox";
import { searchWorker } from "../redux/searchReducer";

const mapStateToProps = (state: AppState) => ({
  data: state.search.data,
});

interface ISearchPageProps extends ReturnType<typeof mapStateToProps> {
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

const SearchPage: React.FunctionComponent<ISearchPageProps> = (props) => {
  const { dispatch, data } = props;
  const [loading, setLoading] = React.useState<boolean>(false);

  const onSearchWorker = React.useCallback(
    async (search: string) => {
      setLoading(true);
      await dispatch(searchWorker(search));
      setLoading(false);
    },
    [dispatch]
  );

  return (
    <PageWrapperNoScroll>
      <SearchBox onSearchWorker={onSearchWorker} />

      {/* <PopularKeywordSearchBox /> */}

      <SearchResultBox loading={loading} data={data} />
    </PageWrapperNoScroll>
  );
};

export default connect(mapStateToProps)(SearchPage);
