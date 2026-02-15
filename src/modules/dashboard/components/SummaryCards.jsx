const Card = ({ title, value }) => (
  <div className={`
    bg-white border border-gray-100 rounded-xl shadow-sm 
    hover:shadow-md transition-shadow duration-200 overflow-hidden
  `}>
    <div className="px-6 py-5">
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
        {title}
      </p>
      <h3 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
        {value}
      </h3>
    </div>
  </div>
);

const SummaryCards = ({ totalProducts, lowStockCount }) => {
  return (
    <div className="grid sm:grid-cols-2 gap-5 lg:gap-6">
      <Card title="Total Products" value={totalProducts} />
      <Card 
        title="Low Stock Items" 
        value={
          <span className={lowStockCount > 0 ? "text-red-600" : "text-emerald-600"}>
            {lowStockCount}
          </span>
        } 
      />
    </div>
  );
};

export default SummaryCards;