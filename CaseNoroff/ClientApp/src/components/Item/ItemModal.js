import React from 'react';
import styles from './ItemModal.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

export default class ItemModal extends React.Component {
    constructor(props) {
        super(props);
        this.addRef = React.createRef();

    }

    showAddModal = () => {
        this.addRef.style.display = 'block'
        setTimeout(() => 
            this.hideAddModal(), 1500
        )
    }

    hideAddModal = () => {
        this.addRef.style.display = 'none'
    }

    addItem = () => {
        { this.props.addClick() };
        this.showAddModal();

    }
    render() {
        const item = this.props.item;
        return (
            <div className='modal' ref={this.props.thisRef}>
                <button id='modalExitBtn' onClick={this.props.exitClick}>x</button>
                <div className='addModal' ref={addRef => this.addRef = addRef}>
                    <p>{item.productName} is added to cart</p>
                </div> 
                <div className='modalContent'>
                    <h3 className = 'modalItemName' >{item.productName}</h3>
                    <CardImg className='modalImage' top width="100%" src={item.imgURL} alt={item.productName} />
                    <div className="modalText">
                        <CardSubtitle>Description</CardSubtitle>
                        <CardText>{item.description}</CardText>
                        <CardText className='modalItemPrice'><strong>NOK {item.price},-</strong></CardText>
                    </div>
                    <footer className='modalButtons'>
                        <Button className='addBtn' onClick={this.addItem}>Add to cart</Button>
                    </footer>
                </div>
                
            </div>
            )
    }
}

