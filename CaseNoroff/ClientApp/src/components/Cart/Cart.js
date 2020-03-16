import React from 'react';
import { CartItem } from '../CartItem/CartItem.js'
import styles from './Cart.css'

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

    render() {
        const list = this.state.itemList.map(item => {
            
            return (
                <li className = 'cartLi' key={item.productId}>
                    <CartItem item={item} buttonClick={this.removeItem.bind(null, item)}/>
                </li>
                )
        })
        return (
            <div>
                <h2 id= 'cartTitle'>Cart</h2>
                <ul id='cartContainer'>
                    {list}
                </ul>
            </div>
            )
    }
}