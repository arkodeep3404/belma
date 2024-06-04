import React, { useContext } from "react";
import { State } from "../context/stateContext";

export default function Table() {
  const { list, total, finalDiscountType, finalDiscountAmount } =
    useContext(State);

  return (
    <>
      <table width="100%" className="mb-10">
        <thead>
          <tr className="bg-gray-100 p-1">
            <td className="font-bold">Name</td>
            <td className="font-bold">Description</td>
            <td className="font-bold">Quantity</td>
            <td className="font-bold">Price</td>
            <td className="font-bold">Discount type</td>
            <td className="font-bold">Discount amount</td>
            <td className="font-bold">Amount</td>
          </tr>
        </thead>
        {list.map(
          ({
            id,
            itemName,
            description,
            quantity,
            price,
            discountType,
            discountAmount,
            amount,
          }) => (
            <React.Fragment key={id}>
              <tbody>
                <tr className="h-10">
                  <td>{itemName}</td>
                  <td>{description}</td>
                  <td>{quantity}</td>
                  <td>{price}</td>
                  <td>{discountType}</td>
                  <td>{discountAmount}</td>
                  <td>{amount}</td>
                </tr>
              </tbody>
            </React.Fragment>
          )
        )}
      </table>

      <div>
        <h2 className="flex items-end justify-end text-gray-800 font-bold mb-2">
          Final discount type : {finalDiscountType}
        </h2>
        <h2 className="flex items-end justify-end text-gray-800 font-bold mb-2">
          Final discount amount : {finalDiscountAmount}
        </h2>
        <h2 className="flex items-end justify-end text-gray-800 text-4xl font-bold">
          Rs. {total.toLocaleString()}
        </h2>
      </div>
    </>
  );
}
