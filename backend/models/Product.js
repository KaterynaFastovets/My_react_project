import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  imgUrl: {
    type: String,
    default: "",
    match: /^[a-zA-Z0-9\/.,]{1,200}$/, 
  },
  productName: {
    type: String,
    required: true,
    match: /^[a-zA-Zа-яА-ЯёЁ0-9\s.,!*?()-]{1,100}$/, 
  },
  text: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9а-яА-ЯіІїЇєЄґҐ\s.,*()\-]+$/,
  },
  price: { type: Number, required: true, min: 0, max: 9999 },
});

export default mongoose.model("Product", ProductSchema);
