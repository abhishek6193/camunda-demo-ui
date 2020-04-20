import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Thumb from '../../../Thumb';
import { addProduct, removeProduct } from '../../../../services/cart/actions';
import Checkbox from '../../../Checkbox/index';

const Product = ({ product, addProduct, removeProduct }) => {

  const updateProductList = (isChecked) => {
    if (isChecked) {
      addProduct(product);
    } else {
      removeProduct(product);
    }
  }

  return (
    <div
      className="shelf-item"
      data-sku={product.sku}
    >
      <Thumb
        classes="shelf-item__thumb"
        src={require(`../../../../static/products/${product.sku}_1.jpg`)}
        alt={product.title}
      />
      <p className="shelf-item__title">{product.title}</p>
      <Checkbox updateProductList={updateProductList} />
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired
};

export default connect(
  null,
  { addProduct, removeProduct }
)(Product);
