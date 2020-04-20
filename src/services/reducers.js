import { combineReducers } from 'redux';
import shelfReducer from './shelf/reducer';
import cartReducer from './cart/reducer';
import failedOrderReducer from './failedOrders/reducer';
import processedOrderReducer from './processedOrders/reducer';

export default combineReducers({
  shelf: shelfReducer,
  cart: cartReducer,
  failedOrders: failedOrderReducer,
  processedOrder: processedOrderReducer
});
