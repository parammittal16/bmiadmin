import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/dashboard';
import Login from './components/auth/login';
import Newbook from './components/book/newBook';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
      <Navbar />
      <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/newbook' component={Newbook} />
      </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;