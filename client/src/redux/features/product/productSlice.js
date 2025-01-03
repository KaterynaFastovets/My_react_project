import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

// Create Product
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/products`, params);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get All Products
export const getAllProduct = createAsyncThunk(
  "product/getAllProduct",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/products`);
      return data.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update Product
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      console.log("Updating product with ID:", id);
      console.log("Updated data:", updatedData);

      if (!id) {
        return rejectWithValue("Product ID is missing.");
      }
      const { data } = await axios.put(`/products/${id}`, updatedData);

      return data; 
    } catch (error) {
      console.error("Error updating product:", error);
      return rejectWithValue(
        error.response?.data || "Failed to update product"
      );
    }
  }
);


// Delete Product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (_id, { rejectWithValue }) => {
    try {
      await axios.delete(`/products/${_id}`);
      return _id; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete product"
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // Create Product
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      if (!state.products) {
        state.products = [];
      }
      state.products.push(action.payload);
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get All Products
    builder.addCase(getAllProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getAllProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update Product
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;

      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );

      if (index !== -1) {
        state.products[index] = action.payload;
      }
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to update product";
    });

    // Delete Product
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;

      if (state.products) {
        state.products = state.products.filter(
          (product) => product._id !== action.payload 
        );
      }
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to delete product";
    });
  },
});

export default productSlice.reducer;
