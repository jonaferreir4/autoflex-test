import { useState } from 'react';
import { Layers, Trash2, Pencil } from 'lucide-react';
import { useAppDispatch } from '../store/hooks';
import { deleteProduct, addComposition } from '../store/products-slice';
import type { Product, RawMaterial } from '../types';

interface Props {
  product: Product;
  materials: RawMaterial[];
  onEdit: (product: Product) => void; 
}

export function ProductCard({ product, materials, onEdit }: Props) {
  const dispatch = useAppDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const [matId, setMatId] = useState('');
  const [qty, setQty] = useState('');

  const handleDelete = () => {
    if (confirm(`Excluir "${product.name}"?`)) {
      dispatch(deleteProduct(product.id));
    }
  };

  const handleAddComposition = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(addComposition({ 
        productId: product.id, 
        rawMaterialId: Number(matId), 
        quantityRequired: Number(qty) 
      })).unwrap();
      
      alert('Ingrediente vinculado!');
      setMatId(''); setQty('');
    } catch {
      alert('Erro ao vincular.');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
          <p className="text-green-600 font-semibold">R$ {product.value.toFixed(2)}</p>
        </div>
        <div className="flex gap-1">
          <button onClick={() => onEdit(product)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Editar">
            <Pencil size={16} />
          </button>
          <button onClick={handleDelete} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Excluir">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full text-sm py-2 rounded flex items-center justify-center gap-2 transition-colors ${isExpanded ? 'bg-gray-200 text-gray-700' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
      >
        <Layers size={16} /> {isExpanded ? 'Fechar Receita' : 'Gerenciar Receita'}
      </button>

      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-gray-100 animate-in fade-in">
          <form onSubmit={handleAddComposition} className="space-y-2">
            <select 
              className="w-full border p-2 rounded text-sm bg-gray-50 outline-none focus:border-blue-500" 
              value={matId} onChange={e => setMatId(e.target.value)} required
            >
              <option value="">Add Ingrediente...</option>
              {materials.map(m => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <input 
                placeholder="Qtd" type="number" step="0.1"
                className="border p-2 rounded w-full text-sm outline-none focus:border-blue-500" 
                value={qty} onChange={e => setQty(e.target.value)} required
              />
              <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">OK</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}