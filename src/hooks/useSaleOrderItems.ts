import { useContext } from 'react';
import SaleOrderItemsContext from '../context/SaleOrderItemsContext';

export const useSaleOrderItems = () => {
  const { state, dispatch } = useContext(SaleOrderItemsContext);

  return {
    ...state,
    dispatch
  };
};
