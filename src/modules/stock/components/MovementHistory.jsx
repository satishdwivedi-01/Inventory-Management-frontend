import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchMovements, deleteMovement } from "../stockSlice";
import StockModal from "./StockModal";

const MovementHistory = () => {
  const dispatch = useAppDispatch();
  const { movements, loading } = useAppSelector((s) => s.stock);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchMovements({}));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center text-gray-500">
        Loading stock movements...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Stock History</h3>
      </div>

      {selectedProduct && (
        <StockModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-gray-700"
              >
                Product
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-gray-700"
              >
                SKU
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-gray-700"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-center text-sm font-semibold text-gray-700"
              >
                Qty Changed
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-center text-sm font-semibold text-gray-700"
              >
                Current Qty
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-gray-700"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-gray-700"
              >
                Changed By
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-center text-sm font-semibold text-gray-700"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {movements.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-16 text-center text-gray-500 italic"
                >
                  No stock movements found
                </td>
              </tr>
            ) : (
              movements.map((m) => {
                const upperType = (m.type || "").toUpperCase();

                let isIncoming = false;
                if (["IN", "ADDITION", "RECEIVE", "RESTOCK", "RETURN"].includes(upperType)) {
                  isIncoming = true;
                } else if (["OUT", "DEDUCTION", "SALE", "REMOVE", "TRANSFER_OUT"].includes(upperType)) {
                  isIncoming = false;
                } else {
                  isIncoming = m.quantity > 0;
                }

                const signColor = isIncoming ? "text-green-600" : "text-red-600";
                const sign = isIncoming ? "+" : "−";

                return (
                  <tr
                    key={m._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {m.product?.name || "—"}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {m.product?.sku || "—"}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                      {m.type}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <span className={signColor}>
                        {sign}
                        {Math.abs(m.quantity)}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                      {m.afterQuantity ?? "—"}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(m.createdAt).toLocaleString()}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {m.createdBy?.email ?? "System"}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={() => setSelectedProduct(m.product)}
                          className="text-yellow-600 hover:text-yellow-800 font-medium transition-colors"
                          title="Adjust stock"
                        >
                          Adjust
                        </button>
                        <button
                          onClick={() => dispatch(deleteMovement(m._id))}
                          className="text-red-600 hover:text-red-800 font-medium transition-colors"
                          title="Delete movement"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovementHistory;