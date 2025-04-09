import React from "react";
import { Link } from "react-router";

export default function NavBar(props) {
  const { numOfItems } = props;
  
  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo/Brand */}
        <Link 
          to="/menu" 
          className="flex items-center gap-2 text-xl font-bold text-amber-500 hover:text-amber-600 transition"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          FoodMenu
        </Link>

        {/* Navigation Links - Middle section */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/menu" className="font-medium text-gray-700 hover:text-amber-500 transition">
            Menu
          </Link>
          <Link to="/admin" className="font-medium text-gray-700 hover:text-amber-500 transition">
            Admin Dashboard
          </Link>
          <Link to="/cart" className="font-medium text-gray-700 hover:text-amber-500 transition">
            Cart
          </Link>
        </div>

        {/* Cart Icon */}
        <Link 
          to="/cart" 
          className="relative p-2 rounded-full bg-amber-100 hover:bg-amber-200 transition -right-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-amber-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          
          {numOfItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {numOfItems}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}