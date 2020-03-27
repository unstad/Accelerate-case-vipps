import React from 'react';
import authService from '../api-authorization/AuthorizeService'
import OrderHistoryItem from './OrderHistoryItem.js'
import styles from './OrderHistory.css'
import { Link } from 'react-router-dom';

export class OrderHistory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        this.populateOrderHistory();
    }

    async populateOrderHistory() {
       
        try {
            const token = await authService.getAccessToken();
            const response = await fetch('https://localhost:44364/ECommerce/order', {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            }).then(resp => resp.json());
            let list = [...this.state.orders]
            list.push(response)
            this.setState({ orders: list[0] })
        } catch (e) {
            console.error(e);
        }

    }

    render() {
        if (this.state.orders.length == 0) {
            return (
                <div className = 'orderHLoading'>
                    <h4>No orders</h4>
                </div>
                )
        } else {

            const orders = this.state.orders.map(order => {
                return (
                    <Link className = 'orderLink' to={`/orderHistory/order/${order.orderId}`} key={order.orderId}> 
                        <li className = 'ohItem' key={order.orderId}>
                            <OrderHistoryItem order={order} />
                        </li>
                    </Link>
                )
            })
            return (
                <div id = 'historyBody'>
                    <h3> Order History </h3>
                    <ul id = 'orderHistoryList'>{orders}</ul>
                </div>
            )
        }
        
    }
}
