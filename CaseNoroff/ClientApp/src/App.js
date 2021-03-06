import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Shop } from './components/Shop/Shop.js';
import { Cart } from './components/Cart/Cart.js';
import { Orderdetails } from './components/Orderdetails/Orderdetails.js';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { OrderHistory } from './components/OrderHistory/OrderHistory.js';
import { Privacy } from './components/Privacy/Privacy.js';
import { OrderHOrder } from './components/OrderHistory/OrderHOrder.js';
import { Profile } from './components/Profile/Profile.js';
import { ProfileConfirmation } from './components/Profile/ProfileConfirmation.js';
import { Error404 } from './components/Error404/Error404.js';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
            <Switch>
                <Route exact path='/' component={Shop} />
                <Route path='/counter' component={Counter} />
                <Route path='/cart' component={Cart} />
                <Route path='/order' component={Orderdetails} />
                <AuthorizeRoute exact path='/Profile' component={Profile} />
                <AuthorizeRoute exact path='/ProfileConfirmation' component={ProfileConfirmation} />
                <AuthorizeRoute path='/orderHistory/order/:orderID' component={OrderHOrder} />
                <AuthorizeRoute exact path='/orderHistory' component={OrderHistory} />

                <AuthorizeRoute path='/fetch-data' component={FetchData} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
                <Route path='/Privacy' component={Privacy} />
                <Route component={Error404} />
            </Switch>
      </Layout>
    );
  }
}
