import React from 'react';
import { Button } from 'reactstrap';

export class Orderdetails extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			newOrder: {
				firstName: '',
				lastName: '',
				email: '',
				phoneNumber: '',
				address: '',
				country: '',
				city: '',
				postalCode: ''
			}
		}
	}
	
	handleSubmit() {
		console.log("lmao");
	}

	componentDidMount() {

	}
	render() {
		return (
			<div style={{'display': 'flex', 'justifyContent': 'center',
						 'flexDirection': 'column', 'alignItems': 'center', 'background': 'skyblue'}}>
				<div style={{'padding': '30px'}}>
					<h1>Order details</h1>
				</div>
				<div stlye={{'flexDirection': 'column', 'padding': ''}}>
					<b>First name</b>
					<form>
						<input type="text" name="name" style={{'width': '500px'}}/>
					</form>
				</div>

				<form onSubmit={this.handleSubmit}>
					<div stlye={{'flexDirection': 'column', 'padding': '40px'}}>
						<b>First name</b>
						<input className="k-textbox" type="text" name="name"/>
					</div>
				</form>
			</div>
		)
	}
}
