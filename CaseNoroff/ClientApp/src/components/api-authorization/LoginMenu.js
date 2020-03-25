import React, { Component, Fragment } from 'react';
import { NavItem, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import iconUser from '../../Assets/iconUser.png';
import orderHistory from '../OrderHistory/OrderHistory.js';


export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null,
            showDropdown: false
        };
        this.toggle = this.toggle.bind(this);
        this.showDropdown = this.showDropdown.bind(this);
        this.removeDropdown = this.removeDropdown.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            showDropdown: !prevState.showDropdown
        }));
    }

    showDropdown(event) {
            event.preventDefault();
            this.setState({
                showDropdown: true
            })
    }

    removeDropdown() {
            this.setState({
                showDropdown: false
            })
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }

    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        } else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
            return this.authenticatedView(userName, profilePath, logoutPath);
        }
    }

    authenticatedView(userName, profilePath, logoutPath) {
        return (<Fragment>
            <Dropdown className="droooooop" onMouseLeave={this.removeDropdown} isOpen={this.state.showDropdown} toggle={this.toggle}>
                <DropdownToggle onMouseEnter={this.showDropdown} className="toggler">
                    <img className="navImg" src={iconUser} alt="User" />
                </DropdownToggle>
                {this.state.showDropdown && (
                    <DropdownMenu className="drooopdownMenu">
                        <DropdownItem header> {userName} </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem tag={Link} className="text-dark" to={profilePath}>Profile</DropdownItem>
                        <DropdownItem tag={Link} className="text-dark" to='/orderHistory'>Purchase History</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem tag={Link} className="text-dark" to={logoutPath}>Logout</DropdownItem>
                    </DropdownMenu>)}
            </Dropdown>
            <NavItem>
            </NavItem>
        </Fragment>);

    }

    anonymousView(registerPath, loginPath) {
        return (
            <Dropdown  className="droooooop" onMouseLeave={this.removeDropdown} isOpen={this.state.showDropdown} toggle={this.toggle}>
                <DropdownToggle  onMouseEnter={this.showDropdown} className="toggler">
                    <img className="navImg" src={iconUser} alt="User" />
                </DropdownToggle>
                {this.state.showDropdown && (
                    <DropdownMenu className="drooopdownMenu">
                        <DropdownItem tag={Link} className="text-dark" to={registerPath}>Register</DropdownItem>
                        <DropdownItem tag={Link} className="text-dark" to={loginPath}>Login</DropdownItem>
                    </DropdownMenu>) }
            </Dropdown>
        );
    }
}
