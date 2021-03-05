import * as React from "react";
import { connect } from "react-redux";
import { PageWrapperNoScroll } from "../../common/component/elements";
import PopularKeywordSearchBox from "../component/PopularKeywordSearchBox";
import SearchBox from "../component/SearchBox";

interface ISearchPageProps {}

const SearchPage: React.FunctionComponent<ISearchPageProps> = (props) => {
  return (
    <PageWrapperNoScroll>
      <SearchBox />

      <PopularKeywordSearchBox />
    </PageWrapperNoScroll>
  );
};

export default connect()(SearchPage);
