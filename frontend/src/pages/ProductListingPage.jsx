import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../api/api';

function ProductListingPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(queryParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(queryParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('default');

  const categories = ['All', 'Electronics', 'Sports', 'Accessories', 'Kitchen', 'Home', 'Clothes'];

  // This runs every time the URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlSearch = params.get('search') || '';
    const urlCategory = params.get('category') || 'All';
    setSearch(urlSearch);
    setSelectedCategory(urlCategory);
  }, [location.search]);

  // This runs every time search or category changes
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const categoryToSend = selectedCategory === 'All' ? '' : selectedCategory;
        const res = await fetchProducts(search, categoryToSend);
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
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-4">

          {/* Sidebar */}
          <div className="hidden lg:block w-52 bg-white rounded-xl shadow-sm p-4 h-fit sticky top-32">
            <h3 className="font-bold text-gray-700 mb-3 text-sm">Category</h3>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1">

            {/* Search + Sort */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <input
                type="text"
                placeholder="🔍 Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none"
              >
                <option value="default">Sort: Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Mobile Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4 lg:hidden">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap border transition ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-300 hover:border-blue-400 bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <p className="text-gray-500 text-sm mb-4">
              Showing <span className="font-semibold text-gray-700">{sorted.length}</span> products
              {selectedCategory !== 'All' && (
                <span className="ml-1">in <span className="text-blue-600 font-semibold">{selectedCategory}</span></span>
              )}
            </p>

            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-64"></div>
                ))}
              </div>
            ) : sorted.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl">
                <p className="text-5xl mb-4">😕</p>
                <p className="text-lg text-gray-500">No products found</p>
                <button
                  onClick={() => { setSearch(''); setSelectedCategory('All'); }}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {sorted.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListingPage;