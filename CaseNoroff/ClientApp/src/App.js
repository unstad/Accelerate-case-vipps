import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Shop } from './components/Shop/Shop.js';
import { Cart } from './components/Cart/Cart.js';
import { Orderdetails } from './components/Orderdetails/Orderdetails.js';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { Privacy } from './components/Privacy/Privacy.js';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Shop} />
        <Route path='/counter' component={Counter} />
        <Route path='/cart' component={Cart} />
		<Route path='/order' component={Orderdetails} />
        <AuthorizeRoute path='/fetch-data' component={FetchData} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
        <Route path='/Privacy' component={Privacy} />
      </Layout>
    );
  }
}
