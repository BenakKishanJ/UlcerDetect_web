"use client";

import React, { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setPrediction(null); // Reset prediction on new upload
      setConfidence(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setError("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

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
    }
  };

  return (
      <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
        <h1>Image Classifier</h1>
        <p>Upload an image to get predictions from the model.</p>

        <div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        {preview && (
            <div style={{ marginTop: "1rem" }}>
              <img
                  src={preview}
                  alt="Preview"
                  style={{
                    maxWidth: "300px",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
              />
            </div>
        )}

        <div style={{ marginTop: "1rem" }}>
          <button
              onClick={handleUpload}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#0070f3",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
          >
            Upload and Predict
          </button>
        </div>

        {error && (
            <div style={{ marginTop: "1rem", color: "red" }}>
              <strong>Error:</strong> {error}
            </div>
        )}

        {prediction && confidence !== null && (
            <div style={{ marginTop: "1rem", color: "#333" }}>
              <h3>Prediction:</h3>
              <p>
                <strong>Class:</strong> {prediction}
              </p>
              <p>
                <strong>Confidence:</strong> {(confidence * 100).toFixed(2)}%
              </p>
            </div>
        )}
      </div>
  );
}
