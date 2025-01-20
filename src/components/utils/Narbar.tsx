import React from "react";
import Image from "next/image";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-900 text-white py-4 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        {/* Logo and App Name */}
        <div className="flex items-center space-x-4">
          <Image
            src="/logo.jpeg"
            alt="App Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold">Ulcer Detection App</h1>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 font-semibold">
          <li>
            <a href="/dashboard" className="hover:text-blue-400 transition">
              Home
            </a>
          </li>
          <li>
            <a href="/scan" className="hover:text-blue-400 transition">
              Scan
            </a>
          </li>
          <li>
            <a href="/reports" className="hover:text-blue-400 transition">
              Reports
            </a>
          </li>
          <li>
            <a href="/resources" className="hover:text-blue-400 transition">
              Resources
            </a>
          </li>
        </ul>

        {/* User Actions */}
        <div className="m-0 text-white">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton showName />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
