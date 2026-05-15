import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group flex flex-col">

      <div className="relative overflow-hidden h-40">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            -{discount}%
          </span>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1">
        <p className="text-xs text-blue-500 font-medium">{product.category}</p>
        <h3 className="text-sm font-medium text-gray-700 mt-1 line-clamp-2 flex-1">{product.name}</h3>

        <div className="flex items-center gap-1 mt-1">
          <span className="text-yellow-400 text-xs">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-blue-600 font-bold text-sm">${product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-xs">${product.originalPrice}</span>
          )}
        </div>

        <Link to={`/products/${product._id}`}>
          <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold py-2 rounded-lg transition">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;