import React, { Component } from 'react';

export class Cart extends Component {
    static displayName = Cart.name;

    constructor(props) {
        super(props);
        this.state = { };
        
    }

    componentDidMount() {
     
    }

    render() {
        return (
            <div>
                <form action="/Home/Charge" method="post">
                <label>Amount: $5.00</label>
                <script src="//checkout.stripe.com/v2/checkout.js"
                    class="stripe-button"
                    data-key="@Stripe.Value.PublishableKey"
                    data-description="Stripe Test"
                    data-amount="500">
                </script>
                </form>
            </div>
        );
    }
}
