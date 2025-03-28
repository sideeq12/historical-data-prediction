import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import PriceHistoryChart from "../components/chart";

export default function ProductPage() {
  const { id } = useParams();
  const productId = parseInt(id);

  const products = [
    { id: 1, name: "Samsung Galaxy S21", price: "₦450,000", source: "Jumia", image: "/samsung.jpg", description: "A high-performance smartphone with a stunning display and powerful camera." },
    { id: 2, name: "HP Pavilion 15", price: "₦750,000", source: "Konga", image: "/laptop.jpg", description: "A sleek and powerful laptop suitable for work and gaming." },
    { id: 3, name: "Sony WH-1000XM4", price: "₦180,000", source: "Jiji", image: "/headphone.jpg", description: "Noise-canceling wireless headphones with superior sound quality." },
  ];

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="container mx-auto text-center mt-10">
        <h1 className="text-3xl font-bold text-red-500">Product Not Found</h1>
        <p className="text-gray-600">Sorry, the product you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="text-gray-500 text-sm">
        Home / products / <span className="font-semibold text-black">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-6">
        {/* Product Image */}
        <div>
          <img src={"/printer.jpg"} alt={product.name} className="w-full rounded-lg shadow-md" />
          {/* Thumbnails */}
          <div className="flex gap-2 mt-4">
            <img src={product.image} alt="Thumbnail" className="w-16 h-16 rounded-md border" />
            <img src={product.image} alt="Thumbnail" className="w-16 h-16 rounded-md border opacity-50" />
            <img src={product.image} alt="Thumbnail" className="w-16 h-16 rounded-md border opacity-50" />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-600 mt-2">{product.price}</p>
          <p className="text-gray-700 my-4">{product.description}</p>

        


          {/* Buttons */}
          <Link to="https://www.jumia.com.ng" className="px-4 mt-10 
           bg-black text-white py-3 rounded-lg ">Buy Now</Link>
          
        </div>
      </div>
      <PriceHistoryChart />
    </div>
  );
}
