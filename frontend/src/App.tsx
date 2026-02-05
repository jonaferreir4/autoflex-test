import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart } from 'lucide-react';
import { Dashboard } from './pages/dashboard';
import { RawMaterials } from './pages/raw-materials';
import { Products } from './pages/products';

function NavLink({ to, icon: Icon, children }: { to: string; icon: any; children: any }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
        isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{children}</span>
    </Link>
  );
}

function Layout() {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      <aside className="w-64 bg-white border-r border-gray-200 p-4 hidden md:flex flex-col">
        <div className="mb-8 p-2">
          <h1 className="text-2xl font-bold text-blue-600">Autoflex</h1>
          <p className="text-xs text-gray-500">Inventory System</p>
        </div>
        <nav className="space-y-2">
          <NavLink to="/" icon={LayoutDashboard}>Dashboard</NavLink>
          <NavLink to="/products" icon={ShoppingCart}>Produtos</NavLink>
          <NavLink to="/materials" icon={Package}>Matérias-Primas</NavLink>
        </nav>
      </aside>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-3 z-10">
          <Link to="/" className="p-2"><LayoutDashboard /></Link>
          <Link to="/products" className="p-2"><ShoppingCart /></Link>
          <Link to="/materials" className="p-2"><Package /></Link>
      </div>

      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/materials" element={<RawMaterials />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}