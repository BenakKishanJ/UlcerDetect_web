"use client";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  //UserButton,
  SignInButton,
} from "@clerk/clerk-react"; // If you're using Clerk for authentication
import Image from "next/image"; // Import Image component for logo
// import { useState } from "react"; // Optional, in case you want dynamic behavior like state updates

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/logo.jpeg"
          alt="App Logo"
          width={120}
          height={120}
          className="rounded-full"
        />
      </div>

      {/* Authentication Check */}
      <SignedIn>
        {/* If the user is signed in */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome back, User!</h1>
          <p className="text-xl text-gray-700 mb-4">
            It's great to see you again.
          </p>
          <p className="text-lg text-gray-500">
            Here are some exciting features to explore:
          </p>
          <ul className="list-disc pl-5 mt-4 text-gray-600">
            <li>Scan images for predictions</li>
            <li>Track and analyze reports</li>
            <li>Explore a wide range of resources</li>
          </ul>
        </div>
      </SignedIn>

      <SignedOut>
        {/* If the user is signed out */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to the Ulcer Detection App!
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            Your health analysis platform starts here.
          </p>
          <p className="text-lg text-gray-500">
            Sign in to access all features and start scanning!
          </p>
          <div className="mt-6">
            <SignInButton>
              <Button
                variant="default"
                className="bg-black text-white font-bold"
              >
                Sign In
              </Button>
            </SignInButton>
            <div className="mt-3">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-500">
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </SignedOut>

      {/* Taglines and Slogans */}
      <div className="mt-12 text-center text-gray-700">
        <p className="text-xl font-semibold">
          Empowering your health journey, one scan at a time.
        </p>
        <p className="text-lg mt-2">
          Fast, reliable, and accurate predictions for a healthier tomorrow.
        </p>
      </div>
    </div>
  );
}

