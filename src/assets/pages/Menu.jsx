import React from "react";

export default function Menu(props) {
  const {
    items,
    handleAddToCart,
    handleSelectedCategory,
    handleQuantityChange,
    categories,
    handlePageChange,
    totalPages,
    handleSearch,
  } = props;
  const searchParams = new URLSearchParams(window.location.search);
  const selectedCategory = searchParams.get("categoryId");
  const currentPage = searchParams.get("page") || 1;

  return (
    <div className="min-h-screen bg-amber-50 p-4 md:p-8">
      {/* Search Bar */}
      <div className="w-full max-w-md mx-auto mb-8">
        <div className="relative">
          <input
            type="search"
            className="w-full py-3 pl-12 pr-4 bg-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="Search menu items..."
            onChange={handleSearch}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
            />
          </svg>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar: Categories */}
        <div className="w-full md:w-64 flex-shrink-0 bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="bg-amber-500 text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Categories</h2>
            <button
              className="hover:text-amber-100 transition cursor-pointer"
              onClick={() => handleSelectedCategory(0)}
              title="Clear selection"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6a2.25 2.25 0 01-2.25-2.25V15m-3 0l-3-3m0 0l3-3m-3 3H15"
                />
              </svg>
            </button>
          </div>

          <ul className="p-4 space-y-2">
            {categories.map((cat) => (
              <li
                key={cat.id}
                onClick={() => handleSelectedCategory(cat.id)}
                className={`cursor-pointer px-4 py-3 rounded-lg transition duration-200 font-medium ${
                  selectedCategory == cat.id
                    ? "bg-amber-400 text-white shadow-md"
                    : "bg-gray-100 hover:bg-amber-100 text-gray-700"
                }`}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Menu Items */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    className="w-full h-full object-fit"
                    alt={item.name}
                  />
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-xl font-bold text-amber-500">${item.totalPrice}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
                      <button 
                        className="px-3 py-2 bg-gray-200 hover:bg-gray-300"
                        onClick={() => handleQuantityChange(item.id, Math.max(1, item.count - 1))}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.count}
                        min="1"
                        className="w-12 py-1 px-2 text-center bg-gray-100 border-none focus:outline-none"
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      />
                      <button 
                        className="px-3 py-2 bg-gray-200 hover:bg-gray-300"
                        onClick={() => handleQuantityChange(item.id, Number(item.count) + 1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleAddToCart(item.id)}
                      className={`flex items-center justify-center p-3 rounded-full transition ${
                        item.inCart 
                          ? "bg-green-500 text-white" 
                          : "bg-amber-400 hover:bg-amber-500 text-white"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
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
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition ${
                  currentPage == i + 1
                    ? "bg-amber-500 text-white shadow-md"
                    : "bg-gray-200 hover:bg-amber-200 text-gray-800"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}