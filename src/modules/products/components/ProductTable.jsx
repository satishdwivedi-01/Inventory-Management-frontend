const ProductTable = ({ items, isAdmin, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Product Name
              </th>
              <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                SKU
              </th>
              <th scope="col" className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Stock
              </th>
              <th scope="col" className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                Price
              </th>
              {isAdmin && (
                <th scope="col" className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 5 : 4}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No products found
                </td>
              </tr>
            ) : (
              items.map((product) => {
                const isLowStock = product.quantity <= (product.lowStockThreshold ?? 0);
                const stockColor = isLowStock
                  ? "text-red-600 font-semibold"
                  : product.quantity === 0
                  ? "text-amber-600 font-medium"
                  : "text-gray-900";

                return (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {product.sku || "—"}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`text-sm ${stockColor}`}>
                        {product.quantity}
                        {isLowStock && (
                          <span className="ml-2 text-xs font-medium text-red-700">
                            low
                          </span>
                        )}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </td>

                    {isAdmin && (
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => onEdit(product)}
                            className="text-indigo-600 hover:text-indigo-800 transition-colors"
                            title="Edit product"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => onDelete(product._id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title="Delete product"
                          >
                            🗑
                          </button>
                        </div>
                      </td>
                    )}
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

export default ProductTable;