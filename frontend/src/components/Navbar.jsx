import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">ShopEase</Link>

        {/* Nav Links */}
        <div className="hidden md:flex gap-6 text-gray-600 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          {user?.isAdmin && (
            <Link to="/admin" className="hover:text-blue-600 text-purple-600 font-bold">
              ⚙️ Admin
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Cart */}
          <Link to="/cart" className="relative">
            <span className="text-2xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 hidden md:block">Hi, {user.name}!</span>
              <button
                onClick={handleLogout}
                className="text-sm bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className="text-sm bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition">
                Login
              </button>
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;