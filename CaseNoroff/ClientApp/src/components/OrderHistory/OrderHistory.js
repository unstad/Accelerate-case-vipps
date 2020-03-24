import React from 'react';
import authService from '../api-authorization/AuthorizeService'

export class OrderHistory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [], loading: true 
        }
    }

    componentDidMount() {
        this.populateOrderHistory();
    }

    async populateOrderHistory() {
        const token = await authService.getAccessToken();
        console.log('Token:' + token)
        const response = await fetch('order', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        console.log('response' + response)
        const data = await response.json();
        console.log("Data: " + data)
        this.setState({ orders: data, loading: false });
    }

    render() {
        return (
            <div>
                <h3> Order History </h3>
            </div>
        )
    }
}