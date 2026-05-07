import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../data/products';

function ProductDetailsPage() {
  const { id } = useParams(); // Gets the :id from the URL
  const product = products.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700">Product not found!</h2>
        <Link to="/products" className="text-blue-600 mt-4 inline-block hover:underline">
          ← Back to Products
        </Link>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-blue-600">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{product.name}</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Product Image */}
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-2xl shadow-md object-cover max-h-96"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <span className="text-xs font-semibold text-blue-500 uppercase">{product.category}</span>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex text-yellow-400">
              {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-3xl font-bold text-blue-600">${product.price}</span>
            <span className="text-gray-400 line-through text-lg">${product.originalPrice}</span>
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
              {discount}% OFF
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-6">
            <span className="font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-lg font-bold"
              >
                −
              </button>
              <span className="px-4 py-2 text-center min-w-[40px]">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-lg font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition">
              🛒 Add to Cart
            </button>
            <button className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-xl transition">
              ♡ Wishlist
            </button>
          </div>

          {/* Shipping Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl text-sm text-gray-600 space-y-2">
            <p>✅ Free shipping on orders over $50</p>
            <p>🔄 30-day easy returns</p>
            <p>🔒 Secure checkout</p>
          </div>

        </div>
      </div>

      {/* Related Products */}
      <div className="mt-14">
        <h2 className="text-xl font-bold text-gray-800 mb-4">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products
            .filter(p => p.id !== product.id)
            .slice(0, 4)
            .map(p => (
              <Link to={`/products/${p.id}`} key={p.id} className="group">
                <img
                  src={p.image}
                  alt={p.name}
                  className="rounded-xl w-full h-32 object-cover group-hover:opacity-80 transition"
                />
                <p className="text-sm font-medium mt-2 text-gray-700">{p.name}</p>
                <p className="text-blue-600 font-bold text-sm">${p.price}</p>
              </Link>
            ))
          }
        </div>
      </div>

    </div>
  );
}

export default ProductDetailsPage;