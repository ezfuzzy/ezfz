import React, { useState } from "react";

function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center">
          <div className="cursor-pointer" onClick={toggleSidebar}>
            <img src="/images/svg/burger.svg" alt="Burger Menu" className="h-6 w-6" />
          </div>
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-[#062] text-white transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out z-50`}
          >
            <div className="absolute top-6 left-6 cursor-pointer text-5xl" onClick={toggleSidebar}>
              &times;
            </div>
            <nav className="mt-24 space-y-4 text-2xl">
              <a
                href="/"
                className="block px-4 py-2 text-white hover:bg-green-600 hover:text-white hover:font-bold cursor-pointer"
              >
                Home
              </a>
              <a
                href="/about"
                className="block px-4 py-2 text-white hover:bg-green-600 hover:text-white hover:font-bold cursor-pointer"
              >
                About
              </a>
              <a
                href="/services"
                className="block px-4 py-2 text-white hover:bg-green-600 hover:text-white hover:font-bold cursor-pointer"
              >
                Services
              </a>
              <a
                href="/contact"
                className="block px-4 py-2 text-white hover:bg-green-600 hover:text-white hover:font-bold cursor-pointer"
              >
                Contact
              </a>
            </nav>
          </div>
          <a href="/" className="ml-4 text-2xl font-bold">
            EZFZ
          </a>
        </div>

        <form action="/search" className="max-w-md mx-auto relative">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <input
              type="search"
              id="search"
              name="search-input"
              className="block w-full pl-10 pr-20 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search ..."
              required
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <button
              type="submit"
              className="absolute right-2.5 bottom-1 bg-green-700 hover:bg-green-800 text-white font-medium rounded-lg text-xs px-2 py-1.5 focus:ring-4 focus:outline-none focus:ring-green-300"
            >
              Search
            </button>
          </div>
        </form>

        <div className="flex items-center space-x-4">
          {/* <img src="/images/svg/dark-mode.svg" alt="Dark Mode" className="h-6 w-6 cursor-pointer" /> */}
          {/* <img src="/images/svg/light-mode.svg" alt="Light Mode" className="h-6 w-6 cursor-pointer" /> */}
          <a href="/">
            <img src="/images/svg/notification.svg" alt="Notifications" className="h-6 w-6" />
          </a>
          <a href="/">
            <img src="/images/svg/chat.svg" alt="Chat" className="h-6 w-6" />
          </a>
          <a href="/user-dashboard">
            <img src="/images/svg/user.svg" alt="User Dashboard" className="h-6 w-6" />
          </a>
        </div>
      </header>
      {sidebarOpen && (
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-500 ${
            sidebarOpen ? "opacity-30" : "opacity-0"
          } z-40`}
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}

export default Header;
