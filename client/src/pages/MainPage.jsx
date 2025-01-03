import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProduct,
  deleteProduct,
  updateProduct,
} from "../redux/features/product/productSlice";

export const MainPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  const [deleteError, setDeleteError] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(products)) {
      const filtered = products.filter((product) => {
        const price = product.price || 0;
        const isAboveMin = minPrice === "" || price >= parseFloat(minPrice);
        const isBelowMax = maxPrice === "" || price <= parseFloat(maxPrice);
        return isAboveMin && isBelowMax;
      });
      setFilteredProducts(filtered);
    }
  }, [products, minPrice, maxPrice]);

  const handleDeleteProduct = async (productId) => {
    try {
      await dispatch(deleteProduct(productId)).unwrap();
      setFilteredProducts((prev) =>
        prev.filter((prod) => prod._id !== productId)
      );
      setIsDeleteSuccess(true);
    } catch (error) {
      setDeleteError("Помилка при видаленні товару. Спробуйте ще раз.");
    }
  };

  const handleEditProduct = (product) => {
    setIsEditing(true);
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      setUpdateError("");
      await dispatch(
        updateProduct({
          id: updatedProduct._id,
          updatedData: updatedProduct,
        })
      ).unwrap();


      setFilteredProducts((prev) =>
        prev.map((prod) =>
          prod._id === updatedProduct._id ? updatedProduct : prod
        )
      );

      setIsEditing(false);
      setIsUpdateSuccess(true);
    } catch (error) {
      setUpdateError("Помилка при оновленні товару. Спробуйте ще раз.");
    }
  };

  return (
    <div className="p-4 ">
      <div className="mb-4 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="number"
          placeholder="Мінімальна ціна"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border border-gray-300 text-xs p-2 px-4 py-2 rounded-sm hover:border-emerald-600"
        />
        <input
          type="number"
          placeholder="Максимальна ціна"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-gray-300 text-xs p-2 px-4 py-2 rounded-sm hover:border-emerald-600"
        />
        <button
          onClick={() => {
            setMinPrice("");
            setMaxPrice("");
          }}
          className="flex justify-center items-center bg-emerald-600 text-xs text-white px-4 py-2 rounded-sm"
        >
          Скинути фільтри
        </button>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 justify-items-center items-center p-4 ">
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={handleDeleteProduct}
              onEdit={handleEditProduct}
            />
          ))
        ) : (
          <div className="col-span-4 text-center text-gray-600">
            Немає доступних товарів.
          </div>
        )}
      </div>

      {/* Edit Product Form */}
      {isEditing && editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="edit-product-form p-6 bg-white shadow-lg rounded-sm w-full max-w-md">
            <h2 className="text-xl mb-4">Редагувати товар</h2>
            <input
              type="text"
              value={editingProduct.productName}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  productName: e.target.value,
                })
              }
              placeholder="Назва товару"
              className="border p-2 w-full mb-4"
            />
            <textarea
              value={editingProduct.text}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, text: e.target.value })
              }
              placeholder="Опис"
              className="border p-2 w-full mb-4"
            />
            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: e.target.value })
              }
              placeholder="Ціна"
              className="border p-2 w-full mb-4"
            />
            {updateError && (
              <div className="mb-4 text-red-500">
                <strong>Помилка: </strong>
                {updateError}
              </div>
            )}
            <div className="flex justify-end">
              <button
                onClick={() => handleUpdateProduct(editingProduct)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-sm"
              >
                Оновити товар
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-red-600 text-white px-4 py-2 rounded-sm ml-2"
              >
                Скасувати
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup for Deletion */}
      {isDeleteSuccess && (
        <div className="popup">
          <div className="popup-content">
            <h2>Товар успішно видалено!</h2>
            <button
              onClick={() => {
                setIsDeleteSuccess(false);
                navigate("/");
              }}
              className="btn-close"
            >
              Закрити
            </button>
          </div>
        </div>
      )}

      {/* Popup for Update */}
      {isUpdateSuccess && (
        <div className="popup">
          <div className="popup-content">
            <h2>Товар успішно оновлено!</h2>
            <button
              onClick={() => {
                setIsUpdateSuccess(false);
                navigate("/");
              }}
              className="btn-close"
            >
              Закрити
            </button>
          </div>
        </div>
      )}

      {/* Error Handling for Deletion */}
      {deleteError && (
        <div className="mt-4 text-center text-red-500">
          <strong>Помилка: </strong>
          {deleteError}
        </div>
      )}
    </div>
  );
};
