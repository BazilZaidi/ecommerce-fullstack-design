function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-bold text-lg mb-2">ShopEase</h3>
          <p className="text-gray-400 text-sm">Your one-stop shop for everything.</p>
        </div>
        <div>
          <h3 className="font-bold mb-2">Quick Links</h3>
          <ul className="text-gray-400 text-sm space-y-1">
            <li>Home</li>
            <li>Products</li>
            <li>Cart</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Contact</h3>
          <p className="text-gray-400 text-sm">support@shopease.com</p>
        </div>
      </div>
      <div className="text-center text-gray-500 text-xs py-3 border-t border-gray-700">
        © 2026 ShopEase. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;