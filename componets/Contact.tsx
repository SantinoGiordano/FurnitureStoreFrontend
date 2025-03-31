'use client'

import { useState } from 'react';

const ContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
       <button
        onClick={() => togglePopup()}
        className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors relative"
      >
        Contact
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-70 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-4">
          <div className="space-y-3">
            {/* Location */}
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-gray-700">Location: Agawam</span>
            </div>

            {/* Phone */}
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-gray-700">Phone: 123 345 6789</span>
            </div>

            {/* Email */}
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-gray-700">Email: FantasticFurniture@gmail.com</span>
            </div>

            {/* Hours */}
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-gray-700">Hours: 10:00 AM - 9:00 PM</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactButton;