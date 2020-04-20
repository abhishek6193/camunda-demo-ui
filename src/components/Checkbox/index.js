import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Checkbox.css';

class Checkbox extends Component {
  static propTypes = {
    updateProductList: PropTypes.func.isRequired
  };

  state = {
    isChecked: false
  };

  toggleCheckboxChange = () => {
    const { updateProductList } = this.props;
    this.setState(({ isChecked }) => ({
      isChecked: !isChecked
    }), () => {
      updateProductList(this.state.isChecked);
    });
  };

  render() {
    let min = 1;
    let max = 100000000;
    let random = min + (Math.random() * (max - min));

    random = random.toFixed(0);

    const { isChecked } = this.state;

    return (
      <div>
          <div className='round'>
          <input
            id={random}
            type="checkbox"
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />
          <label htmlFor={random}></label>
          </div>
      </div>
    );
  }
}

export default Checkbox;
