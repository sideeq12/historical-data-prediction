import { Link } from "react-router-dom";
import { IoPricetagsOutline } from "react-icons/io5";
import { CiRead } from "react-icons/ci";



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
  

  
  

export default function Products() {
    function truncateText(text, maxLength = 45) {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
      }
  return (
    <div>
        
      <div className="grid md:grid-cols-4 w-5/6 mx-auto sm:grid-cols-2 gap-6 mt-12">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
            
            {/* Image as Background */}
            <div 
              className="w-full h-40 bg-cover bg-center rounded-lg shadow-lg" 
              style={{ backgroundImage: "url('/printer.jpg')" }}
            ></div>

            <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
            <p className="text-gray-700">
                {product.price} - <b className="text-green-500"> {product.source}</b>
            </p>
            <p>
            {truncateText(product.description)}
            </p>
         <div className="flex gap-2">
         <Link 
              to={`/product/${product.id}`} 
              className="mt-4 flex gap-2 bg-blue-500 text-xs
               text-white px-2 py-1 rounded hover:bg-blue-600"
            >
                <CiRead size={12} className="mt-1"/>
              View Details
            </Link>
            <Link 
              to="https://www.jumia.com.ng"
              target="_blank"
              className="mt-4 flex gap-2 text-xs bg-blue-500
               text-white px-2 py-1 rounded hover:bg-blue-600"
            >
                <IoPricetagsOutline  size={12} className="mt-1"/>
             Buy now
            </Link>
         </div>
          </div>
        ))}
      </div>
    </div>
  );
}
