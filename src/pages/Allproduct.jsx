import { Link, useSearchParams } from "react-router-dom";
import { IoPricetagsOutline } from "react-icons/io5";
import { CiRead } from "react-icons/ci";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";

const PRODUCTS_PER_PAGE = 20;

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch('http://localhost:4000/api/products')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch products');
                return res.json();
            })
            .then(data => {
                setProducts(data.products || []);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setPage(Number(searchParams.get('page')) || 1);
    }, [searchParams]);

    function truncateText(text, maxLength = 45) {
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    }

    const filteredProducts = products.filter(product => 
        product.title?.toLowerCase().includes(searchQuery) ||
        product.description?.toLowerCase().includes(searchQuery)
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE) || 1;
    const paginatedProducts = filteredProducts.slice(
        (page - 1) * PRODUCTS_PER_PAGE,
        page * PRODUCTS_PER_PAGE
    );

    const goToPage = (newPage) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            if (newPage === 1) {
                params.delete('page');
            } else {
                params.set('page', newPage);
            }
            return params;
        });
    };

    // CSV export function
    function exportToCSV() {
        if (!filteredProducts.length) return;
        const headers = ["Title", "Price", "Source", "Description", "Image"];
        const rows = filteredProducts.map(product => [
            product.title,
            product.price,
            product.source || '',
            product.description,
            product.image || ''
        ]);
        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(","))
        ].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'products.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    return (
        <div className="min-h-screen bg-gray-50 py-6 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-0">
                        {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
                    </h1>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={exportToCSV}
                            className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition-colors text-sm"
                        >
                            Export CSV
                        </button>
                        {searchQuery && (
                            <Link 
                                to="/products" 
                                className="text-blue-600 hover:text-blue-700 font-medium"
                            >
                                Clear Search
                            </Link>
                        )}
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-8 sm:py-12">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Loading products...</h2>
                    </div>
                ) : error ? (
                    <div className="text-center py-8 sm:py-12">
                        <h2 className="text-xl sm:text-2xl font-semibold text-red-600 mb-2">{error}</h2>
                        <p className="text-gray-600">Please try again later.</p>
                    </div>
                ) : paginatedProducts.length === 0 ? (
                    <div className="text-center py-8 sm:py-12">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">No products found</h2>
                        <p className="text-gray-600">Try different keywords or browse all products</p>
                    </div>
                ) : (
                    <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {paginatedProducts.map((product, idx) => (
                            <div 
                                key={product.title + idx} 
                                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group flex flex-col h-full min-h-0"
                                style={{ minHeight: 0 }}
                            >
                                {/* Product Image */}
                                <div className="relative h-28 sm:h-32 overflow-hidden">
                                    <img 
                                        src={product.image || "/printer.jpg"} 
                                        alt={product.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                                </div>

                                {/* Product Info */}
                                <div className="p-3 sm:p-4 flex flex-col flex-1">
                                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {product.title}
                                    </h2>
                                    <p className="text-sm sm:text-base font-bold text-gray-900 mb-1">
                                        {product.price}
                                    </p>
                                    {product.source && (
                                        <span className="inline-block mb-1 px-2 py-0.5 w-fit rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                                            {product.source}
                                        </span>
                                    )}
                                    <p className="text-xs sm:text-sm text-gray-600 mb-2 flex-1 line-clamp-2">
                                        {truncateText(product.description, 60)}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 mt-auto">
                                        <Link 
                                            to={"#"} 
                                            className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white px-2 py-1 rounded-md hover:bg-blue-700 transition-colors text-xs font-medium"
                                        >
                                            <CiRead size={13} />
                                            View Details
                                        </Link>
                                        <Link 
                                            to="https://www.jumia.com.ng"
                                            target="_blank"
                                            className="flex-1 flex items-center justify-center gap-1 bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700 transition-colors text-xs font-medium"
                                        >
                                            <IoPricetagsOutline size={13} />
                                            Buy Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center gap-2 mt-8">
                        <button
                            onClick={() => goToPage(page - 1)}
                            disabled={page <= 1}
                            className={`px-3 py-1 rounded-md border text-sm font-medium ${page <= 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-100 text-gray-700'}`}
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <button
                                key={p}
                                onClick={() => goToPage(p)}
                                className={`px-3 py-1 rounded-md border text-sm font-medium ${p === page ? 'bg-blue-600 text-white' : 'bg-white hover:bg-gray-100 text-gray-700'}`}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            onClick={() => goToPage(page + 1)}
                            disabled={page >= totalPages}
                            className={`px-3 py-1 rounded-md border text-sm font-medium ${page >= totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-100 text-gray-700'}`}
                        >
                            Next
                        </button>
                    </div>
                    </>
                )}
            </div>
        </div>
    );
}
