import { FC, useState } from 'react';
import { useSaleOrderItems } from '../hooks/useSaleOrderItems';
import { SaleOrderItem } from '../interfaces';
import { deleteSaleOrderItem } from '../services';
import { Dialog } from './Dialog';
import { Modal } from './Modal';

interface SaleOrderItemsItemProps {
  saleOrderItem: SaleOrderItem;
}

export const SaleOrderItemsItem: FC<SaleOrderItemsItemProps> = ({
  saleOrderItem
}) => {
  const { quantity, unitPrice, totalPrice, product, saleOrder, id } =
    saleOrderItem;

  const { dispatch } = useSaleOrderItems();
  const [showDialogDelete, setShowDialogDelete] = useState(false);
  const [showDialogEdit, setShowDialogEdit] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState(false);

  const handlerDelete = async () => {
    setBtnLoading(true);
    setError(false);

    const { error } = await deleteSaleOrderItem(id);

    if (!error) {
      dispatch({ type: 'DELETE_SALE_ORDER_ITEM', payload: id });
      return;
    }

    setError(true);
    setBtnLoading(false);
  };

  return (
    <>
      <tr className="border-b odd:bg-white even:bg-gray-100 odd:bg-white even:bg-gray-50 border-gray-50">
        <td className="py-4 px-6 text-sm">{id}</td>
        <td className="py-4 px-6 text-sm whitespace-nowrap">{quantity}</td>
        <td className="py-4 px-6 text-sm whitespace-nowrap">
          <div className="flex">
            <p className="font-bold">$</p>
            {unitPrice}
          </div>
        </td>
        <td className="py-4 px-6 text-sm whitespace-nowrap">
          <div className="flex">
            <p className="font-bold">$</p>
            {totalPrice}
          </div>
        </td>
        <td className="py-4 px-6 text-sm whitespace-nowrap">{product.name}</td>
        <td className="py-4 px-6 text-sm whitespace-nowrap">
          {saleOrder.status}
        </td>
        <td className="py-4 px-6 text-sm whitespace-nowrap space-x-3">
          <button
            onClick={() => setShowDialogEdit(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold p-1.5 rounded-xl"
          >
            ✏️
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold p-1.5 rounded-xl"
            onClick={() => setShowDialogDelete(true)}
          >
            🚫
          </button>
        </td>
      </tr>

      {showDialogDelete && (
        <Dialog
          click={handlerDelete}
          onClose={() => {
            setShowDialogDelete(false);
            setError(false);
            setBtnLoading(false);
          }}
          error={error}
          btnLoading={btnLoading}
        />
      )}

      {showDialogEdit && (
        <Modal
          isEdit
          item={saleOrderItem}
          onClose={() => setShowDialogEdit(false)}
        />
      )}
    </>
  );
};
