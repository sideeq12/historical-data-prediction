import { Link, useSearchParams } from "react-router-dom";
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
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    function truncateText(text, maxLength = 45) {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    }

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery) ||
        product.source.toLowerCase().includes(searchQuery)
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
                    </h1>
                    {searchQuery && (
                        <Link 
                            to="/products" 
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Clear Search
                        </Link>
                    )}
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">No products found</h2>
                        <p className="text-gray-600">Try different keywords or browse all products</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <div 
                                key={product.id} 
                                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
                            >
                                {/* Product Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <div 
                                        className="w-full h-full bg-cover bg-center transform group-hover:scale-110 transition-transform duration-300" 
                                        style={{ backgroundImage: "url('/printer.jpg')" }}
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                                </div>

                                {/* Product Info */}
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                        {product.name}
                                    </h2>
                                    <p className="text-lg font-bold text-gray-900 mb-2">
                                        {product.price}
                                    </p>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Source: <span className="text-green-600 font-medium">{product.source}</span>
                                    </p>
                                    <p className="text-gray-600 text-sm mb-6">
                                        {truncateText(product.description)}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <Link 
                                            to={`/product/${product.id}`} 
                                            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                        >
                                            <CiRead size={16} />
                                            View Details
                                        </Link>
                                        <Link 
                                            to="https://www.jumia.com.ng"
                                            target="_blank"
                                            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                        >
                                            <IoPricetagsOutline size={16} />
                                            Buy Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
