import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createGlobalContext } from "./Global/API/globalContext"
import { Provider } from "./Global/bind-react/Provider"
import {
  BrowserRouter as RouterProvider,
} from "react-router-dom";
import { context } from "./Global/context"
const Global = createGlobalContext(context)
window.context = Global
ReactDOM.render(
  <RouterProvider>
    <Provider context={Global}>
      <App />
    </Provider>
  </RouterProvider>
  ,
  document.getElementById('root')
);

