import React from 'react';
import { CartItem } from '../CartItem/CartItem.js'

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
        if (index !== -1) {
            list.splice(index, 1);
            this.setState({ itemList: list });
        }
    }

    render() {
        const list = this.state.itemList.map(item => {
            return (
                <li className='items' key={item.productId}>
                    <CartItem item={item} buttonClick={this.removeItem.bind(null, item)}/>
                </li>
                )
        })
        return (
            <ul>
                {list}
            </ul>
            )
    }
}