/* eslint-disable no-nested-ternary */
import Immutable from 'seamless-immutable';
import {
  RESTAURANTS_LIST_FETCH_REQUEST,
  RESTAURANTS_LIST_FETCH_SUCCESS,
  RESTAURANTS_LIST_FETCH_FAIL,
  RESTAURANT_DETAILS_FETCH_REQUEST,
  RESTAURANT_DETAILS_FETCH_SUCCESS,
  RESTAURANT_DETAILS_FETCH_FAIL,
  RESTAURANT_MENU_FETCH_REQUEST,
  RESTAURANT_MENU_FETCH_SUCCESS,
  RESTAURANT_MENU_FETCH_FAIL
} from '../../actions';

const defaultState = Immutable.flatMap({
  allRestaurants: [],
  allRestaurantData: [],
  allRestaurantsLoading: false,
  allRestaurantsError: null,
  restaurantDetails: [],
  restaurantDetailsLoading: false,
  restaurantDetailsError: null,
  menuDetails: [],
  menuLoading: false,
  menuError: null,
  filters: [],
  isSortApplied: false
});
export default (state = defaultState, action) => {
  switch (action.type) {
    case RESTAURANTS_LIST_FETCH_REQUEST:
      return Immutable.merge(state, { allRestaurantsLoading: true });

    case RESTAURANTS_LIST_FETCH_SUCCESS:
      return Immutable.merge(state, {
        allRestaurants: action.data.allRestaurants,
        allRestaurantData: action.data.allRestaurants,
        allRestaurantsLoading: false
      });

    case RESTAURANTS_LIST_FETCH_FAIL:
      return Immutable.merge(state, { allRestaurantsLoading: false, allRestaurantsError: null });

    case RESTAURANT_DETAILS_FETCH_REQUEST:
      return Immutable.merge(state, { restaurantDetailsLoading: true, restaurantDetails: [] });

    case RESTAURANT_DETAILS_FETCH_SUCCESS:
      return Immutable.merge(state, {
        restaurantDetails: action.data.restaurantDetail,
        restaurantDetailsLoading: false
      });

    case RESTAURANT_DETAILS_FETCH_FAIL:
      return Immutable.merge(state, { restaurantDetailsLoading: false, restaurantDetailsError: null });
    case RESTAURANT_MENU_FETCH_REQUEST:
      return Immutable.merge(state, { menuLoading: true });

    case RESTAURANT_MENU_FETCH_SUCCESS:
      return Immutable.merge(state, {
        menuDetails: action.data,
        menuLoading: false
      });

    case RESTAURANT_MENU_FETCH_FAIL:
      return Immutable.merge(state, { menuLoading: false, menuError: null });
    case 'SAVE_FILTERS':
      return Immutable.merge(state, {
        filters: handleFilterList(state.filters, action.data.filterType, action.data.filterValues),
        allRestaurants: getFilteredResults(state.allRestaurantData, action.data.filterType, action.data.filterValues)
      });
    case 'SAVE_SORT':
      return Immutable.merge(state, {
        isSortApplied: action.data,
        allRestaurants: getSortedResults(state.allRestaurantData, action.data)
      });
    default:
      return state;
  }
};

const handleFilterList = (filterState, filterType, filterValues) => {
  let tempFilterState = { ...filterState };
  if (filterValues && filterValues.length > 0) {
    tempFilterState = { ...tempFilterState, [filterType]: filterValues };
  } else delete tempFilterState[filterType];
  return tempFilterState;
};

const getFilteredResults = (allRestaurantsState, filterType, filterValues) => {
  const tempAllRestaurants = [...allRestaurantsState];
  let restList = [];
  if (filterValues && filterValues.length > 0) {
    filterValues.forEach((item) => {
      const filtered = tempAllRestaurants.filter((rest) => (filterType === 'restaurantName'
        ? rest[filterType].toLowerCase().startsWith(filterValues)
        : JSON.parse(rest[filterType]).includes(item)));
      restList = [...restList, ...filtered];
    });
  } else restList = [...allRestaurantsState];
  const filteredSet = new Set(restList);
  return Array.from(filteredSet);
};

const getSortedResults = (allRestaurantsState, isSorted) => {
  const tempAllRestaurants = [...allRestaurantsState];
  if (!isSorted) {
    return tempAllRestaurants;
  } return (
    tempAllRestaurants.sort((x, y) => ((!x.isOpen === y.isOpen) ? 0 : x ? -1 : 1))
  );
};
