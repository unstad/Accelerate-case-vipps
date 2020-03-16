import React from 'react';
import { Button } from 'reactstrap';
import styles from './CartItem.css';

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
            /*<div className='itemContainer'>
                <Card className = 'card'>
                    <CardImg className='itemImage' top width="100%" src={this.state.image} alt={this.state.name} />
                    <CardBody>
                        <CardTitle>{this.state.name}</CardTitle>
                        <CardSubtitle>price</CardSubtitle>
                        <CardText>NOK {this.state.price},-</CardText>
                        <Button  onClick={this.props.buttonClick}>Remove from cart</Button>
                    </CardBody>
                </Card>
            </div>*/

            <div className='cartContainer'>
                <img className='cartItemImage' top width="100%" src={this.state.image} alt={this.state.name} />
                <div className='cartItemText'>
                    <div className='cartItemName'>
                        <h6>{this.state.name}</h6>
                    </div>
                    <div className = 'cartItemPrice'>
                        <h5>price</h5>
                        <p>NOK {this.state.price},-</p>
                        <Button className='delBtn' onClick={this.props.buttonClick}>Remove from cart</Button>
                    </div>
                </div>
            </div>
        )
    }
}