import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addMaterial, updateMaterial } from '../store/materials-slice';
import type { RawMaterial } from '../types';

export function useRawMaterialForm() {
  const dispatch = useAppDispatch();
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');

  const startEditing = (material: RawMaterial) => {
    setEditingId(material.id);
    setCode(material.code);
    setName(material.name);
    setQty(String(material.stockQuantity));
  };

  const cancelEditing = () => {
    setEditingId(null);
    setCode('');
    setName('');
    setQty('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { code, name, stockQuantity: Number(qty) };

    if (editingId) {
      await dispatch(updateMaterial({ id: editingId, data: payload }));
      cancelEditing();
    } else {
      await dispatch(addMaterial(payload));
      setCode(''); setName(''); setQty('');
    }
  };

  return {
    code, setCode, 
    name, setName,
    qty, setQty,
    editingId,
    startEditing,
    cancelEditing,
    handleSubmit
  };
}