import { Pencil, Trash2 } from 'lucide-react';
import type { RawMaterial } from '../types';
import { Loader } from './loader';
interface Props {
  items: RawMaterial[];
  status: string;
  onEdit: (item: RawMaterial) => void;
  onDelete: (id: number) => void;
}

export function RawMaterialList({ items, status, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      {status === 'loading' ? (
        <Loader />
      ) : (
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-4 border-b">ID</th>
              <th className="p-4 border-b">Nome</th>
              <th className="p-4 border-b">Estoque Atual</th>
              <th className="p-4 border-b text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map(m => (
              <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-gray-500">#{m.id}</td>
                <td className="p-4 font-medium text-gray-800">{m.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${m.stockQuantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {m.stockQuantity} un.
                  </span>
                </td>
                <td className="p-4 flex justify-end gap-2">
                  <button onClick={() => onEdit(m)} className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors" title="Editar">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => onDelete(m.id)} className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors" title="Excluir">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && status === 'succeeded' && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">Nenhuma matéria-prima cadastrada.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}