import type { ReactNode } from 'react';

interface Props {
  title: string;
  icon: React.ElementType;
  children?: ReactNode; 
}

export function PageHeader({ title, icon: Icon, children }: Props) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
        <Icon className="text-blue-600" /> {title}
      </h1>
      {children}
    </div>
  );
}