import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/auth/login';
import Newbook from './components/book/newBook';
import {connect } from 'react-redux';
class App extends Component {
  render() {
    let routes = (
      <Switch>
      <Route exact path='/' component={Login} />
      <Redirect to="/" />
      </Switch>
    );
    if(this.props.isAuthenticated){
      routes = (
      <Switch>
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/newbook' component={Newbook} />
      <Redirect to="/dashboard" />
      </Switch>
      );
    }
    return (
      <div className="App">
      <Navbar />
      {routes}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  }  
}
export default connect(mapStateToProps)(App);