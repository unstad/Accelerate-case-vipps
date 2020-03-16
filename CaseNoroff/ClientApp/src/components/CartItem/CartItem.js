import React from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

export class CartItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.item.productId,
            name: this.props.item.productName,
            price: this.props.item.price,
            image: this.props.item.imgURL,
            //sizes: this.props.item.sizes,
        }
    }

    render() {
        return (
            <div className='itemContainer'>
                <Card>
                    <CardImg className='itemImage' top width="100%" src={this.state.image} alt={this.state.name} />
                    <CardBody>
                        <CardTitle>{this.state.name}</CardTitle>
                        <CardSubtitle>price</CardSubtitle>
                        <CardText>NOK {this.state.price},-</CardText>
                        <Button  onClick={this.props.buttonClick}>Remove from cart</Button>
                    </CardBody>
                </Card>
            </div>
        )
    }
}