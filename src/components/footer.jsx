export default function Footer() {
    return (
      <footer className="bg-black text-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-bold mb-3">About Us</h2>
            <p className="text-gray-400 text-sm">
              We provide the best deals across multiple platforms, tracking historical prices to help you save money.
            </p>
          </div>
  
          {/* Links Section */}
          <div>
            <h2 className="text-xl font-bold mb-3">Built with Love</h2>
          
          </div>
  
          {/* Contact Section */}
          <div>
            <h2 className="text-xl font-bold mb-3">Contact Us</h2>
            <p className="text-gray-400 text-sm">Email: support@example.com</p>
            <p className="text-gray-400 text-sm">Phone: +234 801 234 5678</p>
            <div className="flex space-x-4 mt-3">
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
  
        {/* Copyright */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
        </div>
      </footer>
    );
  }
  