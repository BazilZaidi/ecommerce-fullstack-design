import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../api/api';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetchProducts();
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const categories = [
    { name: 'Automobiles', icon: '🚗' },
    { name: 'Clothes', icon: '👗' },
    { name: 'Home', icon: '🏠' },
    { name: 'Electronics', icon: '💻' },
    { name: 'Sports', icon: '⚽' },
    { name: 'Kitchen', icon: '🍳' },
    { name: 'Accessories', icon: '👜' },
    { name: 'Tools', icon: '🔧' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-4">

        {/* Main Layout — Sidebar + Hero */}
        <div className="flex gap-4">

          {/* Left Sidebar — Categories */}
          <div className="hidden lg:block w-52 bg-white rounded-xl shadow-sm p-3 h-fit">
            <h3 className="font-bold text-gray-700 mb-2 text-sm">All Categories</h3>
            {categories.map(cat => (
              <Link
                key={cat.name}
                to={`/products?category=${cat.name}`}
                className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 text-sm text-gray-600 transition"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
            <Link to="/products" className="flex items-center gap-2 px-2 py-2 text-blue-600 text-sm font-medium">
              More category →
            </Link>
          </div>

          {/* Hero Banner */}
          <div className="flex-1 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 rounded-xl overflow-hidden relative min-h-64">
            <div className="p-8 text-white max-w-sm">
              <p className="text-blue-100 text-sm mb-1">Latest trending</p>
              <h1 className="text-3xl font-bold leading-tight mb-4">
                Electronic<br />items
              </h1>
              <Link to="/products?category=Electronics">
                <button className="bg-white text-blue-600 font-bold px-5 py-2 rounded-lg hover:bg-blue-50 transition text-sm">
                  Learn more →
                </button>
              </Link>
            </div>
            <div className="absolute right-4 bottom-0 flex gap-2 items-end">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200"
                alt="headphones"
                className="h-44 object-contain drop-shadow-xl"
              />
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150"
                alt="watch"
                className="h-32 object-contain drop-shadow-xl mb-4"
              />
            </div>
          </div>

          {/* Right Side Banners */}
          <div className="hidden md:flex flex-col gap-3 w-44">
            <div className="bg-orange-400 rounded-xl p-4 text-white flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium">Get US $10 off</p>
                <p className="text-xs text-orange-100">with a new supplier</p>
              </div>
              <button className="bg-white text-orange-500 text-xs font-bold px-3 py-1 rounded-lg mt-2">
                Get started
              </button>
            </div>
            <div className="bg-teal-500 rounded-xl p-4 text-white flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium">Send quotes with</p>
                <p className="text-xs text-teal-100">supplier preferences</p>
              </div>
              <button className="bg-white text-teal-600 text-xs font-bold px-3 py-1 rounded-lg mt-2">
                Start now
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {[
            { icon: '🔒', title: 'Secure payment', desc: 'Have you ever finally just' },
            { icon: '📦', title: 'Free delivery', desc: 'Have you ever finally just' },
            { icon: '🎁', title: 'Gift boxes', desc: 'Have you ever finally just' },
            { icon: '🎧', title: 'Customer support', desc: 'Have you ever finally just' },
          ].map(badge => (
            <div key={badge.title} className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <span className="text-2xl">{badge.icon}</span>
              <div>
                <p className="text-sm font-semibold text-gray-800">{badge.title}</p>
                <p className="text-xs text-gray-400">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Hot Offers */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">🔥 Hot Offers</h2>
            <Link to="/products" className="text-blue-600 text-sm hover:underline">View all →</Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-48"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {products.slice(0, 5).map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Category Sections */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Electronics */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-800">💻 Electronics</h2>
              <Link to="/products?category=Electronics" className="text-blue-600 text-xs hover:underline">View all</Link>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {products.filter(p => p.category === 'Electronics').slice(0, 3).map(p => (
                <Link to={`/products/${p._id}`} key={p._id} className="text-center group">
                  <img src={p.image} alt={p.name} className="w-full h-20 object-cover rounded-lg group-hover:opacity-80 transition" />
                  <p className="text-xs text-gray-600 mt-1 truncate">{p.name}</p>
                  <p className="text-xs font-bold text-blue-600">${p.price}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Sports */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-800">⚽ Sports</h2>
              <Link to="/products?category=Sports" className="text-blue-600 text-xs hover:underline">View all</Link>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {products.filter(p => p.category === 'Sports').slice(0, 3).map(p => (
                <Link to={`/products/${p._id}`} key={p._id} className="text-center group">
                  <img src={p.image} alt={p.name} className="w-full h-20 object-cover rounded-lg group-hover:opacity-80 transition" />
                  <p className="text-xs text-gray-600 mt-1 truncate">{p.name}</p>
                  <p className="text-xs font-bold text-blue-600">${p.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* All Featured Products */}
        <div className="mt-4 bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">⭐ Featured Products</h2>
            <Link to="/products" className="text-blue-600 text-sm hover:underline">View all →</Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-xl h-64"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default HomePage;