import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../services/api';
import type { RawMaterial } from '../types';

interface MaterialsState {
  items: RawMaterial[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: MaterialsState = {
  items: [],
  status: 'idle',
};

export const fetchMaterials = createAsyncThunk('materials/fetchMaterials', async () => {
  const response = await api.get('/raw-materials');
  return response.data; 
});

export const addMaterial = createAsyncThunk('materials/addMaterial', async (newMaterial: Omit<RawMaterial, 'id'>) => {
  const response = await api.post('/raw-materials', newMaterial);
  return response.data;
});

export const updateMaterial = createAsyncThunk( 'materials/updateMaterial', async ({ id, data }: { id: number; data: Omit<RawMaterial, 'id'> }) => {
    const response = await api.put(`/raw-materials/${id}`, data);
    return response.data;
  }
);

export const deleteMaterial = createAsyncThunk('materials/deleteMaterial', async (id: number) => {
    await api.delete(`/raw-materials/${id}`);
    return id;
  }
);

const materialsSlice = createSlice({
  name: 'materials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterials.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMaterials.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(addMaterial.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(updateMaterial.fulfilled, (state, action) => {
        const index = state.items.findIndex((material) => material.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteMaterial.fulfilled, (state, action) => {
        state.items = state.items.filter((material) => material.id !== action.payload);
      });
  },
});

export default materialsSlice.reducer;