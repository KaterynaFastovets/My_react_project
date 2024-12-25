import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import productRoute from "./routes/products.js";
import fileUpload from "express-fileupload";

const app = express();
dotenv.config();


const PORT = process.env.PORT || 3002;
const MONGO_DB_USER = process.env.MONGO_DB_USER;
const MONGO_DB_KEY = process.env.MONGO_DB_KEY;
const MONGO_DB_SERVER_NAME = process.env.MONGO_DB_SERVER_NAME;

//Middelware

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));


// Routes

app.use("/api/products", productRoute);

mongoose
  .connect(
    `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_KEY}@cluster0.9uu0n.mongodb.net/${MONGO_DB_SERVER_NAME}?retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  )
  .catch((err) => console.log("Error connecting to MongoDB:", err));