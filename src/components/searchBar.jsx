import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl flex items-center border border-gray-300 rounded-2xl overflow-hidden">
      <input 
        type="text" 
        placeholder="Search.. products here..." 
        className="flex-grow px-4 py-3 text-lg outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button 
        type="submit"
        className="bg-blue-500 px-6 py-3 text-white text-lg rounded-r-2xl hover:bg-blue-600 transition-colors"
      >
        Search
      </button>
    </form>
  );
}
