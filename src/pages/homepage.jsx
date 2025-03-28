import Navbar from "../components/Navbar";
import SearchBar from "../components/searchBar";

export default function Home() {
  return (
    <div>
      {/* Hide navbar search bar */}
    

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">CheckPrice</h1>

        {/* Separate Search Bar Component */}
        <SearchBar />
      </div>
    </div>
  );
}
