import { Eye, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-indigo-600">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500 mt-1">
          {product.quantity > 0 ? 'In stock' : 'Out of stock'}
        </p>
        <Link
          to={`/product/${product.id}`}
          className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2"
        >
          <Eye className="h-5 w-5" />
          View Details
        </Link>
        <button
          onClick={() => onAddToCart?.(product)}
          className="mt-2 w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 flex items-center justify-center gap-2"
        >
          <ShoppingCart className="h-5 w-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}