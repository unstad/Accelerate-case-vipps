import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export class Orderdetails extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.history.push('/counter'); //to payment page
	}

	handleChange = (e) => {
		//disable < and >
		sessionStorage.setItem(e.target.name, e.target.value)
	}

	render() {
		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					<FormGroup>
						<Label for="firstName">First name</Label>
						<Input type="text" name="firstName" id="firstName" maxlength="50" onChange={this.handleChange}/ required>
					</FormGroup>
					<FormGroup>
						<Label for="lastName">Last name</Label>
						<Input type="text" name="lastName" id="lastName" maxlength="50" onChange={this.handleChange} required/>
					</FormGroup>
					<FormGroup>
						<Label for="email">Email address</Label>
						<Input type="email" name="email" id="email" maxlength="50" onChange={this.handleChange} required/>
					</FormGroup>
					<FormGroup>
						<Label for="phoneNumber">Phone number</Label>
						<Input type="text" name="phoneNumber" id="phoneNumber" maxlength="20" onChange={this.handleChange} required/>
					</FormGroup>
					<FormGroup>
						<Label for="address">Address</Label>
						<Input type="text" name="address" id="address" maxlength="50" onChange={this.handleChange} required/>
					</FormGroup>
					<FormGroup>
						<Label for="country">Country</Label>
						<Input type="text" name="country" id="country" maxlength="50" onChange={this.handleChange} required/>
					</FormGroup>
					<FormGroup>
						<Label for="city">City</Label>
						<Input type="text" name="city" id="city" maxlength="50" onChange={this.handleChange} required/>
					</FormGroup>
					<FormGroup>
						<Label for="zipCode">Zip code</Label>
						<Input type="text" name="zipCode" id="zipCode" maxlength="50" onChange={this.handleChange} required/>
					</FormGroup>
					<Button type="submit" color="primary" size="lg" block onClick={this.handleSubmit}>Continue to payment</Button>
				</Form>
			</div>
		)
	}
}
