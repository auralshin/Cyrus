import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
import App from "./App";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer, composeEnhancer(applyMiddleware())
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);


