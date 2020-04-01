import React from 'react';
import styles from './Shop.css';
import Item from '../Item/Item.js';
import authService from '../api-authorization/AuthorizeService';

export class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.addRef = React.createRef();
        this.state = {
            itemList: [],
            filteredItemList: [],
            addedItems: JSON.parse(sessionStorage.getItem('cartList')),
            addModal: false,

            isAuthenticated: false,
            userName: null,
        };
    }

    async componentDidMount() {
        this.setState({itemList: [], filteredItemList: [] })
		let response = null;
		let list = null;
        try {
            response = await fetch(`https://localhost:62176/ECommerce/Product`).then(resp => resp.json());
            list = [...this.state.itemList];
            list.push(...response);
            this.setState({
                itemList: list, filteredItemList: list
            });
        } catch (e) {
			response = await fetch(`https://localhost:5001/ECommerce/Product`).then(resp => resp.json());
            list = [...this.state.itemList];
            list.push(...response);
            this.setState({
                itemList: list, filteredItemList: list
            });
        }

        this.populateState();

    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }

    filterSearch = () => {
        let search = this.textInput.value.toUpperCase();
        let list = this.state.itemList.filter(i => i.productName.toUpperCase().includes(search))
        this.setState({ filteredItemList: list })
    }

    addItem = (item, event) => {
        let list = []
        if (sessionStorage.getItem('cartList') != null) {
            list = [...this.state.addedItems];
        }
        list.push(item);
        this.setState({ addedItems: list });
        sessionStorage.setItem('cartList', JSON.stringify(list));
        console.log(sessionStorage.getItem('cartList'));
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
