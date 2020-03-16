import React from 'react';
import { CartItem } from '../CartItem/CartItem.js'
import styles from './Cart.css'
import { Button } from 'reactstrap';

export class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: JSON.parse(localStorage.getItem('cartList'))
        }
    }

    removeItem = (item, event) => {
        console.log("Remove clicked")
        
        let list = [...this.state.itemList];
        let index = list.indexOf(event.target.value);
        console.log(item);
        for (let i = 0; i < list.length; i++) {
            if (list[i] == item) {
                list.splice(i, 1)
            }
        }
        console.log(list);
        localStorage.setItem('cartList', JSON.stringify(list));
        this.setState({ itemList: list })
        console.log(this.state.itemList);
    }

    sumPrice = () => {
        let sum = 0;
        this.state.itemList.map(item => {
            sum += item.price
        })
        return sum;
    }

    render() {
        if (this.state.itemList.length == 0) {
            return (
                <div>
                    <p>Nothing added to cart</p>
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
                    <h2 id='cartTitle'>Cart</h2>
                    <div id = 'cartContent'>
                        <ul id='cartContainer'>
                            {list}
                        </ul>
                        <div id = "checkout">
                            <h3>Checkout</h3>
                            <p id='subTotal' ><strong>Sub-total:</strong> NOK {this.sumPrice()}.-</p>
                            <Button id='confirmBtn'>Confirm</Button>
                        </div>
                    </div>
                </div>
            )
        }
       
    }
}