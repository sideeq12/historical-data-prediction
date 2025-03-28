import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/homepage";
import Products from "./pages/Allproduct";
import ProductPage from "./pages/product";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";

export default function App() {
  return (
    <Router>
      <Navbar hideSearch={false} />  {/* Navbar remains visible on all pages */}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
