import React from 'react';
import styles from './Item.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.modalRef = React.createRef(); 
        this.state = {
            id: this.props.item.productId,
            name: this.props.item.productName,
            description: this.props.item.description,
            price: this.props.item.price,
            image: this.props.item.imgURL,
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
    hanldeClick = (e) => {
        if (this.modalRef.contains(e.target)) {
            return;
        }
        this.toggle();
    }

    toggle = () => {
        if (!this.state.modal) {
            const mod = this.modalRef;
            mod.style.display = 'block';
            this.setState({ modal: true })
        } else {
            const mod = this.modalRef;
            mod.style.display = 'none';
            this.setState({ modal: false })
        }
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
        return (
            <div className='itemContainer'>
                <Card onClick={() => this.toggle()}>
                    <CardImg className='itemImage' top width="100%" src={this.state.image} alt={this.state.name} />
                    <CardBody>
                        <CardTitle>{this.state.name}</CardTitle>
                        <CardSubtitle>price</CardSubtitle>
                        <CardText>NOK {this.state.price},-</CardText>
                    </CardBody>
                </Card>
                <div className='modal' ref={modalRef => this.modalRef = modalRef}>
                    <button id='modalExitBtn' onClick={() => this.toggle()}>x</button>
                    <div className='modalContent'>
                        <h3>{this.state.name}</h3>
                        <CardImg className='itemImage' top width="100%" src={this.state.image} alt={this.state.name} />
                        <div className="modalText">
                            <CardSubtitle>Price</CardSubtitle>
                            <CardText>NOK {this.state.price},-</CardText>
                            <CardSubtitle>Description</CardSubtitle>
                            <CardText>{this.state.description}</CardText>
                        </div>
                        <footer className='modalButtons'>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={() => this.toggleSize()}>
                                <DropdownToggle caret>
                                    Size
                                </DropdownToggle>
                            </Dropdown>
                            <Button className='addBtn' onClick={this.props.buttonClick}>Add to cart</Button>
                        </footer>
                    </div>
                </div>
            </div>
        )
    }
}
