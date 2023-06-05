import axios from 'axios';
import { SaleOrderItem, SaleOrderItemDTO } from '../interfaces';
import { API_URL } from '../utils/base-url';

export const addSaleOrderItem = async (newSaleOrderItem: SaleOrderItemDTO) => {
  const result = { dataSaleOrderItem: {} as SaleOrderItem, error: false };

  try {
    const { data } = await axios.post(`${API_URL}/`, newSaleOrderItem);
    result.dataSaleOrderItem = data.data;
  } catch (e) {
    result.error = true;
    console.error(e);
  }

  return result;
};

export const editSaleOrderItem = async (
  id: string,
  saleOrderItemEdited: SaleOrderItemDTO
) => {
  const result = { dataSaleOrderItem: {} as SaleOrderItem, error: false };

  try {
    const { data } = await axios.put(`${API_URL}/${id}`, saleOrderItemEdited);
    result.dataSaleOrderItem = data.data;
  } catch (e) {
    result.error = true;
    console.error(e);
  }

  return result;
};

export const deleteSaleOrderItem = async (id: string) => {
  const result = { error: false };

  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (e) {
    result.error = true;
    console.error(e);
  }

  return result;
};
