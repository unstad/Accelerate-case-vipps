import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import './Layout.css';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu />
        <Container className="content">
          {this.props.children}
        </Container>
            <footer className="footer border-top text-muted">
                <div className="container">
                    &copy; 2020 - The Vipps Store - <a href="/Privacy">Privacy</a>
                </div>
            </footer>
      </div>
    );
  }
}
