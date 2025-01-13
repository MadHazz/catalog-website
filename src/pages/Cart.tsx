import { useState, useEffect } from 'react';
import { Trash2, MessageSquare, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { CartItem } from '../types';

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
  }, []);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, selectedQuantity: Math.max(1, Math.min(newQuantity, item.quantity)) };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (itemId: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.selectedQuantity,
    0
  );
  
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleWhatsAppOrder = () => {
    const message = `New Order:\n\n${cartItems
      .map(
        (item) =>
          `${item.name} x${item.selectedQuantity} - $${(
            item.price * item.selectedQuantity
          ).toFixed(2)}`
      )
      .join('\n')}\n\nSubtotal: $${subtotal.toFixed(2)}\nTax (10%): $${tax.toFixed(2)}\nTotal: $${total.toFixed(2)}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/1234567890?text=${encodedMessage}`);
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any items yet.</p>
          <button
            onClick={() => navigate('/catalog')}
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-4 border-b last:border-b-0"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <input
                    type="number"
                    min="1"
                    max={item.quantity}
                    value={item.selectedQuantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="w-16 p-2 border rounded-md"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 font-semibold text-gray-900">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleWhatsAppOrder}
              className="w-full mt-6 bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              Place Order via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}