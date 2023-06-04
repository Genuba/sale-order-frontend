import axios from 'axios'
import { SaleOrderItem, SaleOrderItemDTO } from '../interfaces'
import { API_URL } from '../utils/base-url'

export const addSaleOrderItem = async (newSaleOrderItem: SaleOrderItemDTO, image: File) => {
  const result = { dataSaleOrderItem: {} as SaleOrderItem, error: false }

  const { quantity, unitPrice, totalPrice, productId, saleOrderId } = newSaleOrderItem
  const FD = new FormData()
  FD.append('quantity', quantity)
  FD.append('unitPrice', unitPrice)
  FD.append('totalPrice', totalPrice)
  FD.append('productId', productId)
  FD.append('saleOrderId', saleOrderId)

  try {
    const { data } = await axios.post(`${API_URL}/add`, FD)
    result.dataSaleOrderItem = data
  } catch (e) {
    result.error = true
    console.error(e)
  }

  return result
}

export const editSaleOrderItem = async (
  id: string,
  saleOrderItemEdited: SaleOrderItemDTO,
  image: File
) => {
  const result = { dataSaleOrderItem: {} as SaleOrderItem, error: false }

  const { quantity, unitPrice, totalPrice, productId, saleOrderId } = saleOrderItemEdited
  const FD = new FormData()
  FD.append('quantity', quantity)
  FD.append('unitPrice', unitPrice)
  FD.append('totalPrice', totalPrice)
  FD.append('productId', productId)
  FD.append('saleOrderId', saleOrderId)

  try {
    const { data } = await axios.put(`${API_URL}/edit/${id}`, FD)
    result.dataSaleOrderItem = data
  } catch (e) {
    result.error = true
    console.error(e)
  }

  return result
}

export const deleteSaleOrderItem = async (id: string) => {
  const result = { error: false }

  try {
    await axios.delete(`${API_URL}/delete/${id}`)
  } catch (e) {
    result.error = true
    console.error(e)
  }

  return result
}
