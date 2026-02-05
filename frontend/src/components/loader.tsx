import { Loader2 } from 'lucide-react';

export function Loader() {
  return (
    <div className="p-8 flex justify-center text-blue-600">
      <Loader2 className="animate-spin" size={32} />
    </div>
  );
}