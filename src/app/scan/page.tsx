"use client";
import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button"; // Custom Button component
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
      setPrediction(null); // Clear previous prediction
      setConfidence(null); // Clear previous confidence
      setError(null); // Clear previous error
    }
  };

  // Drag-and-drop handlers
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
      setPrediction(null); // Clear previous prediction
      setConfidence(null); // Clear previous confidence
      setError(null); // Clear previous error
    }
  }, []);

  // Upload the image and fetch predictions
  const handleUpload = async (event: React.MouseEvent) => {
    event.preventDefault();
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

        const fileData = await file.arrayBuffer();
        const base64File = Buffer.from(fileData).toString("base64");

        // Store the report in the database
        await fetch("/api/reports", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prediction: data.class,
            confidence: data.confidence,
            file: {
              data: base64File,
              name: file.name,
              type: file.type,
            },
          }),
        });
      }
    } catch (err) {
      setError("Failed to fetch predictions");
      console.error(err);
    }
  };
  return (
    <div className="p-8 space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-black">
          Scan for Ulcer Detection
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Upload an image to receive predictions and confidence levels for ulcer
          analysis.
        </p>
      </div>

      {/* Steps Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-4 bg-gray-800 rounded-lg shadow">
          <h3 className="font-semibold text-lg text-white">Step 1</h3>
          <p className="mt-2 text-sm text-gray-100">
            Select or drag-and-drop the image of the ulcer.
          </p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg shadow">
          <h3 className="font-semibold text-lg text-white">Step 2</h3>
          <p className="mt-2 text-sm text-gray-100">
            Click "Upload and Predict" to analyze the image.
          </p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg shadow">
          <h3 className="font-semibold text-lg text-white">Step 3</h3>
          <p className="mt-2 text-sm text-gray-100">
            View predictions and confidence scores instantly.
          </p>
        </div>
      </div>

      {/* Drag-and-Drop or File Upload Section */}
      <div
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 h-56 flex flex-col items-center justify-center transition-colors ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        } ${file ? "bg-green-50" : ""}`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <Upload
          className={`w-12 h-12 mb-4 ${
            isDragging ? "text-blue-500" : "text-gray-400"
          }`}
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

      {/* Upload Button */}
      {file && (
        <div className="mt-4 text-center">
          <Button
            onClick={handleUpload}
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Upload and Predict
          </Button>
        </div>
      )}

      {/* Prediction Result */}
      {prediction && confidence !== null && file && (
        <div className="mt-8 max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <Image
            src={URL.createObjectURL(file)}
            alt="Uploaded file"
            width={400}
            height={225}
            className="w-full object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">Prediction Result</h3>
            <p className="text-sm mt-2">
              <strong>Class:</strong> {prediction}
            </p>
            <p className="text-sm">
              <strong>Confidence:</strong> {(confidence * 100).toFixed(2)}%
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 text-red-500 text-center">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}
