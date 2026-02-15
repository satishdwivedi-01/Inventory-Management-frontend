import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fetchProducts,
  setPage,
  deleteProduct,
  createProduct,
  updateProduct,
} from "../productSlice";
import ProductTable from "../components/ProductTable";
import ProductToolbar from "../components/ProductToolbar";
import ProductFormModal from "../components/ProductFormModal";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { items, page, limit, loading } = useAppSelector(
    (s) => s.products
  );
  const { user } = useAppSelector((s) => s.auth);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);


  useEffect(() => {
    dispatch(fetchProducts({ page, limit, search }));
  }, [dispatch, page, limit, search]);

  return (
    <div className="p-6">
      <ProductToolbar
        onSearch={setSearch}
        onAdd={() => {
          setEditing(null);
          setOpen(true);
        }}
        isAdmin={user?.role === "ADMIN"}
      />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ProductTable
          items={items}
          isAdmin={user?.role === "ADMIN"}
          onEdit={(p) => {
            setEditing(p);
            setOpen(true);
          }}

          onDelete={(id) => dispatch(deleteProduct(id))}
        />
      )}

      {/* product form */}
      <ProductFormModal
        open={open}
        initialData={editing}
        onClose={() => setOpen(false)}
        onSubmit={(data) => {
          if (editing) {
            dispatch(updateProduct({ id: editing._id, data }));
          } else {
            dispatch(createProduct(data));
          }
          setOpen(false);
        }}
      />

    </div>
  );
};

export default ProductList;
