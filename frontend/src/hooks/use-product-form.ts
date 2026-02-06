import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addProduct, updateProduct } from '../store/products-slice';
import type { Product } from '../types';

export function useProductForm() {
  const dispatch = useAppDispatch();
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setCode(product.code);
    setName(product.name);
    setValue(String(product.value));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setCode('');
    setName('');
    setValue('');
  };

  const generateCode = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setCode(`SKU-${randomNum}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { code, name, value: Number(value) };

    if (editingId) {
      await dispatch(updateProduct({ id: editingId, data: payload }));
      cancelEditing();
    } else {
      await dispatch(addProduct(payload));
      setCode(''); setName(''); setValue('');
    }
  };

  return {
    code, setCode,
    name, setName,
    value, setValue,
    editingId,
    handleSubmit,
    startEditing,
    cancelEditing,
    generateCode,
  };
}