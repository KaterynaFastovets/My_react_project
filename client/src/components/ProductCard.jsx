import React, { useState } from "react";
import { Link } from "react-router-dom";

export const ProductCard = ({ product, onDelete, onEdit }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      if (!product._id) {
        setError("Відсутній ID товару.");
        return;
      }

      setLoading(true);
      setError(null);
      await onDelete(product._id);
      setShowPopup(false);
    } catch (err) {
      setError("Помилка при видаленні товару. Спробуйте ще раз.");
      console.error("Помилка при видаленні товару:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col gap-4 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow w-80 bg-white">
      <Link
        to={`/${product._id}`}
        className="flex flex-col flex-grow rounded-sm"
      >
        <div
          className={product.imgUrl ? "h-64 border" : "h-64 border bg-gray-300"}
        >
          {product.imgUrl ? (
            <img
              src={`http://localhost:3002/${product.imgUrl}`}
              alt={product.productName}
              className="object-cover h-full w-full"
            />
          ) : (
            <div className="w-full h-full flex justify-center items-center text-gray-500">
              Без зображення
            </div>
          )}
        </div>
        <div className="text-gray-800 mt-2 text-xl font-semibold">
          {product.productName}
          <p className="text-gray-600 text-xs pt-4 mt-2 opacity-70">
            {product.text}
          </p>
          <p className="text-gray-800 text-xl mt-2">{product.price} грн</p>
        </div>
      </Link>
      <div className=" bottom-2 left-2 right-2 flex justify-between">
        {/* Edit Button */}
        <button
          onClick={() => onEdit(product)} 
          className="text-blue-500 text-2xl"
          aria-label="Редагувати товар"
        >
          ✎ 
        </button>

        {/* Delete Button */}
        <button
          onClick={() => setShowPopup(true)}
          className="text-red-500 text-2xl"
          aria-label="Видалити товар"
        >
          &#10005; 
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div
          className={`popup fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out ${
            showPopup ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="popup-content bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold text-gray-700">
              Ви впевнені, що хочете видалити цей товар?
            </h3>
            <div className="flex justify-around mt-4">
              <button
                onClick={handleDelete}
                className="bg-emerald-600 text-white px-4 py-2 rounded-md w-24"
                aria-label="Підтвердити видалення"
                disabled={loading}
              >
                {loading ? "Зачекайте..." : "Так"}
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-red-600 text-white px-4 py-2 rounded-md w-24"
                aria-label="Скасувати видалення"
              >
                Ні
              </button>
            </div>

            {error && <p className="text-red-600 mt-2 text-xs">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};
