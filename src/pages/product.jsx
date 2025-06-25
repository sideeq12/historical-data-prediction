import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import PriceHistoryChart from "../components/chart";
import { IoPricetagsOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";

export default function ProductPage() {
  const { id } = useParams();
  const productId = parseInt(id);

const products = [
    { id: 1, name: "Samsung Galaxy S21", price: "₦450,000", source: "Jumia", description: "A high-performance smartphone with a stunning display and powerful camera." },
    { id: 2, name: "HP Pavilion 15", price: "₦750,000", source: "Konga", description: "A sleek and powerful laptop suitable for work and gaming." },
    { id: 3, name: "Sony WH-1000XM4", price: "₦180,000", source: "Jiji", description: "Noise-canceling wireless headphones with superior sound quality." },
    { id: 4, name: "Apple MacBook Air M2", price: "₦1,200,000", source: "Slot.ng", description: "A lightweight yet powerful laptop with Apple's latest M2 chip." },
    { id: 5, name: "PlayStation 5", price: "₦800,000", source: "PayPorte", description: "Next-gen gaming console with immersive gameplay and fast loading times." },
    { id: 6, name: "Xiaomi Redmi Note 12", price: "₦250,000", source: "Jumia", description: "A budget-friendly smartphone with a large battery and crisp display." },
    { id: 7, name: "Dell XPS 13", price: "₦950,000", source: "Konga", description: "A premium ultrabook with a stunning InfinityEdge display." },
    { id: 8, name: "Samsung 65-inch Smart TV", price: "₦600,000", source: "Jiji", description: "A 4K UHD smart TV with vibrant colors and built-in streaming apps." },
    { id: 9, name: "Canon EOS 90D", price: "₦850,000", source: "Slot.ng", description: "A professional DSLR camera with high-speed autofocus and 4K recording." },
];

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-red-500 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">Sorry, the product you are looking for does not exist.</p>
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
          <span className="font-semibold text-gray-900 truncate">{product.name}</span>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-8">
            {/* Product Image Section */}
            <div>
              <div className="relative aspect-square rounded-lg sm:rounded-xl overflow-hidden">
                <img 
                  src={"/printer.jpg"} 
                  alt={product.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Product Info Section */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">{product.price}</p>
                <p className="text-sm text-gray-500 mt-1">Available on <span className="text-green-600 font-medium">{product.source}</span></p>
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
