import React from 'react';
import { CartItem } from '../CartItem/CartItem.js'
import styles from './Cart.css'
import { Button } from 'reactstrap';

export class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: []
        }
    }

    componentDidMount() {
        if (localStorage.getItem('cartList') !== 0) {
            this.setState({ itemList: JSON.parse(localStorage.getItem('cartList')) })
        }
    }

    removeItem = (item, event) => {
        let list = [...this.state.itemList];
        for (let i = 0; i < list.length; i++) {
            if (list[i] === item) {
                list.splice(i, 1)
            }
        }
        localStorage.setItem('cartList', JSON.stringify(list));
        this.setState({ itemList: list })
    }

    sumPrice = () => {
        let sum = 0;
        this.state.itemList.map(item => {
            sum += item.price
        })
        return sum;
    }

	goToOrderpage = () => {
		this.props.history.push('/order');	
	}

    render() {
        if (localStorage.getItem('cartList') === 0 || this.state.itemList.length === 0) {
            return (
                <div id='emptyCart'>
                    <h2 className='cartTitle'>Cart</h2>
                    <div>
                        <p id= 'emptyText' >Nothing added to cart</p>
                    </div>
                </div>
                
            )
        } else {
            const list = this.state.itemList.map(item => {
                return (
                    <li className='cartLi' key={item.productId}>
                        <CartItem item={item} buttonClick={this.removeItem.bind(null, item)} />
                    </li>
                )
            })

            return (
                <div>
                    <h2 className='cartTitle'>Cart</h2>
                    <div id='cartContent'>
                        <ul id='cartContainer'>
                            {list}
                        </ul>
                        <div id='checkout'>
                            <h3>Checkout</h3>
                            <p id='subTotal' ><strong>Sub-total:</strong> NOK {this.sumPrice()}.-</p>
                            <Button id='confirmBtn' onClick={this.goToOrderpage}>Confirm</Button>
                        </div>
                    </div>
                </div>
            )
        }

    }
}
