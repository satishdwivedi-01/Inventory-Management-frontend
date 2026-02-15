import { useState } from "react";

const ProductToolbar = ({ onSearch, onAdd, isAdmin }) => {
  const [q, setQ] = useState("");

  return (
    <div className="flex justify-between mb-4">
      <input
        placeholder="Search..."
        className="border p-2 rounded w-60"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          onSearch(e.target.value);
        }}
      />

      {isAdmin && (
        <button
          onClick={onAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      )}
    </div>
  );
};

export default ProductToolbar;
