import { useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import StockHistory from "../components/MovementHistory";
import StockModal from "../components/StockModal";

const StockPage = () => {
  const { user } = useAppSelector((s) => s.auth);
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (user?.role !== "ADMIN") return <div>Access Denied</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Here you can optionally add a product selector */}
      {selectedProduct && (
        <StockModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <StockHistory onEdit={(p) => setSelectedProduct(p)} />
    </div>
  );
};

export default StockPage;
