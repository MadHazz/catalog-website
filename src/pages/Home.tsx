import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import type { Product } from '../types';

export default function Home() {
  const handleAddToCart = (product: Product) => {
    // TODO: Implement cart functionality
    console.log('Added to cart:', product);
  };

  // Duplicate products to have at least 5 items for demonstration
  const extendedProducts = [...products, ...products];
  const popularProducts = extendedProducts.slice(0, 5);
  const newProducts = [...extendedProducts].reverse().slice(0, 5);

  return (
    <div className="pt-16">
      <Carousel />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular Products</h2>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6" style={{ minWidth: 'min-content' }}>
              {popularProducts.map((product) => (
                <div key={product.id} className="w-[300px] flex-shrink-0">
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">New Products</h2>
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-6" style={{ minWidth: 'min-content' }}>
              {newProducts.map((product) => (
                <div key={product.id} className="w-[300px] flex-shrink-0">
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}