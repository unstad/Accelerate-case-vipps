import React from 'react';
import styles from './OrderHistoryItem.css';


export default class OrderHistoryItem extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const order = this.props.order;
        const date = order.orderDate.substring(0, 10);
        let total = 0;
        for (let i = 0; i < order.orderItems.length; i++) {
            total += order.orderItems[i].totalPrice;
        }
        return (
                <div className='historyItem'>
                    <div className = 'historyItemText'>
                        <h3>Order date: {date} </h3>
                        <p><strong>Order number: </strong>{order.orderId}</p>
                        <p><strong>Delivery address: </strong>{order.deliveryAddress.streetAddress} {order.deliveryAddress.country}, {order.deliveryAddress.city} {order.deliveryAddress.postalCode}</p>
                        <p><strong>Total: </strong>NOK {total},-</p>
                        <img className='historyImg' src={order.orderItems[0].product.imgURL} alt={order.orderItems[0].product.productName} /> 
                    </div>
                </div>
            )
    }
}