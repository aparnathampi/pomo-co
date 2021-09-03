import { connect } from 'react-redux';
import RestaurantDetail from './restaurantDetail';
import { fetchResturantDetails, fetchMenu } from '../home/api';

const mapStateToProps = ({ home }) => ({
  restaurantDetails: home.restaurantDetails,
  restaurantDetailsLoading: home.restaurantDetailsLoading,
  restaurantDetailsError: home.restaurantDetailsError,
  menu: home.menuDetails,
  menuLoading: home.menuLoading,
  menuError: home.menuError
});

const mapDispatchToProps = () => ({
    fetchResturantDetails,
    fetchMenu
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetail);
