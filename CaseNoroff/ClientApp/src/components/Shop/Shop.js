import React from 'react';
import styles from './Shop.css';
import Item from '../Item/Item.js';
import { Link } from 'react-router-dom';

export class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: [],
            filteredItemList: [],
            addedItems: JSON.parse(localStorage.getItem('cartList'))
        };
    }

    async componentDidMount() {
        this.setState({itemList: [], filteredItemList: [] })
        const api_url = `https://localhost:44364/ECommerce/Product`
        try {
            const response = await fetch(api_url).then(resp => resp.json());
            let list = [...this.state.itemList];
            list.push(...response);
            this.setState({
                itemList: list, filteredItemList: list
            });
        } catch (e) {
            console.error(e);
        }

    }

    filterSearch = () => {
        let search = this.textInput.value.toUpperCase();
        let list = this.state.itemList.filter(i => i.productName.toUpperCase().includes(search))
        this.setState({ filteredItemList: list })
    }

    addItem = (item, event) => {
        let list = []
        if (localStorage.getItem('cartList') != 0) {
            list = [...this.state.addedItems];
        }
        list.push(item);
        console.log(list);
        this.setState({ addedItems: list });
        console.log(this.state.addedItems)
        localStorage.setItem('cartList', JSON.stringify(list));
    }

    render() {
        const items = this.state.filteredItemList.map(item => {
            return (
                <li className='items' key={item.productId}>
                    <Item item={item} buttonClick={this.addItem.bind(null, item)} />
                </li>
            )
        });
        return (
            <div id='container'>
                <input type='text'
                    onChange={() => this.filterSearch()}
                    ref={el => this.textInput = el}
                    id='searchBar' placeholder='Search item'>
                </input>
                <ul id='itemList'>{items}</ul>
            </div>
        )
    }
}
