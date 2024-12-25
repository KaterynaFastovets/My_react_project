import React, { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, deleteProduct } from "../redux/features/product/productSlice";

export const MainPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  const [deleteError, setDeleteError] = useState(""); // Error state for delete operation
  const [isSuccess, setIsSuccess] = useState(false); // Success popup state
  const [minPrice, setMinPrice] = useState(""); // Minimum price filter
  const [maxPrice, setMaxPrice] = useState(""); // Maximum price filter
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered product list

  useEffect(() => {
    dispatch(getAllProduct()); // Fetch products when the component mounts
  }, [dispatch]);

  useEffect(() => {
    // Apply price filtering whenever the product list or price filters change
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
      await dispatch(getAllProduct()); 
      setIsSuccess(true); 
    } catch (error) {
      setDeleteError("Помилка при видаленні товару. Спробуйте ще раз."); 
    }
  };

  return (
    <div className="p-4">
      {/* Price Filter Controls */}
      <div className="mb-4 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="number"
          placeholder="Мінімальна ціна"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border border-gray-300 text-xs  p-2 px-4 py-2 rounded-sm hover:border-emerald-600"
        />
        <input
          type="number"
          placeholder="Максимальна ціна"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-gray-300 text-xs  p-2 px-4 py-2 rounded-sm hover:border-emerald-600"
        />
        <button
          onClick={() => {
            setMinPrice("");
            setMaxPrice("");
          }}
          className="flexs justify-center items-center bg-emerald-600 text-xs text-white px-4 py-2 rounded-sm"
        >
          Скинути фільтри
        </button>
      </div>

      {/* Product */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} onDelete={handleDeleteProduct} />
          ))
        ) : (
          <div className="col-span-4 text-center text-gray-600">Немає доступних товарів.</div>
        )}
      </div>

      {/* Popup */}
      {isSuccess && (
        <div className="popup">
          <div className="popup-content">
            <h2>Товар успішно видалено!</h2>
            <button onClick={() => setIsSuccess(false)} className="btn-close">
              Закрити
            </button>
          </div>
        </div>
      )}

      {deleteError && (
        <div className="mt-4 text-center text-red-500">
          <strong>Помилка: </strong>{deleteError}
        </div>
      )}
    </div>
  );
};
