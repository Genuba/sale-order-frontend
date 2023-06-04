import { SaleOrderItemsActions, ContextState } from '../interfaces'

const SaleOrderItemsReducer = (state: ContextState, action: SaleOrderItemsActions): ContextState => {
  switch (action.type) {
    case 'SET_SALE_ORDER_ITEMS':
      return {
        ...state,
        loading: false,
        saleOrderItems: action.payload
      }
    case 'SET_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case 'ADD_SALE_ORDER_ITEM':
      return {
        ...state,
        saleOrderItems: [...state.saleOrderItems, action.payload]
      }

    case 'DELETE_SALE_ORDER_ITEM':
      return {
        ...state,
        saleOrderItems: state.saleOrderItems.filter(saleOrderItem => saleOrderItem._id !== action.payload)
      }

    case 'EDIT_SALE_ORDER_ITEM':
      const found =  state.saleOrderItems.find(item => item._id === action.payload._id)

      return {
        ...state,
        saleOrderItems: state.saleOrderItems.map(saleOrderItem => {
          if(found) {
            Object.assign(found, action.payload)

            return {
              ...saleOrderItem
            }
          }

          return saleOrderItem
        })
      }

    default:
      return state
  }
}

export default SaleOrderItemsReducer
