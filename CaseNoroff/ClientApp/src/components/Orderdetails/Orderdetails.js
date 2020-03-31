import React, { Component, Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import authService from '../api-authorization/AuthorizeService';
import StripeCheckout from 'react-stripe-checkout';


export class Orderdetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: false,
			fields: {},
			errors: {},
			itemList: [],
			totalprice: String
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getOrderitems = this.getOrderItems.bind(this);
	}

	componentDidMount() {
		this._subscription = authService.subscribe(() => this.populateState());
		this.populateState();
		this.getCustomerDetails();
		if (sessionStorage.getItem('cartList') !== 0) {
			this.setState({ itemList: JSON.parse(sessionStorage.getItem('cartList')) })
		}
	}

	componentWillUnmount() {
		authService.unsubscribe(this._subscription);
	}

	async populateState() {
		const [isAuthenticated] = await Promise.all([authService.isAuthenticated()])
		this.setState({
			isAuthenticated,
		});
	}

	sumPrice = () => {
		let sum = 0;
		if (sessionStorage.getItem('cartList')) {
			this.state.itemList.map(item => {
				sum += item.price
			})
		}
		return sum;
		this.state.totalprice = sum;
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.handleValidation()) {
			this.getOrderItems()
			//this.handlePay()
		} else {
			alert("Form has errors.");
		}
	}



	handleValidation() {
		let fields = this.state.fields;
		let errors = {};
		let formIsValid = true;

		if (!fields["firstName"]) {
			formIsValid = false;
			errors["firstName"] = "First name is required.";
		}

		if (typeof fields["firstName"] !== "undefined") {
			if (sessionStorage.getItem('firstName').length != 0) {
				if (!fields["firstName"].match(/^[a-zA-ZÆØÅæøå]+[-{1}]?[\s{1}]?[a-zA-ZÆØÅæøå]?$/)) {
					formIsValid = false;
					errors["firstName"] = "Only letters.";
				}
			} else {
				formIsValid = false;
				errors["firstName"] = "First name is required.";
			}
		}

		if (!fields["lastName"]) {
			formIsValid = false;
			errors["lastName"] = "Last name is required.";
		}

		if (typeof fields["lastName"] !== "undefined") {
			if (sessionStorage.getItem('firstName').length != 0) {
				if (!fields["lastName"].match(/^[a-zA-ZÆØÅæøå]+[-{1}]?[\s{1}]?[a-zA-ZÆØÅæøå]?$/)) {
					formIsValid = false;
					errors["lastName"] = "Only letters.";
				}
			} else {
				formIsValid = false;
				errors["lasttName"] = "Last name is required.";
			}
		}

		if (!fields["email"]) {
			formIsValid = false;
			errors["email"] = "Email is required.";
		}

		if (typeof fields["email"] !== "undefined") {
			let lastAtPos = fields["email"].lastIndexOf('@');
			let lastDotPos = fields["email"].lastIndexOf('.');

			if (sessionStorage.getItem('email').length != 0) {
				if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@')
					=== -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
					formIsValid = false;
					errors["email"] = "Email is not valid.";
				}

			} else {
				formIsValid = false;
				errors["email"] = "Email is required.";
			}
		}

		if (!fields["phoneNumber"]) {
			formIsValid = false;
			errors["phoneNumber"] = "Phone number is required.";
		}

		if (typeof fields["phoneNumber"] !== "undefined") {
			if (sessionStorage.getItem('phoneNumber').length != 0) {
				if (!fields["phoneNumber"].match(/^[+{1}]?[0-9]?[\s{1}]?[0-9]+$/)) {
					formIsValid = false;
					errors["phoneNumber"] = "Phone number is not valid.";
				}
			} else {
				formIsValid = false;
				errors["phoneNumber"] = "Phone number is required.";
			}
		}

		if (!fields["address"]) {
			formIsValid = false;
			errors["address"] = "Address is required.";
		}

		if (!fields["country"]) {
			formIsValid = false;
			errors["country"] = "Country is required.";
		}

		if (typeof fields["country"] !== "undefined") {
			if (sessionStorage.getItem('country').length != 0) {
				if (!fields["country"].match(/^[a-zA-ZÆØÅæøå]+[\s{1}]?[a-zA-ZÆØÅæøå]+?$/)) {
					formIsValid = false;
					errors["country"] = "Country is not valid.";
				}
			} else {
				formIsValid = false;
				errors["country"] = "Country is required.";
			}
		}

		if (!fields["city"]) {
			formIsValid = false;
			errors["city"] = "City is required.";
		}

		if (typeof fields["city"] !== "undefined") {
			if (sessionStorage.getItem('city').length != 0) {
				if (!fields["city"].match(/^[a-zA-ZÆØÅæøå]+[\s{1}]?[a-zA-ZÆØÅæøå]+?$/)) {
					formIsValid = false;
					errors["city"] = "City is not valid.";
				}
			} else {
				formIsValid = false;
				errors["city"] = "City is required.";
			}
		}

		if (!fields["zipCode"]) {
			formIsValid = false;
			errors["zipCode"] = "Zip code is required.";
		}

		if (typeof fields["zipCode"] !== "undefined") {
			if (sessionStorage.getItem('zipCode').length != 0) {
				if (!fields["zipCode"].match(/^[0-9]+$/)) {
					formIsValid = false;
					errors["zipCode"] = "Zip code is not valid.";
				}
			} else {
				formIsValid = false;
				errors["zipCode"] = "Zip code is required.";
			}
		}

		this.setState({errors: errors});
		return formIsValid;
	}

	handleChange = (field, e) => {
		let value = e.target.value;
		value = value.replace(/</g, "&lt;").replace(/>/g, "&gt;"); //html encodes < and >
		sessionStorage.setItem(e.target.name, value)

		let fields = this.state.fields;
		fields[field] = value;
		this.setState({fields})
	}

	getOrderInfo = () => {
		const orderList = sessionStorage.getItem('cartList');
		let list = []
		const orderInfo = orderList.map(order => {
			let info = [order.productId, this.getItemQuantity(order.productId)]
			list.push(info);
		})
		return list;
	}

	getItemQuantity = (itemId) => {
		const orderList = sessionStorage.getItem('cartList');

		var current = null;
		var cnt = 0;
		for (var i = 0; i < orderList.length; i++) {
			if (orderList[i].productId == itemId) {
				cnt++;
			}
		}
		return cnt;
	}

	getOrderItems = () => {
		const orderList = JSON.parse(sessionStorage.getItem('cartList'));
		let orders = [];


		orderList.forEach(function (order_i, index_i) {
			if (orders.some(o => o.productId === order_i.productId)) {
				return;
			}
			var order = {
				productId: order_i.productId,
				productQuantity: 0,
			}

			orderList.forEach(function (order_j, index_j) {
				if (order.productId === order_j.productId) {
					order.productQuantity++;
				}
			});
			orders.push(order)
		});
		sessionStorage.setItem('orders', JSON.stringify(orders));
	}

	async onToken(token){
		const authToken = await authService.getAccessToken();
		let head = !token ? {} : {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json'
		}
		const request = {
			method: 'POST',
			headers: head,
			body: JSON.stringify({
				"customer": {
					"email": sessionStorage.getItem('email'),
					"firstName": sessionStorage.getItem('firstName'),
					"lastName": sessionStorage.getItem('lastName'),
					"streetAddress": sessionStorage.getItem('address'),
					"city": sessionStorage.getItem('city'),
					"postalCode": sessionStorage.getItem('zipCode'),
					"country": sessionStorage.getItem('country'),
					"phone": sessionStorage.getItem('phoneNumber'),
					"acceptCustomerPolicy": false,
					"userId": null,
					"createAccount": false
				},
				"order": {},
				"deliveryAddress": {
					"streetAddress": sessionStorage.getItem('address'),
					"city": sessionStorage.getItem('city'),
					"postalCode": sessionStorage.getItem('zipCode'),
					"country": sessionStorage.getItem('country'),
				},
				"orderItems": JSON.parse(sessionStorage.getItem('orders')),
			})
		}
		if (authToken) {
			const response = await fetch('/charge', request).then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				sessionStorage.clear('cartList')
				return response.blob();
			});
			window.location.href = '/orderHistory'
		}
	}

	render() {
		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					{this.Authenticate()}
					<FormGroup>
						<Label for="firstName">First name</Label>
						<Input type="text" name="firstName" id="firstName" maxLength="25"
						onChange={this.handleChange.bind(this, "firstName")}
						value={this.state.fields.firstName || ""} required />
						<span style={{ color: "red" }}>{this.state.errors["firstName"]}</span>
					</FormGroup>
					<FormGroup>
						<Label for="lastName">Last name</Label>
						<Input type="text" name="lastName" id="lastName" maxLength="25"
						onChange={this.handleChange.bind(this, "lastName")}
						value={this.state.fields.lastName || ""} required />
						<span style={{ color: "red" }}>{this.state.errors["lastName"]}</span>
					</FormGroup>
					<FormGroup>
						<Label for="phoneNumber">Phone number</Label>
						<Input type="text" name="phoneNumber" id="phoneNumber" maxLength="20"
						onChange={this.handleChange.bind(this, "phoneNumber")}
						value={this.state.fields.phoneNumber || ""} required />
						<span style={{ color: "red" }}>{this.state.errors["phoneNumber"]}</span>
					</FormGroup>
					<FormGroup>
						<Label for="address">Address</Label>
						<Input type="text" name="address" id="address" maxLength="50"
						onChange={this.handleChange.bind(this, "address")}
						value={this.state.fields.address || ""} required />
						<span style={{ color: "red" }}>{this.state.errors["address"]}</span>
					</FormGroup>
					<FormGroup>
						<Label for="country">Country</Label>
						<Input type="text" name="country" id="country" maxLength="50"
							   onChange={this.handleChange.bind(this, "country")}
							   value={this.state.fields.country  || ""} required/>
						<span style={{color: "red"}}>{this.state.errors["country"]}</span>
					</FormGroup>
					<FormGroup>
						<Label for="city">City</Label>
						<Input type="text" name="city" id="city" maxLength="50"
							   onChange={this.handleChange.bind(this, "city")}
							   value={this.state.fields.city  || ""} required/>
						<span style={{color: "red"}}>{this.state.errors["city"]}</span>
					</FormGroup>
					<FormGroup>
						<Label for="zipCode">Zip code</Label>
						<Input type="text" name="zipCode" id="zipCode" maxLength="50"
							   onChange={this.handleChange.bind(this, "zipCode")}
							   value={this.state.fields.zipCode  || ""} required/>
						<span style={{color: "red"}}>{this.state.errors["zipCode"]}</span>
					</FormGroup>
					<StripeCheckout
						name="The Vipps Store"
						description="Checkout"
						ComponentClass="div"
						label="Pay"
						panelLabel="Pay"
						amount={this.sumPrice() * 100}
						currency="NOK"
						stripeKey="pk_test_jiInoZhvOwcgMJjTyG0LGyTJ00RQ4kK30X"
						locale="auto"
						zipCode={false}
						allowRememberMe={false}
						email={this.state.fields.email}
						token={this.onToken}
						opened={this.onOpened}
						closed={this.onClosed}
					>
						<Button onClick={this.handleSubmit} color="success" size="lg" block>Pay {this.sumPrice()} NOK</Button>
					</StripeCheckout>
				</Form>
			</div>
		)
	}

	Authenticate() {
		const { isAuthenticated } = this.state;
		if (!isAuthenticated) return this.anonymousView();
		else if (isAuthenticated) return this.authenticatedView();
	}


	authenticatedView() {
		return (
			<Fragment>
				<FormGroup>
					<Label for="email">Email address</Label>
					<Input type="email" name="email" id="email" maxLength="50"
					onChange={this.handleChange.bind(this, "email")}
					value={this.state.fields.email || ""} required disabled />
					<span style={{ color: "red" }}>{this.state.errors["email"]}</span>
				</FormGroup>
			</Fragment>
		)
	}

	anonymousView() {
		return (
			<Fragment>
				<FormGroup>
					<Label for="email">Email address</Label>
					<Input type="email" name="email" id="email" maxLength="50"
					onChange={this.handleChange.bind(this, "email")}
					value={this.state.fields.email || ""} required />
					<span style={{ color: "red" }}>{this.state.errors["email"]}</span>
				</FormGroup>
			</Fragment>
		)
	}

	async getCustomerDetails() {
		const token = await authService.getAccessToken();
		let fields = this.state.fields;
		if (token) {
			const response = await fetch('ecommerce/customer', {
				headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
			});
			try {
				const data = await response.json();
				if (data.firstName != null) {
					sessionStorage.setItem('firstName', data.firstName);
				} else {
					sessionStorage.setItem('firstName', '');
				}

				if (data.lastName != null) {
					sessionStorage.setItem('lastName', data.lastName);
				} else {
					sessionStorage.setItem('lastName', '');
				}

				if (data.email != null) {
					sessionStorage.setItem('email', data.email);
				} else {
					sessionStorage.setItem('email', '');
				}

				if (data.phone != null) {
					sessionStorage.setItem('phoneNumber', data.phone);
				} else {
					sessionStorage.setItem('phoneNumber', '');
				}

				if (data.streetAddress != null) {
					sessionStorage.setItem('address', data.streetAddress);
				} else {
					sessionStorage.setItem('address', '');
				}

				if (data.country != null) {
					sessionStorage.setItem('country', data.country);
				} else {
					sessionStorage.setItem('country', '');
				}

				if (data.city != null) {
					sessionStorage.setItem('city', data.city);
				} else {
					sessionStorage.setItem('city', '');
				}

				if (data.postalCode != null) {
					sessionStorage.setItem('zipCode', data.postalCode);
				} else {
					sessionStorage.setItem('zipCode', '');
				}

			} catch (e) {
				console.log(e)
			}

			let fields = this.state.fields;
			fields['firstName'] = sessionStorage.getItem('firstName');
			fields['lastName'] = sessionStorage.getItem('lastName');
			fields['email'] = sessionStorage.getItem('email');
			fields['phoneNumber'] = sessionStorage.getItem('phoneNumber');
			fields['address'] = sessionStorage.getItem('address');
			fields['country'] = sessionStorage.getItem('country');
			fields['city'] = sessionStorage.getItem('city');
			fields['zipCode'] = sessionStorage.getItem('zipCode');
			this.setState({fields})
		}
	}
}
