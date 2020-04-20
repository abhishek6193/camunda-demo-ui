import { ADD_PRODUCT, REMOVE_PRODUCT, SEND_ORDER_SUBMISSION } from './actionTypes';

const initialState = {
  products: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        productToAdd: Object.assign({}, action.payload)
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        productToRemove: Object.assign({}, action.payload)
      };
    case SEND_ORDER_SUBMISSION:
      return state;
    default:
      return state;
  }
}
