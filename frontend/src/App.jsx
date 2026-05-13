// // function App() {
// //   return (
// //     <div>
// //       <h1 className="text-3xl font-bold text-center mt-10">Ecommerce App</h1>
// //     </div>
// //   );
// // }

// // export default App;
// // import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // import HomePage from './pages/HomePage';
// // import ProductListingPage from './pages/ProductListingPage';
// // import ProductDetailsPage from './pages/ProductDetailsPage';
// // import CartPage from './pages/CartPage';

// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/" element={<HomePage />} />
// //         <Route path="/products" element={<ProductListingPage />} />
// //         <Route path="/products/:id" element={<ProductDetailsPage />} />
// //         <Route path="/cart" element={<CartPage />} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import HomePage from './pages/HomePage';
// import ProductListingPage from './pages/ProductListingPage';
// import ProductDetailsPage from './pages/ProductDetailsPage';
// import CartPage from './pages/CartPage';

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/products" element={<ProductListingPage />} />
//         <Route path="/products/:id" element={<ProductDetailsPage />} />
//         <Route path="/cart" element={<CartPage />} />
//       </Routes>
//       <Footer />
//     </BrowserRouter>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;