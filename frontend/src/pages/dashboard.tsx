import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { ProductionSuggestion } from '../types';
import { TrendingUp, RefreshCw } from 'lucide-react';

export function Dashboard() {
  const [suggestions, setSuggestions] = useState<ProductionSuggestion[]>([]);
  const [totalValue, setTotalValue] = useState(0);

  const loadSuggestion = async () => {
    try {
      const res = await api.get('/production/suggestion');
      setSuggestions(res.data);
      const total = res.data.reduce((acc: number, item: ProductionSuggestion) => acc + item.totalValue, 0);
      setTotalValue(total);
    } catch (error) {
      console.error("Erro ao carregar sugestão", error);
    }
  };

  useEffect(() => { loadSuggestion(); }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <TrendingUp /> Sugestão de Produção (Otimizada)
        </h1>
        <button onClick={loadSuggestion} className="flex items-center gap-2 text-blue-600 hover:underline">
          <RefreshCw size={16} /> Recalcular
        </button>
      </div>

      <div className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg shadow-lg">
        <p className="text-sm opacity-80">Lucro Potencial Total</p>
        <p className="text-4xl font-bold">R$ {totalValue.toFixed(2)}</p>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        {suggestions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Nenhuma produção possível com o estoque atual.
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4">Produto</th>
                <th className="p-4">Quantidade Possível</th>
                <th className="p-4">Valor Total</th>
              </tr>
            </thead>
            <tbody>
              {suggestions.map((item, idx) => (
                <tr key={idx} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="p-4 font-medium">{item.productName}</td>
                  <td className="p-4 text-blue-600 font-bold">{item.quantity} un.</td>
                  <td className="p-4 text-green-600">R$ {item.totalValue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}