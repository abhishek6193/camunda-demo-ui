import './ProductEditor.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addProcessedProduct } from '../../services/processedOrders/actions';

class ProductEditor extends Component {

    state = {
        id: this.props.product.id,
        sku: this.props.product.sku,
        title: this.props.product.title,
        description: this.props.product.description,
        availableSizes: this.props.product.availableSizes,
        style: this.props.product.style,
        price: this.props.product.price,
        installments: this.props.product.installments,
        currencyId: this.props.product.currencyId,
        currencyFormat: this.props.product.currencyFormat,
        isFreeShipping: this.props.product.isFreeShipping
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.name === 'isFreeShipping' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = () => {
        this.props.addProcessedProduct(this.state);
        this.props.closeEditor();
    }

    checkEquivalence = (a, b) => {
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
        if (aProps.length !== bProps.length) {
            return false;
        }
        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
            if (a[propName] != b[propName]) {
                return false;
            }
        }
        return true;
    }

    render() {
        return (
            <form>
                <div className="formContainer">
                    <h1>Product Editor</h1>
                    <p>Please edit the details below.</p>
                    <hr />
                    <label>
                        Name:
                    <input
                            name="title"
                            type="text"
                            value={this.state.title}
                            onChange={this.handleInputChange} required />
                    </label>
                    <br />
                    <label>
                        Style:
                    <input
                            name="style"
                            type="text"
                            value={this.state.style}
                            onChange={this.handleInputChange} required />
                    </label>
                    <br />
                    <label>
                        Price:
                    <input
                            name="price"
                            type="number"
                            value={this.state.price}
                            onChange={this.handleInputChange} required />
                    </label>
                    <br />
                    <label>
                        Installments:
                    <input
                            name="installments"
                            type="number"
                            value={this.state.installments}
                            onChange={this.handleInputChange} required />
                    </label>
                    <br />
                    <label>
                        Currency ID:
                    <input
                            name="currencyId"
                            type="text"
                            value={this.state.currencyId}
                            onChange={this.handleInputChange} required />
                    </label>
                    <br />
                    <label>
                        Currency Format:
                    <input
                            name="currencyFormat"
                            type="text"
                            value={this.state.currencyFormat}
                            onChange={this.handleInputChange} required />
                    </label>
                    <br />
                    <label>
                        Free Shipping:
                    <input
                            name="isFreeShipping"
                            type="checkbox"
                            checked={this.state.isFreeShipping}
                            onChange={this.handleInputChange} required />
                    </label>
                    <button className="saveBtn" onClick={this.handleSubmit} disabled={this.checkEquivalence(this.state, this.props.product)} >Save</button>
                </div>
            </form>
        )
    }
}

export default connect(
    null,
    { addProcessedProduct }
)(ProductEditor);
