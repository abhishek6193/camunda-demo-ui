import './FailedOrders.scss';
import React, { Component } from 'react';

import { connect } from 'react-redux';

import { fetchFailedOrders } from '../../services/failedOrders/actions';

import Spinner from '../Spinner';
import ManualProcessingForm from '../ManualProcessingForm';

class FailedOrders extends Component {

    state = {
        isLoading: false,
        showManualProcessingForm: false
    };

    componentDidMount() {
        window.scrollTo(0,document.body.scrollHeight);
    }

    componentDidUpdate() {
        window.scrollTo(0,document.body.scrollHeight);
    }

    openManualProcessingForm = order => {
        this.setState({ ...this.state, showManualProcessingForm: true, order: order });
    }

    closeManualProcessingForm = () => {
        this.setState({ ...this.state, showManualProcessingForm: false });
    }

    render() {

    const { failedOrders } = this.props;
    const { isLoading, showManualProcessingForm, order } = this.state;

        return (
            this.props.failedOrders.length === 0 ? 
                <div className="emptyFailedOrdersBox">
                    <hr />
                    <h2> No Failed Orders at the moment! </h2>
                    <hr />
                </div> :
            <div className="failedOrdersContainer">
            {isLoading && <Spinner />}
                <div className="table">
                    <div className="table-row">
                        <div className="table-cell-heading">
                            S. No.
                        </div>
                        <div className="table-cell-heading">
                            Order ID
                        </div>
                        <div className="table-cell-heading">
                            Action
                        </div>
                    </div>
                    { failedOrders.map( (order, index) => {
                        return (
                            <div key={index} className="table-row">
                                <div className="table-cell">
                                    {index+1}
                                </div>
                                <div className="table-cell">
                                    {order.order_id}
                                </div>
                                <div className="table-cell">
                                    <span onClick={() => this.openManualProcessingForm(order)} className="editLink">Edit</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
                { showManualProcessingForm ? <ManualProcessingForm order={order} closeForm={this.closeManualProcessingForm} /> : undefined }
                </div>
        )
    }
}

const mapStateToProps = state => ({
    failedOrders: state.failedOrders.orders
});
  
export default connect(
    mapStateToProps,
    { fetchFailedOrders }
)(FailedOrders);
