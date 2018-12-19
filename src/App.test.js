import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';


it("renders without crashing", () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
<BrowserRouter>
  <App />
</BrowserRouter>
</Provider>, div);
});
