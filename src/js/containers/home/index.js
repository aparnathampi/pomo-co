import { connect } from 'react-redux';
import Home from './home';
import { fetchAllRestaurants } from './api';

const mapStateToProps = ({ home }) => ({
  allRestaurants: home.allRestaurants,
  allRestaurantData: home.allRestaurantData,
  allRestaurantsLoading: home.allRestaurantsLoading,
  allRestaurantsError: home.allRestaurantsError
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllRestaurants,
  applyFilter: (data) => {
    dispatch({ type: 'SAVE_FILTERS', data });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
