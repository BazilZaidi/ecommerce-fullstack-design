import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { createPaymentIntent } from '../api/api';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Card styling
const CARD_STYLE = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': { color: '#aab7c4' },
    },
    invalid: { color: '#fa755a', iconColor: '#fa755a' },
  },
};

function CheckoutForm({ total, cartItems }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Create payment intent on backend
      const { data } = await createPaymentIntent(total);

      // Confirm payment with Stripe
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name, email },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        // Clear cart
        localStorage.removeItem('cart');
        setSuccess(true);
        setTimeout(() => navigate('/'), 3000);
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
          <p className="text-gray-500 mb-4">Thank you for your order! You'll receive a confirmation email shortly.</p>
          <div className="bg-green-50 rounded-xl p-4 text-sm text-green-700">
            ✅ Order confirmed<br />
            📦 Estimated delivery: 3-5 business days
          </div>
          <p className="text-xs text-gray-400 mt-4">Redirecting to home in 3 seconds...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left — Form */}
          <div className="flex-1 space-y-4">

            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-bold text-gray-800 mb-4">📋 Contact Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Delivery Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="123 Main St, City, Country"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-bold text-gray-800 mb-4">💳 Payment Details</h2>

              {/* Test card hint */}
              <div className="bg-blue-50 rounded-xl p-3 mb-4 text-xs text-blue-700">
                🧪 Test Mode — Use card: <span className="font-bold">4242 4242 4242 4242</span> | Expiry: any future date | CVV: any 3 digits
              </div>

              <div className="border border-gray-300 rounded-xl p-4">
                <CardElement options={CARD_STYLE} />
              </div>

              {error && (
                <div className="mt-3 bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg">
                  ❌ {error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={!stripe || loading}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
              >
                {loading ? 'Processing...' : `💳 Pay $${total.toFixed(2)}`}
              </button>

              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
                <span>🔒 Secured by Stripe</span>
                <span>|</span>
                <span>256-bit SSL encryption</span>
              </div>
            </div>
          </div>

          {/* Right — Order Summary */}
          <div className="lg:w-80">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="font-bold text-gray-800 mb-4">🛍️ Order Summary</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item._id} className="flex gap-3 items-center">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700 line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-blue-600">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{total > 50 ? '🎉 Free' : '$5.99'}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-800 text-base border-t pt-2">
                  <span>Total</span>
                  <span>${(total > 50 ? total : total + 5.99).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    if (stored.length === 0) navigate('/cart');
    setCartItems(stored);
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal > 50 ? subtotal : subtotal + 5.99;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm total={total} cartItems={cartItems} />
    </Elements>
  );
}

export default CheckoutPage;