"use client";
import React, { useState } from "react";
import { Book, Download, FileText, Image } from "lucide-react";

const ResourcePage = () => {
  const [selectedBook, setSelectedBook] = useState(null);

  const books = [
    {
      title: "Diabetic Foot Ulcer Management",
      description:
        "Comprehensive guide to understanding and treating diabetic foot ulcers",
      thumbnail: "/api/placeholder/300/400",
      driveLink: "https://drive.google.com/path/to/book1",
    },
    {
      title: "Wound Healing Principles",
      description: "Advanced techniques in wound care and healing processes",
      thumbnail: "/api/placeholder/300/400",
      driveLink: "https://drive.google.com/path/to/book2",
    },
    {
      title: "Clinical Assessment of Foot Ulcers",
      description: "Diagnostic methods and early intervention strategies",
      thumbnail: "/api/placeholder/300/400",
      driveLink: "https://drive.google.com/path/to/book3",
    },
    {
      title: "Preventive Care in Ulcer Management",
      description: "Strategies for preventing and monitoring foot ulcers",
      thumbnail: "/api/placeholder/300/400",
      driveLink: "https://drive.google.com/path/to/book4",
    },
    {
      title: "Advanced Wound Healing Technologies",
      description: "Cutting-edge approaches to wound treatment and healing",
      thumbnail: "/api/placeholder/300/400",
      driveLink: "https://drive.google.com/path/to/book5",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Foot Ulcer Detection Resources
        </h1>
        <p className="text-xl text-gray-600">
          Comprehensive information and educational materials
        </p>
      </div>

      {/* Informational Sections */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Understanding Foot Ulcers
          </h2>
          <p className="text-gray-700">
            Foot ulcers are open wounds or sores that typically develop on the
            bottom of the foot. They're most common in people with diabetes due
            to nerve damage and poor circulation. Early detection and proper
            management are crucial to prevent serious complications.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Key Risk Factors
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Diabetes</li>
            <li>• Poor circulation</li>
            <li>• Nerve damage (neuropathy)</li>
            <li>• Foot deformities</li>
            <li>• Previous ulcer history</li>
          </ul>
        </div>
      </div>

      {/* Book Resources */}
      <div className="bg-gray-50 py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Educational Books
        </h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {books.map((book, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => window.open(book.driveLink, "_blank")}
            >
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <Image className="w-32 h-48 object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{book.description}</p>
                <div className="flex items-center text-blue-600">
                  <Download className="mr-2 h-5 w-5" />
                  <span>Download</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Detection Section */}
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          AI-Powered Ulcer Detection
        </h2>
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <p className="text-gray-700 mb-6">
            Our advanced AI model helps in early detection and grading of foot
            ulcers. By analyzing uploaded images, we provide quick, accurate
            assessments to support medical professionals.
          </p>
          <a
            href="/scan"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Ulcer Scan
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;
