import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SaleOrderItemsProvider from './context/SaleOrderItemsProvider';

ReactDOM.render(
  <SaleOrderItemsProvider>
    <App />
  </SaleOrderItemsProvider>,
  document.getElementById('root')
);
