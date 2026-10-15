import { Outlet, Link } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-base font-bold text-blue-600">MiniShop</p>
              <p className="text-xs text-gray-500 mt-1">
                Multi-Page Web Application built with React Router v6 & Tailwind CSS
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/products" className="hover:text-blue-600 transition-colors">Products</Link>
              <Link to="/admin/products" className="hover:text-blue-600 transition-colors">Manage Products</Link>
              <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
              <Link to="/profile" className="hover:text-blue-600 transition-colors">Profile</Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
            &copy; 2026 MiniShop. Web Programming Lab 10.
          </div>
        </div>
      </footer>
    </div>
  )
}
