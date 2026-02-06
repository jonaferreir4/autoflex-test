import { useState, useEffect } from 'react';
import { Layers, Trash2, Pencil, X, Plus } from 'lucide-react';
import { useAppDispatch } from '../store/hooks';
import { deleteProduct, addComposition } from '../store/products-slice';
import { api } from '../services/api';
import type { Product, RawMaterial, CompositionItem } from '../types';

interface Props {
  product: Product;
  materials: RawMaterial[];
  onEdit: (product: Product) => void; 
}

export function ProductCard({ product, materials, onEdit }: Props) {
  const dispatch = useAppDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const [composition, setComposition] = useState<CompositionItem[]>([]);
  const [loadingRecipe, setLoadingRecipe] = useState(false);

  const [matId, setMatId] = useState('');
  const [qty, setQty] = useState('');

  useEffect(() => {
    if (isExpanded) {
      loadComposition();
    }
  }, [isExpanded, product.id]);

  const loadComposition = async () => {
    setLoadingRecipe(true);
    try {
      const res = await api.get(`/products/${product.id}/composition`);
      setComposition(res.data);
    } catch (error) {
      console.error("Erro ao carregar receita", error);
    } finally {
      setLoadingRecipe(false);
    }
  };

  const handleDeleteProduct = () => {
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
      loadComposition();
    } catch {
      alert('Erro ao vincular.');
    }
  };

  const handleRemoveIngredient = async (materialId: number) => {
    if (!confirm("Remover este ingrediente?")) return;
    try {
      await api.delete(`/products/${product.id}/composition/${materialId}`);
      loadComposition();
    } catch {
      alert("Erro ao remover ingrediente.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-mono">
              {product.code}
            </span>
          </div>
          <p className="text-green-600 font-semibold">R$ {product.value.toFixed(2)}</p>
        </div>
        <div className="flex gap-1">
          <button onClick={() => onEdit(product)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded" title="Editar">
            <Pencil size={16} />
          </button>
          <button onClick={handleDeleteProduct} className="p-1.5 text-red-600 hover:bg-red-50 rounded" title="Excluir">
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
          
          <div className="mb-4">
            <p className="text-xs font-bold text-gray-500 mb-2 uppercase">Ingredientes:</p>
            {loadingRecipe ? (
              <p className="text-xs text-gray-400">Carregando...</p>
            ) : composition.length === 0 ? (
              <p className="text-xs text-gray-400 italic">Nenhum ingrediente.</p>
            ) : (
              <ul className="space-y-1">
                {composition.map(item => (
                  <li key={item.id} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded border border-gray-100">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-700">{item.rawMaterialName}</span>
                      <span className="text-xs text-gray-400">{item.rawMaterialCode}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-blue-600">{item.quantityRequired} un.</span>
                      <button 
                        onClick={() => handleRemoveIngredient(item.rawMaterialId)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                        title="Remover"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className="text-xs font-bold text-gray-500 mb-2 uppercase border-t pt-2">Adicionar / Alterar:</p>
          <form onSubmit={handleAddComposition} className="space-y-2">
            <select 
              className="w-full border p-2 rounded text-sm bg-white outline-none focus:border-blue-500" 
              value={matId} onChange={e => setMatId(e.target.value)} required
            >
              <option value="">Selecione...</option>
              {materials.map(m => (
                <option key={m.id} value={m.id}>{m.name} ({m.code})</option>
              ))}
            </select>
            <div className="flex gap-2">
              <input 
                placeholder="Qtd" type="number" step="0.1"
                className="border p-2 rounded w-full text-sm outline-none focus:border-blue-500" 
                value={qty} onChange={e => setQty(e.target.value)} required
              />
              <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center">
                <Plus size={16} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}