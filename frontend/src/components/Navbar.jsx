import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All category');
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const categories = [
    'All category', 'Electronics', 'Sports',
    'Accessories', 'Kitchen', 'Home', 'Clothes'
  ];

  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    };
    updateCount();
    window.addEventListener('storage', updateCount);
    return () => window.removeEventListener('storage', updateCount);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/products?search=${search}&category=${category === 'All category' ? '' : category}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="w-full sticky top-0 z-50 shadow-md">

      {/* Top Bar */}
      <div className="bg-blue-700 text-white text-xs py-1 px-4 flex justify-between items-center">
        <span>🚀 Free shipping on orders over $50!</span>
        <div className="flex gap-4">
          <span>English</span>
          <span>USD</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600 whitespace-nowrap">
            🛍️ ShopEase
          </Link>

          {/* Search Bar */}
          <div className="flex flex-1 max-w-2xl">
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="border border-gray-300 border-r-0 rounded-l-lg px-3 py-2 text-sm bg-gray-50 text-gray-600 focus:outline-none"
            >
              {categories.map(cat => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch(e)}
              placeholder="Search products..."
              className="flex-1 border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-r-lg text-sm font-semibold transition"
            >
              Search
            </button>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4 ml-auto">

            {/* User */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="text-right hidden md:block">
                  <p className="text-xs text-gray-500">Hi, {user.name}</p>
                  <button onClick={handleLogout} className="text-xs text-red-500 hover:underline">Logout</button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex flex-col text-xs text-gray-600">
                <Link to="/login" className="hover:text-blue-600 font-medium">Login</Link>
                <Link to="/register" className="hover:text-blue-600">Join now</Link>
              </div>
            )}

            {/* Orders */}
            <Link to="/cart" className="hidden md:flex flex-col items-center text-xs text-gray-600 hover:text-blue-600">
              <span className="text-xl">📦</span>
              <span>Orders</span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative flex flex-col items-center text-xs text-gray-600 hover:text-blue-600">
              <span className="text-xl">🛒</span>
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Admin */}
            {user?.isAdmin && (
              <Link to="/admin" className="hidden md:flex flex-col items-center text-xs text-purple-600 hover:text-purple-800">
                <span className="text-xl">⚙️</span>
                <span>Admin</span>
              </Link>
            )}

          </div>
        </div>
      </div>

      {/* Category Nav Bar */}
      <div className="bg-blue-600 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 py-2 overflow-x-auto">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-1 font-semibold whitespace-nowrap hover:text-blue-200"
          >
            ☰ All category
          </button>
          {['Hot offers', 'Electronics', 'Sports', 'Accessories', 'Kitchen', 'Home'].map(item => (
            <Link
              key={item}
              to={`/products?category=${item === 'Hot offers' ? '' : item}`}
              className="whitespace-nowrap hover:text-blue-200 transition"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute bg-white text-gray-700 shadow-xl rounded-b-xl w-56 z-50 py-2">
            {['Automobiles', 'Clothes and wear', 'Home interiors', 'Computer and tech',
              'Sports and outdoors', 'Animal and pets', 'Machinery tools', 'Electronics',
              'Accessories', 'Kitchen', 'More category'].map(cat => (
              <Link
                key={cat}
                to={`/products?category=${cat}`}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 text-sm transition"
              >
                {cat}
              </Link>
            ))}
          </div>
        )}
      </div>

    </header>
  );
}

export default Navbar;