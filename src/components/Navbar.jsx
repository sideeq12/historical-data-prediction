import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { CiSearch } from "react-icons/ci";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(""); // Clear search after navigation
      setIsOpen(false); // Close mobile menu after search
    }
  };

  return (
    <nav className="text-white shadow-md py-4 w-screen px-4 sm:px-6 lg:px-12 bg-black">
      <div className="container mx-auto">
        {/* Top Bar - Logo and Menu Button */}
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Brand</Link>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
          {/* Mobile Search Bar */}
          {location.pathname !== "/" && (
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex items-center bg-white rounded-full px-3 py-1">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="outline-none text-gray-800 px-2 py-2 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="text-gray-500 hover:text-blue-600 transition-colors">
                  <CiSearch size={20} />
                </button>
              </div>
            </form>
          )}

          {/* Mobile Navigation Links */}
          <ul className="space-y-2">
            <li>
              <Link 
                to="/" 
                className="block py-2 px-4 text-white hover:text-blue-500"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/products" 
                className="block py-2 px-4 text-white hover:text-blue-500"
                onClick={() => setIsOpen(false)}
              >
                All Products
              </Link>
            </li>
          </ul>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-end space-x-6">
          {/* Desktop Search Bar */}
          {location.pathname !== "/" && (
            <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full px-3 py-1">
              <input
                type="text"
                placeholder="Search products..."
                className="outline-none text-gray-800 px-2 py-1 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="text-gray-500 hover:text-blue-600 transition-colors">
                <CiSearch size={20} />
              </button>
            </form>
          )}

          {/* Desktop Navigation Links */}
          <ul className="flex items-center space-x-6">
            <li>
              <Link to="/" className="text-white hover:text-blue-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-white hover:text-blue-500">
                All Products
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
