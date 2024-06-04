import React, { useContext } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "./DeleteModal";
import { State } from "../context/stateContext";

export default function TableForm() {
  const {
    itemName,
    setItemName,
    description,
    setDescription,
    quantity,
    setQuantity,
    price,
    setPrice,
    amount,
    discountType,
    setDiscountType,
    discountAmount,
    setDiscountAmount,
    finalDiscountType,
    setFinalDiscountType,
    finalDiscountAmount,
    setFinalDiscountAmount,
    list,
    total,
    isEditing,
    showModal,
    setShowModal,
    handleSubmit,
    editRow,
  } = useContext(State);

  return (
    <>
      <ToastContainer position="top-right" theme="colored" />

      <form onSubmit={handleSubmit}>
        <div className="md:grid grid-cols-2 gap-5">
          <div className="flex flex-col">
            <label htmlFor="name">Item name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Item name"
              maxLength={96}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Item description</label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Item description"
              maxLength={96}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="md:grid grid-cols-5 gap-5">
          <div className="flex flex-col">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              name="quantity"
              id="quantity"
              placeholder="Quantity"
              maxLength={33}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              id="price"
              placeholder="Price"
              maxLength={33}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="discountType">Discount type</label>
            <select
              name="discountType"
              id="discountType"
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
            >
              <option value="" disabled>
                Discount type
              </option>
              <option key="Percentage" value="Percentage">
                Percentage
              </option>
              <option key="Absolute" value="Absolute">
                Absolute
              </option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="discountAmount">Discount amount</label>
            <input
              type="text"
              name="discountAmount"
              id="discountAmount"
              placeholder="Discount amount"
              maxLength={33}
              value={discountAmount}
              onChange={(e) => setDiscountAmount(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="amount">Amount</label>
            <p>{amount}</p>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 mb-5 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400"
        >
          {isEditing ? "Finish Editing" : "Add Item"}
        </button>
      </form>

      {/* Table items */}

      <table width="100%" className="mb-10 overflow-auto">
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
                  <td className="amount">{amount}</td>
                  <td>
                    <button onClick={() => editRow(id)}>
                      <AiOutlineEdit className="text-green-500 font-bold text-xl" />
                    </button>
                  </td>
                  <td>
                    <button onClick={() => setShowModal(true)}>
                      <AiOutlineDelete className="text-red-500 font-bold text-xl" />
                    </button>
                  </td>
                </tr>
              </tbody>
              {showModal && <DeleteModal id={id} />}
            </React.Fragment>
          )
        )}
      </table>

      <div>
        <div className="flex justify-end gap-5 text-gray-800 mb-5">
          <div className="flex flex-col">
            <label htmlFor="finalDiscountType">Final discount type</label>
            <select
              name="finalDiscountType"
              id="finalDiscountType"
              value={finalDiscountType}
              onChange={(e) => setFinalDiscountType(e.target.value)}
            >
              <option value="" disabled>
                Final discount type
              </option>
              <option key="Percentage" value="Percentage">
                Percentage
              </option>
              <option key="Absolute" value="Absolute">
                Absolute
              </option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="discountAmount">Final discount amount</label>
            <input
              type="text"
              name="discountAmount"
              id="discountAmount"
              placeholder="Final discount amount"
              maxLength={33}
              value={finalDiscountAmount}
              onChange={(e) => setFinalDiscountAmount(e.target.value)}
            />
          </div>
        </div>

        <h2 className="flex items-end justify-end text-gray-800 text-4xl font-bold">
          Rs. {total.toLocaleString()}
        </h2>
      </div>
    </>
  );
}
