import { FETCH_FAILED_ORDERS } from './actionTypes';
import axios from 'axios';

import { failedOrdersAPI, updateFailedOrdersAPI } from '../util';

export const fetchFailedOrders = callback => dispatch => {
  return axios
    .get(failedOrdersAPI)
    .then(res => {

      let orders = res.data;

      if (!!callback) {
        callback();
      }

      return dispatch({
        type: FETCH_FAILED_ORDERS,
        payload: orders
      });
    })
    .catch(err => {
      console.log('Could not fetch orders. Try again later.', err);
    });
};

export const updateFailedOrders = (fileName, callback) => dispatch => {
  return axios
    .get(updateFailedOrdersAPI, {
      params: {
        fileName: fileName
      }
    })
    .then(res => {
      if (res.data === true) {
        return axios
          .get(failedOrdersAPI)
          .then(res => {
            let orders = res.data;

            if (!!callback) {
              callback();
            }

            return dispatch({
              type: FETCH_FAILED_ORDERS,
              payload: orders
            });
          })
          .catch(err => {
            console.log('Could not fetch orders. Try again later.', err);
          });
      }
    })
    .catch(err => {
      console.log('Could not update orders. Try again later.', err);
    });
}
