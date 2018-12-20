import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/auth/login';
import Newbook from './components/book/newBook';
import {connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import logout from './components/auth/logout';
import { authCheckState } from './store/actions/authActions';

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoLogin();
  }
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
      <Route path='/logout' component={logout} />
      <Redirect to="/dashboard" />
      </Switch>
      );
    }
    return (
      <BrowserRouter basename="/bmiadmin">
      <div className="App">
      <Navbar />
      {routes}
      </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  }  
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(authCheckState())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);