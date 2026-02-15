// Admin-only modal to adjust stock levels (IN/OUT)
import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { moveStock } from "../stockSlice";

const StockModal = ({ product, onClose }) => {
  const dispatch = useAppDispatch();

  const [type, setType] = useState("IN");
  const [quantity, setQuantity] = useState(1);

  const submit = async (e) => {
    e.preventDefault();

    if (quantity <= 0) return alert("Invalid quantity");

    await dispatch(
      moveStock({
        productId: product._id,
        type,
        quantity,
      })
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h3 className="font-bold mb-4">
          Adjust Stock → {product.name}
        </h3>

        <form onSubmit={submit} className="space-y-4">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="IN">Stock In</option>
            <option value="OUT">Stock Out</option>
          </select>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StockModal;
