import React from "react";
import { Link, Outlet } from "react-router";

export default function Admin(props) {
  const {
    originalItems,
    categories,
    form,
    handleChange,
    handleEditItem,
    handleDeleteItem,
  } = props;
  const handleSumbit = (e,id) => {
    e.preventDefault();
    handleEditItem(id , form);
  }

  return (
    <div className="min-h-screen bg-amber-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Admin Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Product Management
          </h1>
          <Link
            to="/admin/item"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Product
          </Link>
        </div>

        {/* items Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                    Image
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                    Price
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {originalItems.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="w-12 h-12 rounded overflow-hidden">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">{product.name}</td>
                    <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                          onClick={() =>
                            document.getElementById("my_modal_3").showModal()
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <dialog
                          id="my_modal_3"
                          className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                        >
                          <div className="modal-box bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
                            <h2 className="text-2xl font-semibold text-center mb-4">
                              Edit Product
                            </h2>
                            <form onSubmit={(e) => handleSumbit(e,product.id)}>
                              <div className="form-group mb-4">
                                <label
                                  htmlFor="name"
                                  className="block text-sm font-medium mb-1"
                                >
                                  Name
                                </label>
                                <input
                                  type="text"
                                  id="name"
                                  name="name"
                                  value={form.name}
                                  onChange={handleChange}
                                  required
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                              </div>
                              <div className="form-group mb-4">
                                <label
                                  htmlFor="price"
                                  className="block text-sm font-medium mb-1"
                                >
                                  Price
                                </label>
                                <input
                                  type="number"
                                  id="price"
                                  name="price"
                                  value={form.price}
                                  onChange={handleChange}
                                  required
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                              </div>
                              <div className="form-group mb-4">
                                <label
                                  htmlFor="category"
                                  className="block text-sm font-medium mb-1"
                                >
                                  Category
                                </label>
                                <select
                                  id="category"
                                  name="category"
                                  value={form.category}
                                  onChange={handleChange}
                                  required
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                  <option value="" disabled>
                                    Select a category
                                  </option>
                                  {categories.map((category) => (
                                    <option
                                      key={category.id}
                                      value={category.id}
                                    >
                                      {category.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="form-group mb-4">
                                <label
                                  htmlFor="imageUrl"
                                  className="block text-sm font-medium mb-1"
                                >
                                  Image URL
                                </label>
                                <input
                                  type="url"
                                  id="imageUrl"
                                  name="imageUrl"
                                  value={form.imageUrl}
                                  onChange={handleChange}
                                  required
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                              </div>
                              <div className="form-actions flex justify-center mt-4">
                                <button
                                  type="submit"
                                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                                    
                                >
                                  Submit
                                </button>
                              </div>
                            </form>
                          </div>
                          <form
                            method="dialog"
                            className="modal-backdrop absolute top-0 left-0 w-full h-full flex justify-center items-center"
                          >
                            <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
                              Close
                            </button>
                          </form>
                        </dialog>

                        <button
                          className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                          onClick={() => handleDeleteItem(product.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
