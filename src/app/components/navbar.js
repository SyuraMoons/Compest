"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          SEA
        </Link>

        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <div
          className={`hidden lg:flex space-x-8 items-center ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <Link
            href="/"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/menu"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Menu
          </Link>
          <Link
            href="/subscription"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Subscription
          </Link>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-colors">
            <Link href="/contact">Contact Us</Link>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Conditionally Rendered) */}
      {isOpen && (
        <div className="lg:hidden bg-gray-50 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link
              href="#about"
              className="text-gray-700 hover:text-blue-600 transition-colors block py-2"
            >
              About
            </Link>
            <Link
              href="#features"
              className="text-gray-700 hover:text-blue-600 transition-colors block py-2"
            >
              Features
            </Link>
            <Link
              href="#contact"
              className="text-gray-700 hover:text-blue-600 transition-colors block py-2"
            >
              Contact
            </Link>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-colors">
              Order Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
