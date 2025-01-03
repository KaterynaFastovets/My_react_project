import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (products && Array.isArray(products)) {
      const foundProduct = products.find((item) => item._id === id);
      setProduct(foundProduct);
    }
  }, [id, products]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Товар не знайдено...</p>
      </div>
    );
  }

  return (
    <div className="p-10 flex flex-col items-center">
      <div className="w-96 bg-white rounded-md shadow-md p-4">
        {product.imgUrl ? (
          <img
            src={`http://localhost:3002/${product.imgUrl}`}
            alt={product.productName}
            className="h-64 w-full object-cover rounded-md"
          />
        ) : (
          <div className="h-64 bg-gray-200 flex justify-center items-center rounded-md">
            Без зображення
          </div>
        )}
        <h2 className="text-2xl font-semibold mt-4">{product.productName}</h2>
        <p className="text-gray-600 mt-2">{product.text}</p>
        <p className="text-lg font-semibold mt-2">{product.price} грн</p>
      </div>
    </div>
  );
};
