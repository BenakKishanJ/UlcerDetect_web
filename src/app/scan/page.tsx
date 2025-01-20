"use client";
import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button"; // Your custom Button component
import { Upload } from "lucide-react";
import Image from "next/image";

export default function Scan() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  // Upload and send the image to backend
  const handleUpload = async (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default behavior of button click

    if (!file) {
      setError("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setPrediction(data.class);
        setConfidence(data.confidence);
      } else {
        setError(data.error || "An error occurred");
      }
    } catch (err) {
      setError("Failed to fetch predictions");
      console.log(err);
    }
  };

  return (
    <div className="p-8">
      <div className="py-4 pb-8 px-0 m-auto">
        <div className="bg-black rounded-3xl text-white shadow-2xl items-center flex flex-col justify-center text-center">
          <em>
            <h1 className="text-display-1 font-bold text-7xl mb-0 p-2">
              Scan Page
            </h1>
          </em>
          <p className="m-0 p-4 text-2xl">
            Submit images to get predictions for ulcer analysis.
          </p>
        </div>
      </div>

      <div
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 h-56 flex flex-col items-center justify-center transition-colors
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-primary"}
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
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm font-medium mb-2">
              {isDragging
                ? "Drop your file here"
                : "Drag & drop your file here"}
            </p>
            <p className="text-sm text-gray-500">or click to select a file</p>
          </div>
        )}
      </div>

      {/* Upload and Predict button below */}
      {file && (
        <div className="mt-4 text-center">
          <Button
            onClick={handleUpload}
            variant="default"
            className="bg-black text-neutral"
          >
            Upload and Predict
          </Button>
        </div>
      )}

      {/* Display Prediction Result as a Card */}
      {prediction && confidence !== null && file && (
        <div className="mt-8 max-w-sm mx-auto bg-tertiary shadow-lg rounded-lg overflow-hidden border-2 border-secondary">
          <Image
            src={URL.createObjectURL(file)}
            alt="Uploaded file"
            width={400} // Set a fixed width or use a responsive size
            height={225} // Set a fixed height for the image
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-black">Prediction</h3>
            <p className="mt-2 text-sm text-highlight">
              <strong>Class:</strong> {prediction}
            </p>
            <p className="text-sm text-highlight">
              <strong>Confidence:</strong> {(confidence * 100).toFixed(2)}%
            </p>
          </div>
        </div>
      )}

      {/* Display Error Message */}
      {error && (
        <div style={{ marginTop: "1rem", color: "red" }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}
