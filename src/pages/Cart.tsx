import { useState } from 'react';
import { Trash2, MessageSquare } from 'lucide-react';
import type { CartItem } from '../types';

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId
          ? { ...item, selectedQuantity: Math.max(1, newQuantity) }
          : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.selectedQuantity,
    0
  );

  const handleWhatsAppOrder = () => {
    const message = `New Order:\n\n${cartItems
      .map(
        (item) =>
          `${item.name} x${item.selectedQuantity} - $${(
            item.price * item.selectedQuantity
          ).toFixed(2)}`
      )
      .join('\n')}\n\nTotal: $${total.toFixed(2)}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/1234567890?text=${encodedMessage}`);
  };

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <>
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
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="1"
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

            <div className="mt-6 text-right">
              <p className="text-xl font-bold">
                Total: ${total.toFixed(2)}
              </p>
            </div>
          </div>

          <button
            onClick={handleWhatsAppOrder}
            className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
          >
            <MessageSquare className="h-5 w-5" />
            Order via WhatsApp
          </button>
        </>
      )}
    </div>
  );
}