import { useParams } from 'react-router-dom';
import { ShoppingCart, Package, Info, MapPin } from 'lucide-react';
import { products } from '../data/products';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="pt-20 px-4 max-w-7xl mx-auto">
        <p className="text-center text-gray-500">Product not found</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    console.log('Added to cart:', product);
  };

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-lg"
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

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
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
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}