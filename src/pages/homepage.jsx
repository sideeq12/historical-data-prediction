import Navbar from "../components/Navbar";
import SearchBar from "../components/searchBar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Main Content Centered */}
      <div className="flex flex-1 flex-col items-center justify-center py-16 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-blue-700 drop-shadow-lg mb-4 animate-fade-in">
            CheckPrice
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 font-medium max-w-xl mx-auto animate-fade-in delay-100">
            Discover and compare the latest prices for top products in Nigeria. Search and track price history with ease!
          </p>
        </div>
        {/* Search Bar in a Card */}
        <div className="w-full max-w-2xl bg-white/80 rounded-3xl shadow-xl p-6 sm:p-8 backdrop-blur-md animate-fade-in delay-200">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
