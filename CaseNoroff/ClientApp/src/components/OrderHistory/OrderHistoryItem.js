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
        const images = this.props.order.orderItems.map(item => {
            return (
                <div className='orderHistoryImgSet' key={item.product.productId}>
                    <img className='historyImg' src={item.product.imgURL} alt={item.product.productName} />
                    <p> X{item.productQuantity}</p>
                </div>
                )
        })
        return (
                <div className='historyItem'>
                <div className='historyItemText'>
                    <h3 className = 'orderDate'>Order date: {date} </h3>
                        <p><strong>Order number: </strong>{order.orderId}</p>
                        <p><strong>Delivery address: </strong>{order.deliveryAddress.streetAddress} {order.deliveryAddress.country}, {order.deliveryAddress.city} {order.deliveryAddress.postalCode}</p>
                        <p><strong>Total: </strong>NOK {total},-</p>
                        <ul className = 'historyImgContainer'>{images}</ul>
                    </div>
                </div>
            )
    }
}