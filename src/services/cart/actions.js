import axios from 'axios';

import { ADD_PRODUCT, REMOVE_PRODUCT, SEND_ORDER_SUBMISSION } from './actionTypes';

import { sendOrderAPI } from '../util';

export const addProduct = product => ({
  type: ADD_PRODUCT,
  payload: product
});

export const removeProduct = product => ({
  type: REMOVE_PRODUCT,
  payload: product
});

export const sendOrderSubmission = order => dispatch => {
  return axios
    .post(sendOrderAPI, order)
    .then(res => {
      return dispatch({
        type: SEND_ORDER_SUBMISSION
      });
    })
    .catch(err => {
      console.log('Could not submit order. Try again later.');
    });
};
