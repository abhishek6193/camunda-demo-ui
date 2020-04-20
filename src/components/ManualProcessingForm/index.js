import './ManualProcessingForm.scss';
import React, { Component } from 'react';

import { connect } from 'react-redux';

import ProductEditor from '../ProductEditor';
import { updateFailedOrders } from '../../services/failedOrders/actions';

class ManualProcessingForm extends Component {

    state = {
        showProductEditor: false,
        order: this.props.order
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newProcessedProduct !== this.props.newProcessedProduct) {
            this.addProcessedProduct(nextProps.newProcessedProduct);
        }
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '15px';
    }

    componentWillUnmount() {
        document.body.style.overflow = 'visible';
        document.body.style.paddingRight = '0';
    }

    openProductEditor = product => {
        this.setState({ ...this.state, showProductEditor: true, product: product });
    }

    closeProductEditor = () => {
        this.setState({ ...this.state, showProductEditor: false });
    }

    addProcessedProduct = product => {
        const { processedProducts } = this.props;
        let productAlreadyProcessed = false;
    
        processedProducts.forEach( (pp,index) => {
          if (pp.id === product.id) {
            productAlreadyProcessed = true;
            processedProducts.splice(index,1,product);
          }
        });
    
        if (!productAlreadyProcessed) {
          processedProducts.push(product);
        }
    };

    resetProcessedProducts = () => {
        this.props.processedProducts.splice(0,this.props.processedProducts.length);
    }

    submitProcessedOrder = () => {
        const updatedProducts = this.props.order.products.map(obj => this.props.processedProducts.find(o => o.id === obj.id) || obj);
        const order = {
          order_id: this.props.order.order_id,
          products: updatedProducts,
          order_status: "Processed",
          date: new Date().toLocaleString(),
          order_type: this.props.order.order_type,
          operation_mode: this.props.order.operation_mode,
          profile: this.props.order.profile
        }
        const element = document.createElement("a");
    
        const file = new Blob([JSON.stringify(order, null, 2)], { type: 'application/json' });
        element.href = URL.createObjectURL(file);
        element.download = "Order-" + this.props.order.order_id + ".json";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        this.props.updateFailedOrders(element.download);
        this.resetProcessedProducts();
        this.props.closeForm();
    }

    render() {
        return (
            <div className="manualProcessingFormContainer">
                <div className="manualProcessingFormContent">
                    <div className="manualProcessingFormHeader">
                        <span className="close" onClick={this.props.closeForm}>&times;</span>
                        <h2>Manual Processing Form</h2>
                    </div>
                    <div className="manualProcessingFormBody">
                        {!this.state.showProductEditor ? 
                        <React.Fragment>
                            Select the product to edit:
                            <ul className="productEditList">
                                {this.props.order.products.map((product, index) => <li key={index} onClick={() => this.openProductEditor(product)}>{product.title}</li>)}
                            </ul>
                        </React.Fragment> : undefined}
                        {this.state.showProductEditor ? <ProductEditor product={this.state.product} closeEditor={this.closeProductEditor} /> : undefined}
                    </div>
                    <div className="manualProcessingFormFooter">
                        <div className="process-button">
                            <button className="manualProcessFormButton" disabled={this.props.processedProducts.length===0} onClick={this.submitProcessedOrder} >Process Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    processedProducts: state.processedOrder.products,
    newProcessedProduct: state.processedOrder.processedProductToAdd,
});

export default connect(
    mapStateToProps,
    { updateFailedOrders }
)(ManualProcessingForm);
