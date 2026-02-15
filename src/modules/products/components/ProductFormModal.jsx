import { useEffect, useState } from "react";

const ProductFormModal = ({ open, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: "",
    lowStockThreshold: "",
  });

  const [manualSKU, setManualSKU] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setManualSKU(false); // reset manual SKU toggle
    } else {
      setForm({
        name: "",
        sku: "",
        price: "",
        quantity: "",
        lowStockThreshold: "",
      });
      setManualSKU(false);
    }
  }, [initialData]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = () => {
    // if manual SKU is disabled, send null so backend generates automatically
    const payload = { ...form };
    if (!manualSKU) payload.sku = null;
    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-96 space-y-3">
        <h2 className="text-lg font-semibold">
          {initialData ? "Edit Product" : "Add Product"}
        </h2>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={manualSKU}
            onChange={(e) => setManualSKU(e.target.checked)}
          />
          <span className="text-sm">Enable manual SKU (optional)</span>
        </div>
        <p className="text-xs text-gray-500">
          Auto-SKU is recommended. Leave unchecked to generate automatically.
        </p>

        {manualSKU && (
          <input
            name="sku"
            placeholder="SKU"
            value={form.sku}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        )}

        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="lowStockThreshold"
          placeholder="Low stock limit"
          value={form.lowStockThreshold}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={submit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;
