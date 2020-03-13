import React from 'react';
import styles from './Shop.css';
import chinos from '../Images/chinos.jpg'
import ullgenser from '../Images/ullgenser.jpg'
import sko from '../Images/sko.jpg'; 
import sokker from '../Images/sokker.jpg';
import jeans from '../Images/jeans.jpg';
import jakke  from '../Images/jakke.jpg';
import Item from '../Item/Item.js';

export class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: [
                {
                    id: 1,
                    name: 'Campbell strikket genser',
                    description: 'Oransje ull-genser',
                    price: 899,
                    image: ullgenser,
                    sizes: ["S", "M", "L"]
                },
                {
                    id: 2,
                    name: 'Chino-bukse',
                    description: 'Beige chinos for dame',
                    price: 499,
                    image: chinos,
                    sizes: ["S", "M", "L"]
                },
                {
                    id: 3,
                    name: 'High waist mom jeans-bukse',
                    description: 'Blå jeans',
                    price: 699,
                    image: jeans,
                    sizes: ["S", "M", "L"]
                },
                {
                    id: 4,
                    name: 'Stavanger jakke',
                    description: 'jakke fra Stavanger',
                    price: 988,
                    image: jakke,
                    sizes: ["S", "M", "L"]
                },
                {
                    id: 5,
                    name: 'Scott Marlow sko',
                    description: 'The Scott Marlow sneaker is a new variant of the Scott collection.',
                    price: 2299,
                    image: sko,
                    sizes: ["36", "40", "42"]
                },
                {
                    id: 6,
                    name: 'sokker',
                    description: 'Product Features * Comfortable Eco-Friendly Crew Sock * Toe & Heel Cushioning * Arch Support * Anti-Microbial Technology * Made in the USA',
                    price: 99,
                    image: sokker,
                    sizes: ["Onesize"]
                }
            ],
            filteredItemList: [],
        };
    }

    componentDidMount() {
        this.setState({ filteredItemList: this.state.itemList })
    }

    filterSearch = () => {
        let search = this.textInput.value.toUpperCase();
        let list = this.state.itemList.filter(i => i.name.toUpperCase().includes(search))
        this.setState({ filteredItemList: list })
    }

    render() {
        const items = this.state.filteredItemList.map(item => {
            return (
                <li className='items' key={item.id}>
                    <Item item={item}/>
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
                <ul id = 'itemList'>{items}</ul>
            </div>
        )
    }
}
