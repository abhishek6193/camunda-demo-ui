import { ADD_PROCESSED_PRODUCT } from './actionTypes';

const initialState = {
  products: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_PROCESSED_PRODUCT:
      return {
        ...state,
        processedProductToAdd: Object.assign({}, action.payload)
      };
    default:
      return state;
  }
}
