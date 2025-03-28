import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate("/products"); // Navigates to the allproduct page
  };

  return (
    <div className="w-full max-w-2xl flex items-center border border-gray-300 rounded-2xl overflow-hidden">
      <input 
        type="text" 
        placeholder="Search..." 
        className="flex-grow px-4 py-3 text-lg outline-none"
      />
      <button 
        onClick={handleSearch} 
        className="bg-blue-500 px-6 py-3 text-white text-lg rounded-r-2xl"
      >
        Search
      </button>
    </div>
  );
}
