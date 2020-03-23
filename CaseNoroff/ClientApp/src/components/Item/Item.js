import React from 'react';
import styles from './Item.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import ItemModal from './ItemModal.js'

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.modalRef = React.createRef();
        
        this.state = {
            //sizes: this.props.item.sizes,
            modal: false,
            dropdownOpen: false
        }
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false)
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false)
    }
    handleClick = (e) => {
        if (this.modalRef.contains(e.target)) {
            console.log("inside")
            return;
        }
        this.hideModal();
    }

    //toggle = () => {
    //    console.log("toggle")
    //    if (!this.state.modal) {
    //        this.showModal();
    //    } else {
    //        this.hideModal();
    //    }
    //}

    showAddModal = () => {

    }

    showModal = () => {
        if (this.state.modal == true) {
            return;
        } else {
            const mod = this.modalRef;
            mod.style.display = 'block';
            this.setState({ modal: true })
        }   
    }
    hideModal = () => {
        const mod = this.modalRef;
        mod.style.display = 'none';
        this.setState({ modal: false })
    }
    toggleSize = () => {
        if (!this.state.dropdownOpen) {
            this.setState({ dropdownOpen: true })
        } else {
            this.setState({ dropdownOpen: false })
        }
    }


    render() {
        /*const sizes = this.state.sizes.map(size => {
            return (
                <DropdownItem key={size}>{size}</DropdownItem>
                )
        })*/
        const item = this.props.item;
        return (
            <div className='itemContainer'>
                <Card onClick={() => this.showModal()}>
                    <CardImg className='itemImage' top width="100%" src={item.imgURL} alt={item.productName} />
                    <CardBody className='itemText'>
                        <CardTitle className='itemTitle'>{item.productName}</CardTitle>
                        <CardText><strong>NOK {item.price},-</strong></CardText>
                    </CardBody>
                </Card>
                <ItemModal thisRef={modalRef => this.modalRef = modalRef} item={item} addClick={this.props.buttonClick} exitClick={this.hideModal} />
            </div>
        )
    }
}
