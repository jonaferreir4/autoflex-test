import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addMaterial, updateMaterial } from '../store/materials-slice';
import type { RawMaterial } from '../types';

export function useRawMaterialForm() {
  const dispatch = useAppDispatch();
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [qty, setQty] = useState('');

  const startEditing = (material: RawMaterial) => {
    setEditingId(material.id);
    setName(material.name);
    setQty(String(material.stockQuantity));
  };

  const cancelEditing = () => {
    setEditingId(null);
    setName('');
    setQty('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      await dispatch(updateMaterial({ 
        id: editingId, 
        data: { name, stockQuantity: Number(qty) } 
      }));
      cancelEditing();
    } else {
      await dispatch(addMaterial({ 
        name, 
        stockQuantity: Number(qty) 
      }));
      setName('');
      setQty('');
    }
  };

  return {
    name, setName,
    qty, setQty,
    editingId,
    startEditing,
    cancelEditing,
    handleSubmit
  };
}