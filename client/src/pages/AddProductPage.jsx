import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { createProduct } from "../redux/features/product/productSlice";

// Validation Schema
const AddProductSchema = Yup.object().shape({
  imgUrl: Yup.mixed().nullable(),
  productName: Yup.string()
    .max(30, "Максимум 30 символів")
    .required("Обов’язкове поле"),
  text: Yup.string()
    .max(200, "Максимум 200 символів")
    .required("Обов’язкове поле"),
  price: Yup.number()
    .min(1, "Мінімум 1")
    .max(9999, "Максимум 9999")
    .required("Обов’язкове поле"),
});

export const AddProductPage = () => {
  const [image, setImage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearFormHandler = (resetForm) => {
    resetForm();
    setImage(null); 
  };

  return (
    <div>
      {/* Popup */}
      {isSuccess && (
        <div className="popup">
          <div className="popup-content">
            <h2>Товар успішно додано!</h2>
            <button
              onClick={() => {
                setIsSuccess(false); 
                navigate("/"); 
              }}
              className="btn-close"
            >
              Перейти до товарів
            </button>
          </div>
        </div>
      )}

      {/* Formik Form */}
      <Formik
        initialValues={{ productName: "", text: "", price: "", imgUrl: "" }}
        validationSchema={AddProductSchema}
        onSubmit={(values, { resetForm }) => {
          try {
            const data = new FormData();
            data.append("image", image);
            data.append("productName", values.productName);
            data.append("text", values.text);
            data.append("price", values.price);

            dispatch(createProduct(data));

            resetForm();
            setIsSuccess(true); 
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {({ isSubmitting, handleChange, setFieldValue, values, resetForm }) => (
          <Form className="w-1/3 mx-auto py-10">
            <label className="text-white py-2 bg-emerald-600 mt-2 flex justify-center items-center border-2 border-dotted cursor-pointer">
              Додати зображення:
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFieldValue("imgUrl", file); 
                  setImage(file); 
                }}
              />
            </label>
            <div className="flex object-cover py-2">
              {values.imgUrl && <img src={URL.createObjectURL(values.imgUrl)} alt={values.imgUrl.name} />}
            </div>

            {/* Product Name */}
            <label className="text-xs text-white opacity-65">
              Назва товару:
              <Field
                type="text"
                name="productName"
                value={values.productName}
                onChange={handleChange}
                placeholder="Назва"
                className="mt-1 text-black w-full rounded-lg bg-white border py-1 px-2 text-xs outline-none placeholder:text-gray-700 border-emerald-600"
              />
              <ErrorMessage name="productName" component="div" className="text-red-500 text-xs" />
            </label>

            {/* Product Description */}
            <label className="text-xs text-white opacity-65">
              Опис товару:
              <Field
                as="textarea"
                name="text"
                value={values.text}
                onChange={handleChange}
                placeholder="Опис товару"
                className="mt-1 text-black w-full rounded-lg bg-white border py-1 px-2 h-40 resize-none text-xs outline-none placeholder:text-gray-700 border-emerald-600"
              />
              <ErrorMessage name="text" component="div" className="text-red-500 text-xs" />
            </label>

            {/* Product Price */}
            <label className="text-xs text-white opacity-65">
              Ціна товару:
              <Field
                type="number"
                name="price"
                value={values.price}
                onChange={handleChange}
                placeholder="Введіть ціну"
                className="mt-1 text-black w-full rounded-lg bg-white border py-1 px-2 text-xs outline-none placeholder:text-gray-700 border-emerald-600"
              />
              <ErrorMessage name="price" component="div" className="text-red-500 text-xs" />
            </label>

            <div className="flex gap-8 justify-between items-center mt-4">
              <button
                type="submit"
                className="flex justify-center items-center bg-emerald-600 text-white rounded-sm text-xs py-2 px-4"
                disabled={isSubmitting}
              >
                Додати товар
              </button>
              <button
                type="button"
                onClick={() => clearFormHandler(resetForm)}
                className="flex justify-center items-center bg-red-600 text-white rounded-sm text-xs py-2 px-4"
                disabled={isSubmitting}
              >
                Відмінити
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
