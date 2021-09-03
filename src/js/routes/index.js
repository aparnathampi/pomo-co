import { connect } from 'react-redux';
import Routes from './routes';
import { fetchAllRestaurants } from '../containers/home/api';

const mapStateToProps = ({ home }) => ({
  allRestaurants: home.allRestaurants,
  allRestaurantData: home.allRestaurantData,
  allRestaurantsLoading: home.allRestaurantsLoading,
  allRestaurantsError: home.allRestaurantsError,
  filtersArray: home.filters,
  isSortApplied: home.isSortApplied

});

const mapDispatchToProps = (dispatch) => ({
  fetchAllRestaurants,
  saveFilters: (data) => {
    dispatch({ type: 'SAVE_FILTERS', data });
  },
  saveSort: (data) => {
    dispatch({ type: 'SAVE_SORT', data });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
