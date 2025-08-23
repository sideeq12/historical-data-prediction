import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PriceHistoryChart from "../components/chart";
import { IoPricetagsOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";

export default function ProductPage() {
  const { id } = useParams();
  const productTitle = decodeURIComponent(id);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Search for the specific product by title
        const url = new URL('http://localhost:4000/search');
        url.searchParams.set('q', productTitle);
        
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        
        const data = await response.json();
        const products = data.products || [];
        
        // Find the exact product match
        const foundProduct = products.find(p => p.title === productTitle) || products[0];
        
        if (!foundProduct) {
          throw new Error('Product not found');
        }
        
        setProduct(foundProduct);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productTitle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Loading product details...</h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-red-500 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">{error || "Sorry, the product you are looking for does not exist."}</p>
          <Link to="/products" className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors">
            <FaArrowLeft />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 sm:mb-8">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          <span className="mx-2">/</span>
          <span className="font-semibold text-gray-900 truncate">{product.title}</span>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-8">
            {/* Product Image Section */}
            <div>
              <div className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden">
                <img 
                  src={product.image || "/printer.jpg"} 
                  alt={product.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Product Info Section */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">{product.price}</p>
                <p className="text-sm text-gray-500 mt-1">Available on <span className="text-green-600 font-medium">{product.source || 'Multiple Platforms'}</span></p>
              </div>

              <div className="border-t border-b border-gray-200 py-4 sm:py-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Description</h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Action Button */}
              <Link 
                to="https://www.jumia.com.ng" 
                target="_blank"
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                <IoPricetagsOutline size={18} className="sm:w-5 sm:h-5" />
                Buy Now
              </Link>
            </div>
          </div>
        </div>

        {/* Price History Chart */}
        <div className="mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Price History</h2>
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden p-4 sm:p-6">
            <PriceHistoryChart />
          </div>
        </div>
      </div>
    </div>
  );
}
