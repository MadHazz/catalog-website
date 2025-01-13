import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Package, Info, MapPin, Minus, Plus } from 'lucide-react';
import { products } from '../data/products';
import { useState } from 'react';
import type { CartItem } from '../types';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="pt-20 px-4 max-w-7xl mx-auto">
        <p className="text-center text-gray-500">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ...product,
      selectedQuantity: quantity
    };
    
    // Get existing cart items from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex((item: CartItem) => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      existingCart[existingItemIndex].selectedQuantity += quantity;
    } else {
      // Add new item if it doesn't exist
      existingCart.push(cartItem);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Navigate to cart page
    navigate('/cart');
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => Math.min(product.quantity, prev + 1));
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-lg shadow-lg"
          />
        </div>

        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-semibold text-indigo-600">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm">
              <Package className="h-4 w-4" />
              <span>Weight: {product.weight}</span>
            </div>
            {product.origin && (
              <div className="flex items-center gap-2 text-sm mt-2">
                <MapPin className="h-4 w-4" />
                <span>Origin: {product.origin}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="font-semibold mb-2 flex items-center gap-2">
              <Info className="h-4 w-4" />
              Features
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {product.ingredients && (
            <div className="mb-6">
              <h2 className="font-semibold mb-2">Ingredients</h2>
              <p className="text-gray-600">{product.ingredients.join(', ')}</p>
            </div>
          )}

          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-2">
              Status:{' '}
              <span
                className={`font-semibold ${
                  product.quantity > 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {product.quantity > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-gray-700">Quantity:</label>
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={decreaseQuantity}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 border-x">{quantity}</span>
                    <button
                      onClick={increaseQuantity}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="text-lg font-semibold">
                  Total: ${totalPrice.toFixed(2)}
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}