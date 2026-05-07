import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      
      {/* Product Image */}
      <div className="overflow-hidden h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <span className="text-xs text-blue-500 font-semibold uppercase">{product.category}</span>
        <h3 className="font-semibold text-gray-800 mt-1 text-sm">{product.name}</h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          <span className="text-yellow-400 text-sm">★</span>
          <span className="text-xs text-gray-500">{product.rating} ({product.reviews} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-blue-600 font-bold">${product.price}</span>
          <span className="text-gray-400 line-through text-sm">${product.originalPrice}</span>
        </div>

        {/* Button */}
        <Link to={`/products/${product.id}`}>
          <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition-colors">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;