import { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';

type SortField = 'name' | 'price' | 'quantity';
type SortOrder = 'asc' | 'desc';

export default function Catalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [showOutOfStock, setShowOutOfStock] = useState(true);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesStock = showOutOfStock || product.quantity > 0;
      return matchesSearch && matchesCategory && matchesStock;
    })
    .sort((a, b) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      if (sortField === 'name') {
        return order * a.name.localeCompare(b.name);
      }
      return order * (a[sortField] - b[sortField]);
    });

  const handleAddToCart = (product: Product) => {
    // TODO: Implement cart functionality
    console.log('Added to cart:', product);
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Browse Catalogs</h1>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Search products..."
            className="p-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            className="p-2 border rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <button
            onClick={() => toggleSort('name')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
              sortField === 'name' ? 'bg-indigo-50 border-indigo-200' : 'bg-white'
            }`}
          >
            Name
            <ArrowUpDown className="h-4 w-4" />
          </button>
          <button
            onClick={() => toggleSort('price')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
              sortField === 'price' ? 'bg-indigo-50 border-indigo-200' : 'bg-white'
            }`}
          >
            Price
            <ArrowUpDown className="h-4 w-4" />
          </button>
          <button
            onClick={() => toggleSort('quantity')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
              sortField === 'quantity' ? 'bg-indigo-50 border-indigo-200' : 'bg-white'
            }`}
          >
            Stock
            <ArrowUpDown className="h-4 w-4" />
          </button>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOutOfStock}
              onChange={(e) => setShowOutOfStock(e.target.checked)}
              className="rounded border-gray-300"
            />
            Show out of stock items
          </label>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No products found matching your criteria.</p>
      )}
    </div>
  );
}