import { Plus, Save, X } from 'lucide-react';

interface Props {
  code: string;
  setCode: (val: string) => void;
  name: string;
  setName: (val: string) => void;
  qty: string;
  setQty: (val: string) => void;
  editingId: number | null;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function RawMaterialForm({ code, setCode, name, setName, qty, setQty, editingId, onSubmit, onCancel }: Props) {
  return (
    <form 
      onSubmit={onSubmit} 
      className={`p-4 rounded-lg shadow-md mb-6 flex gap-4 items-end border-l-4 transition-colors ${
        editingId ? 'bg-amber-50 border-amber-500' : 'bg-white border-blue-500'
      }`}
    >
      <div className="w-32">
        <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
        <input 
          className="border p-2 rounded w-full outline-none focus:ring-2 focus:ring-blue-500" 
          value={code} onChange={e => setCode(e.target.value)} 
          placeholder="MAT-01" required 
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {editingId ? 'Editando Nome' : 'Novo Nome'}
        </label>
        <input 
          className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-500 outline-none" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Ex: Madeira, Ferro..."
          required 
        />
      </div>
      <div className="w-32">
        <label className="block text-sm font-medium text-gray-700 mb-1">Estoque</label>
        <input 
          type="number" 
          className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-500 outline-none" 
          value={qty} 
          onChange={e => setQty(e.target.value)} 
          required 
        />
      </div>
      
      <div className="flex gap-2">
        <button 
          type="submit" 
          className={`px-4 py-2 rounded text-white flex items-center gap-2 shadow-sm transition-colors ${
            editingId ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {editingId ? <Save size={18} /> : <Plus size={18} />}
          {editingId ? 'Salvar' : 'Adicionar'}
        </button>
        
        {editingId && (
          <button 
            type="button" 
            onClick={onCancel}
            className="px-3 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            title="Cancelar edição"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </form>
  );
}