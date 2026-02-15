const LowStockList = ({ items }) => {
  return (
    <div className={`
      bg-white border border-gray-100 rounded-xl shadow-sm 
      overflow-hidden transition-shadow hover:shadow-md duration-200
    `}>
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">
          Low Stock Products
        </h3>
      </div>

      {items.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <p className="text-gray-500 font-medium">All products are well stocked 🎉</p>
          <p className="text-sm text-gray-400 mt-1">No items below threshold</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {items.map((p) => (
            <div
              key={p._id}
              className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/70 transition-colors duration-150"
            >
              <span className="font-medium text-gray-900 truncate max-w-[65%]">
                {p.name}
              </span>
              <span className={`
                font-semibold tabular-nums px-2.5 py-1 rounded-full text-sm
                ${p.quantity <= 5 
                  ? "bg-red-100 text-red-700" 
                  : p.quantity <= 15 
                    ? "bg-amber-100 text-amber-700" 
                    : "bg-gray-100 text-gray-700"}
              `}>
                {p.quantity} left
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LowStockList;