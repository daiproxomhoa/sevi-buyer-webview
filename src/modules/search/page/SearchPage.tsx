import { push, replace } from 'connected-react-router';
import queryString from 'query-string';
import * as React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useSWRInfinite } from 'swr';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { SUCCESS_CODE } from '../../../constants';
import { AppState } from '../../../redux/reducer';
import { PageWrapper } from '../../common/component/elements';
import { fetchThunk } from '../../common/redux/thunk';
import { setProfileData, updateProfile } from '../../profile/redux/profileReducer';
import { setDescription } from '../../request/redux/requestReducer';
import FilterBox from '../component/filter/FilterBox';
import HomeSearchBox from '../component/HomeSearchBox';
import SearchBox from '../component/SearchBox';
import SearchResultBox from '../component/SearchResultBox';
import { SEARCH_PAGE_SIZE } from '../constants';
import { defaultSearchFilter, ISeller, ISellerSearchFilter } from '../model';
import { parseSearchParams, stringifySearchParams } from '../utils';

interface ISearchPageProps {}

const SearchPage: React.FunctionComponent<ISearchPageProps> = (props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const location = useLocation();

  const { profile } = useSelector(
    (state: AppState) => ({
      profile: state.profile.data,
    }),
    shallowEqual,
  );

  const [filter, setFilter] = React.useState<ISellerSearchFilter>(defaultSearchFilter);

  const [disableLoadMore, setDisableLoadMore] = React.useState<boolean>(false);

  const [openFilter, setOpenFilter] = React.useState<boolean>(false);

  const setSearchParams = React.useCallback(
    (values: ISellerSearchFilter) => {
      dispatch(
        replace({
          search: stringifySearchParams(values),
        }),
      );
    },
    [dispatch],
  );

  const { data, size, setSize, isValidating } = useSWRInfinite(
    (pageIndex) => [API_PATHS.sellerSearch, pageIndex, filter],
    async (url: string, pageIndex: number, filterParams: ISellerSearchFilter) => {
      const res = await dispatch(
        fetchThunk(url, 'post', {
          ...filterParams,
          lat: filterParams.address.address.lat,
          lng: filterParams.address.address.lng,
          radius: filterParams.radius * 1000,
          offset: pageIndex * SEARCH_PAGE_SIZE,
        }),
      );

      if (res.status !== SUCCESS_CODE) {
        throw new Error(res.status);
      }

      if (res.body.length < SEARCH_PAGE_SIZE) {
        setDisableLoadMore(true);
      } else {
        setDisableLoadMore(false);
      }

      return {
        searchData: res.body,
        pageIndex,
      };
    },
  );

  const onSellerSearch = React.useCallback(
    async (values: ISellerSearchFilter) => {
      setFilter(values);

      setSize(1);

      setSearchParams(values);

      dispatch(setDescription(values.string));
    },
    [dispatch, setSearchParams, setSize],
  );

  const onViewSearchDetail = React.useCallback(
    async (info: ISeller) => {
      dispatch(
        push({
          pathname: ROUTES.searchDetail,
          search: queryString.stringify({ id: info.id }),
        }),
      );
    },
    [dispatch],
  );

  const onUpdateProfile = React.useCallback(
    async (data: ISellerSearchFilter) => {
      const addresses = profile?.addresses;

      if (addresses && addresses.length > 1) {
        const index = addresses.findIndex(
          (obj) => obj.address.formattedAddress === data.address.address.formattedAddress,
        );

        if (index > 0) {
          const adr = addresses.splice(index, 1);
          addresses.unshift(...adr);
        }

        const newProfile = { ...profile, addresses };

        dispatch(updateProfile(newProfile));

        dispatch(setProfileData(newProfile));
      }
    },
    [dispatch, profile],
  );

  React.useEffect(() => {
    setFilter(parseSearchParams(location.search, profile));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  console.log(data);
  return (
    <>
      <PageWrapper>
        <SearchBox
          filter={filter}
          onSellerSearch={(str: string) => onSellerSearch({ ...filter, string: str, searched: true })}
          openFilter={() => setOpenFilter(true)}
        />

        {filter.searched ? (
          <SearchResultBox
            filter={filter}
            loading={isValidating}
            disableLoadMore={disableLoadMore}
            data={data}
            onSelectSeller={(info: ISeller) => onViewSearchDetail(info)}
            loadMore={() => setSize(size + 1)}
          />
        ) : (
          <HomeSearchBox onSearch={(string) => onSellerSearch({ ...filter, searched: true, string })} />
        )}
      </PageWrapper>

      <FilterBox
        filter={filter}
        profile={profile}
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        onFilter={(data) => {
          onUpdateProfile(data);
          onSellerSearch({ ...data, searched: true });
          setOpenFilter(false);
        }}
      />
    </>
  );
};

export default SearchPage;
