import { goBack } from "connected-react-router";
import queryString from "query-string";
import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { SUCCESS_CODE } from "../../../constants";
import { AppState } from "../../../redux/reducer";
import { PageWrapper } from "../../common/component/elements";
import SellerDetailBox from "../component/detail/SellerDetailBox";
import { ISeller } from "../model";
import { fetchSellerDetail } from "../redux/searchReducer";

interface Props {}

const SearchDetailPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const location = useLocation();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [sellerDetail, setSellerDetail] = React.useState<ISeller>();

  const fetchData = React.useCallback(async () => {
    const info = (queryString.parse(location.search) as unknown) as ISeller;

    setLoading(true);
    const json = await dispatch(fetchSellerDetail(info.id));

    setLoading(false);

    if (json.status === SUCCESS_CODE) {
      setSellerDetail(json.body.seller);
    }
  }, [dispatch, location]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <PageWrapper>
      <SellerDetailBox
        loading={loading}
        info={sellerDetail}
        onClose={() => {
          dispatch(goBack());
        }}
        onSendRequest={() => {}}
      />
    </PageWrapper>
  );
};

export default SearchDetailPage;
