import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-center border-b border-blue-400 pb-6 mb-6">
          {/* Logo and Description */}
          <div className="w-full md:w-1/3 text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-2xl font-bold">Ulcer Detection App</h1>
            <p className="text-sm mt-2">
              Empowering healthcare with AI for faster and more accurate
              diagnoses.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/3 text-center mb-6 md:mb-0">
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="hover:underline">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:underline">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:underline">
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="w-full md:w-1/3 text-center md:text-right">
            <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
            <p>
              Email:{" "}
              <a
                href="mailto:ulcerdiabetic@gmail.com"
                className="hover:underline"
              >
                ulcerdiabetic@gmail.com
              </a>
            </p>
            <p>Phone: +1 234 567 890</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Social Media Icons */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" aria-label="Facebook" className="hover:text-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.787 4.662-4.787 1.325 0 2.462.098 2.794.143v3.24h-1.918c-1.506 0-1.797.715-1.797 1.762v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.326V1.326C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M24 4.557a9.994 9.994 0 01-2.828.775 4.93 4.93 0 002.165-2.724 9.868 9.868 0 01-3.127 1.184 4.916 4.916 0 00-8.385 4.482A13.978 13.978 0 011.671 3.149a4.915 4.915 0 001.524 6.573 4.902 4.902 0 01-2.224-.616v.062a4.916 4.916 0 003.946 4.827 4.928 4.928 0 01-2.217.084 4.916 4.916 0 004.59 3.417A9.867 9.867 0 010 21.533a13.924 13.924 0 007.548 2.212c9.057 0 14.002-7.507 14.002-14.002 0-.213-.005-.425-.014-.636A9.984 9.984 0 0024 4.557z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M22.23 0H1.77C.792 0 0 .774 0 1.728V22.27C0 23.225.792 24 1.77 24h20.459C23.208 24 24 23.226 24 22.27V1.73C24 .775 23.208 0 22.23 0zM7.06 20.452H3.56V9.098h3.5v11.354zm-1.75-12.99c-1.21 0-2.19-.978-2.19-2.188 0-1.211.978-2.188 2.19-2.188 1.207 0 2.187.977 2.187 2.188 0 1.21-.98 2.187-2.188 2.187zm14.34 12.99h-3.5v-5.657c0-1.35-.027-3.084-1.88-3.084-1.88 0-2.167 1.466-2.167 2.982v5.76h-3.5V9.098h3.364v1.548h.048c.467-.885 1.607-1.82 3.31-1.82 3.54 0 4.19 2.33 4.19 5.357v6.269z" />
              </svg>
            </a>
          </div>

          {/* Copyright Text */}
          <div className="text-center md:text-right text-sm">
            &copy; {new Date().getFullYear()} Ulcer Detection App. All Rights
            Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
