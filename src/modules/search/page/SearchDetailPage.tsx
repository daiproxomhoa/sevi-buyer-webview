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
import { ISeller, ISellerRating } from "../model";
import { fetchSellerDetail, fetchSellerRating } from "../redux/searchReducer";

interface Props {}

const SearchDetailPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const location = useLocation();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [sellerDetail, setSellerDetail] = React.useState<ISeller>();
  const [sellerRatings, setSellerRatings] = React.useState<ISellerRating[]>([]);

  const fetchData = React.useCallback(async () => {
    const info = (queryString.parse(location.search) as unknown) as ISeller;

    setLoading(true);
    const sellerCall = dispatch(fetchSellerDetail(info.id));
    const ratingCall = dispatch(fetchSellerRating(info.id));

    const sellerJson = await sellerCall;
    const ratingJson = await ratingCall;

    setLoading(false);

    if (sellerJson.status === SUCCESS_CODE) {
      setSellerDetail(sellerJson.body.seller);
    }

    if (ratingJson.status === SUCCESS_CODE) {
      setSellerRatings(ratingJson.body.ratings);
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
        ratings={sellerRatings}
        onClose={() => {
          dispatch(goBack());
        }}
        onSendRequest={() => {}}
      />
    </PageWrapper>
  );
};

export default SearchDetailPage;
