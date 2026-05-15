// function Footer() {
//   return (
//     <footer className="bg-gray-800 text-white mt-10">
//       <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div>
//           <h3 className="font-bold text-lg mb-2">ShopEase</h3>
//           <p className="text-gray-400 text-sm">Your one-stop shop for everything.</p>
//         </div>
//         <div>
//           <h3 className="font-bold mb-2">Quick Links</h3>
//           <ul className="text-gray-400 text-sm space-y-1">
//             <li>Home</li>
//             <li>Products</li>
//             <li>Cart</li>
//           </ul>
//         </div>
//         <div>
//           <h3 className="font-bold mb-2">Contact</h3>
//           <p className="text-gray-400 text-sm">support@shopease.com</p>
//         </div>
//       </div>
//       <div className="text-center text-gray-500 text-xs py-3 border-t border-gray-700">
//         © 2026 ShopEase. All rights reserved.
//       </div>
//     </footer>
//   );
// }

// export default Footer;
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-6">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          <div>
            <h3 className="text-xl font-bold text-blue-400 mb-3">🛍️ ShopEase</h3>
            <p className="text-gray-400 text-sm">Your one-stop marketplace for everything you need.</p>
            <div className="flex gap-3 mt-4">
              <span className="bg-gray-700 p-2 rounded-lg text-lg cursor-pointer hover:bg-blue-600 transition">📘</span>
              <span className="bg-gray-700 p-2 rounded-lg text-lg cursor-pointer hover:bg-blue-600 transition">🐦</span>
              <span className="bg-gray-700 p-2 rounded-lg text-lg cursor-pointer hover:bg-blue-600 transition">📸</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-sm uppercase text-gray-300">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/products" className="hover:text-white transition">Products</Link></li>
              <li><Link to="/cart" className="hover:text-white transition">Cart</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-sm uppercase text-gray-300">Categories</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              {['Electronics', 'Sports', 'Accessories', 'Kitchen', 'Home'].map(cat => (
                <li key={cat}>
                  <Link to={`/products?category=${cat}`} className="hover:text-white transition">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-3 text-sm uppercase text-gray-300">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>📧 support@shopease.com</li>
              <li>📞 +1 (555) 123-4567</li>
              <li>🕐 Mon-Fri 9AM-6PM</li>
            </ul>
            <div className="mt-4 flex flex-col gap-2">
              <div className="bg-gray-700 rounded-lg px-3 py-2 text-xs text-center">🔒 Secure Payment</div>
              <div className="bg-gray-700 rounded-lg px-3 py-2 text-xs text-center">🚚 Free Delivery $50+</div>
            </div>
          </div>

        </div>
      </div>
      <div className="border-t border-gray-700 py-4 text-center text-gray-500 text-xs">
        © 2026 ShopEase. All rights reserved. Built with ❤️
      </div>
    </footer>
  );
}

export default Footer;