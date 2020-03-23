import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export class Orderdetails extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fields: {},
			errors: {}
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.handleValidation()) {
			this.props.history.push('/counter'); //to payment page
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
			if (!fields["firstName"].match(/^[a-zA-Z]+[-{1}]?[a-zA-Z]+$/)) {
				formIsValid = false;
				errors["firstName"] = "Only letters.";
			}
		}

		if (!fields["lastName"]) {
			formIsValid = false;
			errors["lastName"] = "Last name is required.";
		}

		if (typeof fields["lastName"] !== "undefined") {
			if (!fields["lastName"].match(/^[a-zA-Z]+[-{1}]?[a-zA-Z]+$/)) {
				formIsValid = false;
				errors["lastName"] = "Only letters.";
			}
		}

		if (!fields["email"]) {
			formIsValid = false;
			errors["email"] = "Email is required.";
		}

		if (typeof fields["email"] !== "undefined") {
			let lastAtPos = fields["email"].lastIndexOf('@');
			let lastDotPos = fields["email"].lastIndexOf('.');

			if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@')
				=== -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
				formIsValid = false;
				errors["email"] = "Email is not valid.";
			}
		}

		if (!fields["phoneNumber"]) {
			formIsValid = false;
			errors["phoneNumber"] = "Phone number is required.";
		}

		if (typeof fields["phoneNumber"] !== "undefined") {
			if (!fields["phoneNumber"].match(/^[+{1}]?[0-9]?[\s{1}]?[0-9]+$/)) {
				formIsValid = false;
				errors["phoneNumber"] = "Phone number is not valid.";
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
			if (!fields["country"].match(/^[a-zA-Z]+$/)) {
				formIsValid = false;
				errors["country"] = "Phone number is not valid.";
			}
		}

		if (!fields["city"]) {
			formIsValid = false;
			errors["city"] = "City is required.";
		}
		
		if (typeof fields["city"] !== "undefined") {
			if (!fields["city"].match(/^[a-zA-Z]+$/)) {
				formIsValid = false;
				errors["city"] = "City is not valid.";
			}
		}

		if (!fields["zipCode"]) {
			formIsValid = false;
			errors["zipCode"] = "Zip code is required.";
		}
		
		if (typeof fields["zipCode"] !== "undefined") {
			if (!fields["zipCode"].match(/^[0-9]+$/)) {
				formIsValid = false;
				errors["zipCode"] = "Zip code is not valid.";
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

	render() {
		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					<FormGroup>
						<Label for="firstName">First name</Label>
						<Input type="text" name="firstName" id="firstName" maxLength="25" onChange={this.handleChange.bind(this, "firstName")} required/>
						<span style={{color: "red"}}>{this.state.errors["firstName"]}</span>
					</FormGroup>
					<FormGroup>
						<Label for="lastName">Last name</Label>
						<Input type="text" name="lastName" id="lastName" maxLength="25" onChange={this.handleChange.bind(this, "lastName")} required/>
						<span style={{color: "red"}}>{this.state.errors["lastName"]}</span>
					</FormGroup>
					<FormGroup>
						<Label for="email">Email address</Label>
						<Input type="email" name="email" id="email" maxLength="50" onChange={this.handleChange.bind(this, "email")} required/>
						<span style={{color: "red"}}>{this.state.errors["email"]}</span>
					</FormGroup>
					<FormGroup>
						<Label for="phoneNumber">Phone number</Label>
						<Input type="text" name="phoneNumber" id="phoneNumber" maxLength="20" onChange={this.handleChange.bind(this, "phoneNumber")} required/>
						<span style={{color: "red"}}>{this.state.errors["phoneNumber"]}</span>
					</FormGroup>
					<FormGroup>
						<Label for="address">Address</Label>
						<Input type="text" name="address" id="address" maxLength="50" onChange={this.handleChange.bind(this, "address")} required/>
						<span style={{color: "red"}}>{this.state.errors["address"]}</span>
					</FormGroup>
					<FormGroup>
						<Label for="country">Country</Label>
						<Input type="text" name="country" id="country" maxLength="50" onChange={this.handleChange.bind(this, "country")} required/>
						<span style={{color: "red"}}>{this.state.errors["country"]}</span>
					</FormGroup>
					<FormGroup>
						<Label for="city">City</Label>
						<Input type="text" name="city" id="city" maxLength="50" onChange={this.handleChange.bind(this, "city")} required/>
						<span style={{color: "red"}}>{this.state.errors["city"]}</span>
					</FormGroup>
					<FormGroup>
						<Label for="zipCode">Zip code</Label>
						<Input type="text" name="zipCode" id="zipCode" maxLength="50" onChange={this.handleChange.bind(this, "zipCode")} required/>
						<span style={{color: "red"}}>{this.state.errors["zipCode"]}</span>
					</FormGroup>
					<Button type="submit" color="primary" size="lg" block onClick={this.handleSubmit}>Continue to payment</Button>
				</Form>
			</div>
		)
	}
}
