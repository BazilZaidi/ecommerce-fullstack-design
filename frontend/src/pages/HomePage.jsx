import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

function HomePage() {
  return (
    <div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Shop the Best <br /> Products Online
            </h1>
            <p className="mt-4 text-blue-100 text-lg">
              Discover thousands of products at unbeatable prices.
            </p>
            <Link to="/products">
              <button className="mt-6 bg-white text-blue-600 font-bold px-6 py-3 rounded-lg hover:bg-blue-50 transition">
                Shop Now →
              </button>
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500"
              alt="Shopping"
              className="rounded-2xl shadow-xl w-full max-w-sm"
            />
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="bg-gray-50 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap gap-3 justify-center">
          {['All', 'Electronics', 'Sports', 'Accessories', 'Kitchen'].map(cat => (
            <button
              key={cat}
              className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
          <Link to="/products" className="text-blue-600 hover:underline text-sm">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-yellow-400 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Special Offer!</h3>
            <p className="text-gray-700 mt-1">Get up to 50% off on selected items today only.</p>
          </div>
          <Link to="/products">
            <button className="mt-4 md:mt-0 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition">
              Grab the Deal
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
}

export default HomePage;