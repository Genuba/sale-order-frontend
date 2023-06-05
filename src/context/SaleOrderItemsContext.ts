import { createContext, Dispatch } from 'react';
import { SaleOrderItemsActions, ContextState } from '../interfaces';

interface SaleOrderItemsContextI {
  state: ContextState;
  dispatch: Dispatch<SaleOrderItemsActions>;
}

const SaleOrderItemsContext = createContext<SaleOrderItemsContextI>(
  {} as SaleOrderItemsContextI
);

export default SaleOrderItemsContext;
