import { useState } from 'react';
import { useSaleOrderItems } from '../hooks/useSaleOrderItems';
import { Button } from './Button';
import { SaleOrderItemsItem } from './SaleOrderItemsItem';
import { Modal } from './Modal';
import { Spinner } from './Spinner';
import { Table } from './Table';

export const SaleOrderItemsList = () => {
  const { saleOrderItems, loading, error } = useSaleOrderItems();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {loading && <Spinner />}

      {!loading && !error && (
        <>
          <div className="flex flex-col items-end mt-5">
            <Button
              label="New saleOrderItem"
              click={() => setShowModal(!showModal)}
            />
          </div>

          <Table>
            {saleOrderItems.map((item) => (
              <SaleOrderItemsItem key={item.id} saleOrderItem={item} />
            ))}

            {!saleOrderItems.length && (
              <tr className="bg-white">
                <td colSpan={7} className="py-4 px-6 text-sm text-center">
                  <p className="font-semibold">
                    There are no saleOrderItems. 😢
                  </p>
                </td>
              </tr>
            )}
          </Table>
        </>
      )}

      {error && (
        <div className="flex items-center justify-center h-89v">
          <p className="font-bold text-red-500 text-xl">{error} 😢</p>
        </div>
      )}

      {showModal && <Modal onClose={() => setShowModal(!showModal)} />}
    </>
  );
};
