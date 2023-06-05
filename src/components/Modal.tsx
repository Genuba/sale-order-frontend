import { FC, FormEvent, useState } from 'react';
import { useSaleOrderItems } from '../hooks/useSaleOrderItems';
import { useForm } from '../hooks/useForm';
import { SaleOrderItem, SaleOrderItemDTO } from '../interfaces';
import { addSaleOrderItem, editSaleOrderItem } from '../services';
import { Button } from './Button';
import { RawModal } from './RawModal';
import { TextInput } from './TextInput';

interface ModalProps {
  onClose: () => void;
  isEdit?: boolean;
  item?: SaleOrderItem;
}

export const Modal: FC<ModalProps> = ({ onClose, isEdit, item }) => {
  const [isValid, setIsValid] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState(false);

  const { dispatch } = useSaleOrderItems();

  const { values, handlerChange } = useForm<SaleOrderItemDTO>({
    quantity: isEdit ? item!.quantity : '',
    unitPrice: isEdit ? item!.unitPrice : '',
    totalPrice: isEdit ? item!.totalPrice : '',
    productId: isEdit ? item!.productId : '',
    saleOrderId: isEdit ? item!.saleOrderId : ''
  });

  const { quantity, unitPrice, totalPrice, productId, saleOrderId } = values;

  const handlerAdd = async (e: FormEvent) => {
    e.preventDefault();

    if (
      quantity !== '' &&
      unitPrice !== '' &&
      totalPrice !== '' &&
      productId !== '' &&
      saleOrderId !== ''
    ) {
      setBtnLoading(true);
      setIsValid(false);
      setError(false);

      const { error, dataSaleOrderItem } = await addSaleOrderItem(values);

      if (!error) {
        dispatch({ type: 'ADD_SALE_ORDER_ITEM', payload: dataSaleOrderItem });
        onClose();
        return;
      }

      setError(true);
      setBtnLoading(false);
      return;
    }

    setIsValid(true);
    setError(false);
  };

  const handlerEdit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      quantity !== '' &&
      unitPrice !== '' &&
      totalPrice !== '' &&
      productId !== '' &&
      saleOrderId !== ''
    ) {
      setBtnLoading(true);
      setIsValid(false);
      setError(false);

      const { error, dataSaleOrderItem } = await editSaleOrderItem(
        item?.id!,
        values
      );

      if (!error) {
        dispatch({
          type: 'EDIT_SALE_ORDER_ITEM',
          payload: { ...item!, ...dataSaleOrderItem }
        });

        onClose();
        return;
      }

      setError(true);
      setBtnLoading(false);

      return;
    }

    setIsValid(true);
    setError(false);
  };

  return (
    <RawModal onClose={onClose}>
      <form
        onSubmit={isEdit ? handlerEdit : handlerAdd}
        className="flex flex-col -mt-4 p-5 space-y-4 lg:px-8 sm:pb-6 xl:pb-8"
      >
        <h3 className="text-xl text-center font-medium text-gray-600">
          {isEdit ? 'Edit saleOrderItem' : 'Add a new SaleOrderItem'}
        </h3>

        <TextInput
          name="quantity"
          placeholder="Quantity"
          value={quantity}
          onChange={handlerChange}
        />

        <TextInput
          name="unitPrice"
          placeholder="Unit Price"
          value={unitPrice}
          onChange={handlerChange}
        />

        <TextInput
          name="totalPrice"
          placeholder="Total Price"
          value={totalPrice}
          onChange={handlerChange}
        />

        <TextInput
          isNumberic
          name="productId"
          placeholder="ProductId"
          value={productId}
          onChange={handlerChange}
        />

        <TextInput
          isNumberic
          name="saleOrderId"
          placeholder="SaleOrderId"
          value={saleOrderId}
          onChange={handlerChange}
        />

        {/* Validation and Errors */}
        {isValid && (
          <div className="flex items-center justify-end">
            <p className="text-red-500 text-sm font-bold">
              All fields are required.
            </p>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-end">
            <p className="text-red-500 text-sm font-bold">
              Something went wrong.
            </p>
          </div>
        )}

        <hr />

        {/* Footer */}
        <div className="flex items-center justify-end space-x-2">
          <Button label="Close" isClose click={onClose} />
          <Button
            label={btnLoading ? 'Loading...' : isEdit ? 'Edit' : 'Add'}
            isSubmit
            isLoading={btnLoading}
          />
        </div>
      </form>
    </RawModal>
  );
};
