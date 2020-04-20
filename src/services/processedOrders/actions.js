import { ADD_PROCESSED_PRODUCT } from './actionTypes';

export const addProcessedProduct = product => ({
    type: ADD_PROCESSED_PRODUCT,
    payload: product
});
