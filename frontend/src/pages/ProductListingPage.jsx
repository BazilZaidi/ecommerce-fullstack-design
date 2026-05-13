import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../api/api';

function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  const categories = ['All', 'Electronics', 'Sports', 'Accessories', 'Kitchen', 'Home'];

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await fetchProducts(search, selectedCategory);
        setProducts(res.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [search, selectedCategory]);

  let sorted = [...products];
  if (sortBy === 'price-low') sorted.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high') sorted.sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') sorted.sort((a, b) => b.rating - a.rating);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Products</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search products by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="default">Sort: Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <p className="text-gray-500 text-sm mb-4">{sorted.length} products found</p>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-64"></div>
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-5xl mb-4">😕</p>
          <p className="text-lg">No products found for "{search}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sorted.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductListingPage;