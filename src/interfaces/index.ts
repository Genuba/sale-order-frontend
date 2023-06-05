export interface SaleOrderItem {
  id: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
  productId: string;
  saleOrderId: string;
  product: Product;
  saleOrder: SaleOrder;
}

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  manufacturer: string;
}

interface SaleOrder {
  id: string;
  customer: string;
  date: string;
  status: string;
}

export interface RootSaleOrder {
  message: string;
  data: SaleOrderItems;
}

export type SaleOrderItems = Array<SaleOrderItem>;
export type SaleOrderItemDTO = Omit<
  SaleOrderItem,
  'id' | 'product' | 'saleOrder'
>;

export interface ContextState {
  saleOrderItems: SaleOrderItems;
  loading: boolean;
  error: string | null;
}

export type SaleOrderItemsActions =
  | { type: 'SET_SALE_ORDER_ITEMS'; payload: SaleOrderItems }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'ADD_SALE_ORDER_ITEM'; payload: SaleOrderItem }
  | { type: 'EDIT_SALE_ORDER_ITEM'; payload: SaleOrderItem }
  | { type: 'DELETE_SALE_ORDER_ITEM'; payload: string };
