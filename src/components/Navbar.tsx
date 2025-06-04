import { ShoppingCart, Store, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Store className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">ShopHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
            <Link to="/catalog" className="text-gray-600 hover:text-indigo-600">Browse Catalogs</Link>
            <Link to="/locations" className="text-gray-600 hover:text-indigo-600">Locations</Link>
            <Link to="/contact" className="text-gray-600 hover:text-indigo-600">Contact Us</Link>
            <Link to="/admin/login" className="text-gray-600 hover:text-indigo-600">Admin</Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-indigo-600" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-600 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/catalog"
              className="block px-3 py-2 text-gray-600 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Browse Catalogs
            </Link>
            <Link
              to="/locations"
              className="block px-3 py-2 text-gray-600 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Locations
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-gray-600 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
            <Link
              to="/admin/login"
              className="block px-3 py-2 text-gray-600 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-2 text-gray-600 hover:text-indigo-600"
              onClick={() => setIsOpen(false)}
            >
              Cart
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}