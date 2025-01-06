"use client"
import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function Scan() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result as string;

      const formData = {
        userId: "user-12345", // Example user ID, replace with actual user ID from session or auth
        imageFile: base64Image.split(",")[1], // Remove the data URI prefix
      };

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("Image uploaded:", data);
        // Clear the file after successful upload
        setFile(null);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
      <div className="p-8">
        <div
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-lg p-8 h-56 flex flex-col items-center justify-center transition-colors
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          ${file ? "bg-green-50" : ""}
        `}
        >
          <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title="Choose a file or drag it here"
          />

          <Upload
              className={`w-12 h-12 mb-4 ${isDragging ? "text-blue-500" : "text-gray-400"}`}
          />

          {file ? (
              <div className="text-center">
                <p className="text-sm font-medium mb-2">Selected file:</p>
                <p className="text-sm text-gray-500 mb-4">{file.name}</p>
                <Button onClick={handleUpload} variant="default">
                  Upload File
                </Button>
              </div>
          ) : (
              <div className="text-center">
                <p className="text-sm font-medium mb-2">
                  {isDragging ? "Drop your file here" : "Drag & drop your file here"}
                </p>
                <p className="text-sm text-gray-500">or click to select a file</p>
              </div>
          )}
        </div>
      </div>
  );
}
