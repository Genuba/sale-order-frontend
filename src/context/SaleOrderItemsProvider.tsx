import { FC, useReducer, useEffect } from 'react';
import axios from 'axios';
import SaleOrderItemsContext from './SaleOrderItemsContext';
import SaleOrderItemsReducer from '../reducers/SaleOrderItemsReducer';
import { ContextState, RootSaleOrder } from '../interfaces';
import { API_URL } from '../utils/base-url';

const INIT_STATE: ContextState = {
  saleOrderItems: [],
  loading: true,
  error: null
};

const SaleOrderItemsProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(SaleOrderItemsReducer, INIT_STATE);

  const getSaleOrderItems = async () => {
    try {
      const { data } = await axios.get<RootSaleOrder>(API_URL);

      dispatch({ type: 'SET_SALE_ORDER_ITEMS', payload: data.data });
    } catch (e) {
      dispatch({ type: 'SET_ERROR', payload: 'Something went wrong.' });
      console.error(e);
    }
  };

  useEffect(() => {
    getSaleOrderItems();
  }, []);

  return (
    <SaleOrderItemsContext.Provider value={{ state, dispatch }}>
      {children}
    </SaleOrderItemsContext.Provider>
  );
};

export default SaleOrderItemsProvider;
