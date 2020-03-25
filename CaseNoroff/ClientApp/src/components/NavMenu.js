import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';

import iconCart from '../Assets/iconCart.png';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">The Vipps Store</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <Button style={{backgroundColor: 'white', border: 'none'}}>
                                        <NavLink tag={Link} className="text-dark" to="/">Store</NavLink>
                                    </Button>
                                </NavItem>
                                <LoginMenu>
                                </LoginMenu>
                                <NavItem>
                                    <Button style={{ backgroundColor: 'white', border: 'none', paddingBottom: '6px' }}>
                                        <NavLink tag={Link} className="text-dark" to="/cart">
                                            <img className="navImg" src={iconCart} alt="Cart" />
                                        </NavLink>
                                    </Button>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
