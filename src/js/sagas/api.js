import axios from 'axios';
import registry from 'app-registry';
import { store } from '../store';

export default async function apiCall(payload) {
  const {
    API_CALL,
    TYPES,
    url,
    isAuthRequired = true
  } = payload;

  // Reading API configs from config/env
  const { apiEndpoint } = registry.get('config');
  const API_URL = `${apiEndpoint}${url}`;

  // Reading auth-token from cookie
  const authToken = '34303304-5475-4d63-9352-0d24ed631b37';

  // Re-routing to login if not authorized

  // Setting API parameters
  const apiParams = {
    ...API_CALL,
    url: API_URL,
    ...(isAuthRequired && {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
  };

  try {
    //  Setting initial state
    if (TYPES.requestType) {
      store.dispatch({ type: TYPES.requestType });
    }
    // Make API call
    const apiResponse = await axios(apiParams);
    if (apiResponse.data) {
      // API call success
      store.dispatch({ type: TYPES.successType, data: apiResponse.data });
      return apiResponse.data;
    }
  } catch (err) {
    // API call failure
    let errMessage = err.message;
    if (err.response) {
      errMessage = err.response.data.message || err.response.data.error.message;
    }
    // Logging the error
    registry.get('logger').info(`The API ${API_URL} returned this error:`, JSON.stringify(errMessage));
    store.dispatch({ type: TYPES.failureType });
  }
  return null;
}
