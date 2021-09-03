import apiCall from '../../sagas/api';
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

export async function fetchAllRestaurants() {
  const url = '/allRestaurants';
  const apiArgs = {
    API_CALL: {
      method: 'GET'
    },
    url,
    TYPES: {
      requestType: RESTAURANTS_LIST_FETCH_REQUEST,
      successType: RESTAURANTS_LIST_FETCH_SUCCESS,
      failureType: RESTAURANTS_LIST_FETCH_FAIL
    }
  };
  apiCall(apiArgs);
}

export async function fetchResturantDetails(id) {
  const url = `/restaurantDetails/${id}`;
  const apiArgs = {
    API_CALL: {
      method: 'GET'
    },
    url,
    TYPES: {
      requestType: RESTAURANT_DETAILS_FETCH_REQUEST,
      successType: RESTAURANT_DETAILS_FETCH_SUCCESS,
      failureType: RESTAURANT_DETAILS_FETCH_FAIL
    }
  };
  apiCall(apiArgs);
}

export async function fetchMenu(restaurantName) {
  const url = `/menu?filter[restaurantName]=${restaurantName}`;
  const apiArgs = {
    API_CALL: {
      method: 'GET'
    },
    url,
    TYPES: {
      requestType: RESTAURANT_MENU_FETCH_REQUEST,
      successType: RESTAURANT_MENU_FETCH_SUCCESS,
      failureType: RESTAURANT_MENU_FETCH_FAIL
    }
  };
  apiCall(apiArgs);
}
