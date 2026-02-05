import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addProduct, updateProduct } from '../store/products-slice';
import type { Product } from '../types';

export function useProductForm() {
  const dispatch = useAppDispatch();
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setName(product.name);
    setValue(String(product.value));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setName('');
    setValue('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await dispatch(updateProduct({ id: editingId, data: { name, value: Number(value) } }));
      cancelEditing();
    } else {
      await dispatch(addProduct({ name, value: Number(value) }));
      setName('');
      setValue('');
    }
  };

  return {
    name, setName,
    value, setValue,
    editingId,
    handleSubmit,
    startEditing,
    cancelEditing
  };
}