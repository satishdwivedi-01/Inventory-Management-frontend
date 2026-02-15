const RecentMovements = ({ items }) => {
  return (
    <div className={`
      bg-white border border-gray-100 rounded-xl shadow-sm 
      overflow-hidden transition-shadow hover:shadow-md duration-200
    `}>
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">
          Recent Activity
        </h3>
      </div>

      {items.length === 0 ? (
        <div className="px-6 py-10 text-center text-gray-500">
          No recent movements • All quiet
        </div>
      ) : (
        <div className="divide-y divide-gray-100 p-4 max-h-80 overflow-y-auto">
          {items.map((m) => (
            <div
              key={m._id}
              className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/70 transition-colors duration-150"
            >
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">
                  {m.product?.name || "Unknown Product"}
                </span>
                <span className="text-sm text-gray-500 capitalize">
                  {m.type?.toLowerCase() || "—"}
                </span>
              </div>
              <span className={`
                font-semibold tabular-nums
                ${m.type?.toLowerCase().includes("in") || m.type?.toLowerCase().includes("add") 
                  ? "text-emerald-600" 
                  : "text-amber-600"}
              `}>
                {m.quantity > 0 ? "+" : ""}{m.quantity}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentMovements;