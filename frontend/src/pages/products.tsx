import { useEffect } from 'react';
import { ShoppingCart, Plus, Save, X, Wand2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProducts } from '../store/products-slice';
import { fetchMaterials } from '../store/materials-slice';
import { PageHeader } from '../components/page-header';
import { Loader } from '../components/loader';
import { ProductCard } from '../components/product-card';
import { useProductForm } from '../hooks/use-product-form';

export function Products() {
  const dispatch = useAppDispatch();
  const { items: products, status } = useAppSelector((state) => state.products);
  const { items: materials } = useAppSelector((state) => state.materials);

  const { 
    code, setCode,
    name, setName, 
    value, setValue, 
    editingId, 
    handleSubmit, 
    startEditing, 
    cancelEditing,
    generateCode,
  } = useProductForm();

  useEffect(() => {
    if (status === 'idle') { 
      dispatch(fetchProducts()); 
      dispatch(fetchMaterials()); 
    }
  }, [dispatch, status]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <PageHeader title="Produtos" icon={ShoppingCart} />

      <form 
        onSubmit={handleSubmit} 
        className={`p-5 rounded-lg shadow-md mb-8 flex gap-4 items-end border-l-4 transition-all ${
          editingId ? 'bg-amber-50 border-amber-500' : 'bg-white border-green-500'
        }`}
      >

       <div className="w-40">
          <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
          <div className="flex gap-1">
            <input 
              className="border p-2 rounded w-full outline-none focus:ring-2 focus:ring-green-500 font-mono uppercase" 
              value={code} onChange={e => setCode(e.target.value)} 
              required placeholder="SKU-XXXX" 
            />
            {!editingId && (
              <button 
                type="button" 
                onClick={generateCode}
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded border border-gray-200"
                title="Gerar SKU Automático"
              >
                <Wand2 size={18} />
              </button>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {editingId ? 'Editar Produto' : 'Novo Produto'}
          </label>
          <input 
            className="border p-2 rounded w-full focus:ring-2 focus:ring-green-500 outline-none" 
            value={name} onChange={e => setName(e.target.value)} 
            required placeholder="Ex: Mesa de Jantar" 
          />
        </div>
        <div className="w-32">
          <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
          <input 
            type="number" step="0.01" 
            className="border p-2 rounded w-full focus:ring-2 focus:ring-green-500 outline-none" 
            value={value} onChange={e => setValue(e.target.value)} 
            required 
          />
        </div>
        <div className="flex gap-2">
          <button 
            type="submit" 
            className={`px-4 py-2 rounded text-white flex items-center gap-2 ${
              editingId ? 'bg-amber-600 hover:bg-amber-700' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {editingId ? <Save size={18} /> : <Plus size={18} />}
            {editingId ? 'Salvar' : 'Criar'}
          </button>
          
          {editingId && (
            <button 
              type="button" onClick={cancelEditing} 
              className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </form>

      {status === 'loading' ? <Loader /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              materials={materials}
              onEdit={startEditing} 
            />
          ))}
        </div>
      )}
    </div>
  );
}