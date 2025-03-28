import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { CiSearch } from "react-icons/ci";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation(); // Get current URL

  return (
    <nav className="text-white shadow-md py-6 w-screen px-12 bg-green-600">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Brand</h1>

  <div className="flex">
         {/* Search Bar - Hidden on Home Page ("/") */}
         {location.pathname !== "/" && (
          <div className="hidden md:flex items-center bg-white rounded-full px-3 py-1">
            <input
              type="text"
              placeholder="Search products..."
              className="outline-none text-gray-800 px-2 py-1 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <CiSearch  color="blue" size={20}/>
            
          </div>
        )}

        {/* Menu Button for Mobile */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <ul
          className={`md:flex md:items-center absolute md:static top-16 left-0 w-full text-white md:w-auto md:space-x-6 p-4 md:p-0 shadow-md md:shadow-none transition-all ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li>
            <Link to="/" className="block py-2 px-4 text-white hover:text-blue-500">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="block py-2 px-4 text-white hover:text-blue-500">
              All Products
            </Link>
          </li>
        </ul></div> 
      </div>
    </nav>
  );
}
