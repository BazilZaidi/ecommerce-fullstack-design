import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(stored);
  }, []);

  const updateQuantity = (id, newQty) => {
    const updated = cartItems
      .map(item => item._id === id ? { ...item, quantity: newQty } : item)
      .filter(item => item.quantity > 0);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item._id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-2xl font-bold text-gray-700">Your cart is empty</h2>
        <Link to="/products">
          <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Start Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Your Cart ({cartItems.length} items)
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {cartItems.map(item => (
              <div key={item._id} className="bg-white rounded-xl shadow-sm p-4 flex gap-4 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-blue-600 font-bold">${item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >−</button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                    >+</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-400 hover:text-red-600 text-sm mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <Link to="/products" className="text-blue-600 hover:underline text-sm inline-block mt-2">
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? '🎉 Free' : `$${shipping}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-400">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="border-t pt-3 flex justify-between font-bold text-gray-800 text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
              >
                Proceed to Checkout →
              </button>

              <div className="mt-4 text-center text-xs text-gray-400">
                🔒 Secure & encrypted checkout
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CartPage;