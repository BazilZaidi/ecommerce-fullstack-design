import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../api/api';

const emptyForm = {
  name: '', price: '', originalPrice: '', image: '',
  description: '', category: '', stock: '', rating: '', reviews: '',
};

function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Redirect if not admin
  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await fetchProducts();
    setProducts(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, form);
        setMessage('✅ Product updated!');
      } else {
        await createProduct(form);
        setMessage('✅ Product created!');
      }
      setForm(emptyForm);
      setEditingProduct(null);
      setShowForm(false);
      loadProducts();
    } catch (err) {
      setMessage('❌ Error: ' + (err.response?.data?.message || 'Something went wrong'));
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || '',
      image: product.image,
      description: product.description,
      category: product.category,
      stock: product.stock,
      rating: product.rating,
      reviews: product.reviews,
    });
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setMessage('✅ Product deleted!');
        loadProducts();
      } catch (err) {
        setMessage('❌ Failed to delete product');
      }
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingProduct(null);
    setShowForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome, {user?.name} 👋</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setEditingProduct(null); setForm(emptyForm); }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-xl transition"
        >
          {showForm ? '✕ Cancel' : '+ Add Product'}
        </button>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium ${message.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}

      {/* Add/Edit Product Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            {editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Product Name', name: 'name', placeholder: 'e.g. Wireless Headphones' },
              { label: 'Price ($)', name: 'price', placeholder: 'e.g. 59.99' },
              { label: 'Original Price ($)', name: 'originalPrice', placeholder: 'e.g. 89.99' },
              { label: 'Stock', name: 'stock', placeholder: 'e.g. 50' },
              { label: 'Rating (0-5)', name: 'rating', placeholder: 'e.g. 4.5' },
              { label: 'Reviews Count', name: 'reviews', placeholder: 'e.g. 128' },
            ].map(field => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
          </div>

          {/* Category Select */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select category</option>
              {['Electronics', 'Sports', 'Accessories', 'Kitchen', 'Home'].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Image URL */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {form.image && (
              <img src={form.image} alt="Preview" className="mt-2 h-24 w-24 object-cover rounded-lg" />
            )}
          </div>

          {/* Description */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Product description..."
              rows={3}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
            </button>
            <button
              onClick={handleCancel}
              className="border border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold px-6 py-2 rounded-xl transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800">All Products ({products.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(product => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">{product.name}</td>
                  <td className="px-4 py-3">
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">{product.category}</span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-blue-600">${product.price}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold ${product.stock > 10 ? 'text-green-600' : 'text-red-500'}`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 text-xs font-semibold px-3 py-1 rounded-lg transition"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-red-100 text-red-600 hover:bg-red-200 text-xs font-semibold px-3 py-1 rounded-lg transition"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;