import React from 'react';
import styles from './OrderHOrder.css';
import authService from '../api-authorization/AuthorizeService';

export class OrderHOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderID: this.props.match.params.orderID,
            order: []
        }
    }

    componentDidMount() {
        this.populateOrder();
    }
    totalQuantity = () => {
        let total = 0;
        this.state.order.orderItems.map(item => {
            total += item.productQuantity;
        })
        return total;
    }
    async populateOrder() {

        try {
            const token = await authService.getAccessToken();
            const response = await fetch(`https://localhost:44364/ECommerce/Order/${this.state.orderID}`, {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            }).then(resp => resp.json());
            let list = response
            this.setState({ order: list })
        } catch (e) {
            console.error(e);
        }

    }
     
    render() {

        if (this.state.order.length == 0) {
            return (
                <div id='ohOrderItem'>
                    <h3> Order</h3>
                    <p>Loading...</p>
                </div>
            )
        } else {
            const thisOrder = this.state.order;
            const items = thisOrder.orderItems.map(item => {
                return (
                    <li className='ohItemLI' key={item.productId}>
                        <div className = 'ohItemText'>
                            <h4>{item.product.productName}</h4>
                            <p><strong className='conItemText'>Productnumber: </strong>{item.productId} </p>
                            <p><strong className='conItemText'>Description: </strong>{item.product.description}</p>
                            <p><strong className='conItemText'>Quantity: </strong>{item.productQuantity}</p>
                            <p><strong className='conItemText'>Price: </strong>NOK {item.totalPrice},-</p>
                        </div>
                        <img className = 'ohOrderImg' src={item.product.imgURL} alt={item.product.productName}/>
                    </li>
                )
            })
            const address = thisOrder.deliveryAddress;
            return (
                <div id='ohOrderItem'>
                    <h3>Order</h3>
                    <div className='ohOrderContent'>
                        <div className='ohOrderText'>
                            <p><strong className='conText'>Date ordered: </strong>{thisOrder.orderDate.substring(0, 10)} </p>
                            <p><strong className='conText'>Order number: </strong>{thisOrder.orderId}</p>
                            <p><strong className='conText'>Address: </strong>{address.streetAddress}</p>
                            <p><strong className='conText'>Postal: </strong>{address.city}, {address.postalCode}</p>
                            <p><strong className='conText'>Country: </strong>{address.country} </p>
                            <p><strong className='conText'>Items ordered({this.totalQuantity()}): </strong> </p>
                        </div>
                        <ul className='ohOrderUL'>
                            {items}
                        </ul>
                    </div>
                </div>
            )
        }
        
    }
}