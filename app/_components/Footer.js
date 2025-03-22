import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Restaurant Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Restaurant</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/restaurant" className="text-gray-300 hover:text-green-400 transition">
                Register Restaurant
              </Link>
            </li>
            <li>
              <Link href="/restaurant" className="text-gray-300 hover:text-green-400 transition">
                Restaurant Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Delivery Partner Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Delivery Partner</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/deliverypartner" className="text-gray-300 hover:text-green-400 transition">
                Register Delivery Partner
              </Link>
            </li>
            <li>
              <Link href="/deliverypartner" className="text-gray-300 hover:text-green-400 transition">
                Delivery Partner Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-gray-300 hover:text-green-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/" className="text-gray-300 hover:text-green-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/" className="text-gray-300 hover:text-green-400 transition">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Copyright Section */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4 text-center mt-6">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} All Rights Reserved by <span className="text-green-400">Restro App</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
