export interface SaleOrderItem {
  id: string
  quantity: string
  unitPrice: string
  totalPrice: string
  productId: string
  saleOrderId: string
}

export type SaleOrderItems = Array<SaleOrderItem>
export type SaleOrderItemDTO = Omit<SaleOrderItem, '_id' | 'image' | 'createdAt' | '__v'>

export interface ContextState {
  saleOrderItems: SaleOrderItems
  loading: boolean
  error: string | null
}

export type SaleOrderItemsActions =
  | { type: 'SET_SALE_ORDER_ITEMS', payload: SaleOrderItems }
  | { type: 'SET_LOADING', payload: boolean }
  | { type: 'SET_ERROR', payload: string }
  | { type: 'ADD_SALE_ORDER_ITEM', payload: SaleOrderItem }
  | { type: 'EDIT_SALE_ORDER_ITEM', payload: SaleOrderItem }
  | { type: 'DELETE_SALE_ORDER_ITEM', payload: string }
