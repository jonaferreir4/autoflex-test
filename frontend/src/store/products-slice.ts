import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../services/api';
import type { Product, CompositionRequest } from '../types';

interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
};


export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await api.get('/products');
  return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (newProduct: Omit<Product, 'id'>) => {
  const response = await api.post('/products', newProduct);
  return response.data;
});
export const addComposition = createAsyncThunk('products/addComposition', async (data: CompositionRequest) => {
  await api.post(`/products/${data.productId}/composition`, data);
  return; 
});

export const updateProduct = createAsyncThunk( 'products/updateProduct', async ({ id, data }: { id: number; data: Omit<Product, 'id'> }) => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: number) => {
    await api.delete(`/products/${id}`);
    return id;
  }
);


const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addComposition.fulfilled, () => {
       
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      });
    
      
  },
});

export default productsSlice.reducer;