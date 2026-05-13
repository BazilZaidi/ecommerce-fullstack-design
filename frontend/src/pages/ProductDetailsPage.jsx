import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById, fetchProducts } from '../api/api';

function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const res = await fetchProductById(id);
        setProduct(res.data);
        const allRes = await fetchProducts('', res.data.category);
        setRelated(allRes.data.filter(p => p._id !== id).slice(0, 4));
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item._id === product._id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1 bg-gray-200 animate-pulse rounded-2xl h-96"></div>
          <div className="flex-1 space-y-4">
            <div className="bg-gray-200 animate-pulse h-8 rounded w-3/4"></div>
            <div className="bg-gray-200 animate-pulse h-6 rounded w-1/2"></div>
            <div className="bg-gray-200 animate-pulse h-24 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700">Product not found!</h2>
        <Link to="/products" className="text-blue-600 mt-4 inline-block hover:underline">← Back to Products</Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

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

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1">
          <img src={product.image} alt={product.name} className="w-full rounded-2xl shadow-md object-cover max-h-96" />
        </div>

        <div className="flex-1">
          <span className="text-xs font-semibold text-blue-500 uppercase">{product.category}</span>
          <h1 className="text-3xl font-bold text-gray-800 mt-2">{product.name}</h1>

          <div className="flex items-center gap-2 mt-3">
            <span className="text-yellow-400">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
            <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <span className="text-3xl font-bold text-blue-600">${product.price}</span>
            {product.originalPrice && <span className="text-gray-400 line-through text-lg">${product.originalPrice}</span>}
            {discount > 0 && <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">{discount}% OFF</span>}
          </div>

          <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>

          <p className={`mt-3 text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
            {product.stock > 0 ? `✅ In Stock (${product.stock} available)` : '❌ Out of Stock'}
          </p>

          <div className="flex items-center gap-4 mt-6">
            <span className="font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 font-bold">−</button>
              <span className="px-4 py-2">{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 font-bold">+</button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 font-semibold py-3 rounded-xl transition ${addedToCart ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
            >
              {addedToCart ? '✅ Added to Cart!' : '🛒 Add to Cart'}
            </button>
            <button className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-xl transition">
              ♡ Wishlist
            </button>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl text-sm text-gray-600 space-y-2">
            <p>✅ Free shipping on orders over $50</p>
            <p>🔄 30-day easy returns</p>
            <p>🔒 Secure checkout</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map(p => (
              <Link to={`/products/${p._id}`} key={p._id} className="group">
                <img src={p.image} alt={p.name} className="rounded-xl w-full h-32 object-cover group-hover:opacity-80 transition" />
                <p className="text-sm font-medium mt-2 text-gray-700">{p.name}</p>
                <p className="text-blue-600 font-bold text-sm">${p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailsPage;