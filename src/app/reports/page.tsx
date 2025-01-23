"use client";
import React, { useEffect, useState } from "react";

interface Report {
  _id: string;
  userId: string;
  username: string;
  prediction: string;
  confidence: number;
  file: {
    data: string; // Assuming it's base64 encoded or binary
    name: string;
    type: string; // e.g., "image/png"
  };
  date: string;
}

const ReportsPage = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/api/reports");
        if (!response.ok) {
          throw new Error("Failed to fetch reports.");
        }
        const data = await response.json();
        setReports(data);
        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong.");
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <h1 style={{ width: "100%" }}>Reports</h1>
      {reports.map((report) => (
        <div
          key={report._id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
            width: "300px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Image */}
          {report.file?.data && report.file?.type.startsWith("image/") && (
            <img
              src={`data:${report.file.type};base64,${report.file.data}`}
              alt={report.file.name}
              style={{ width: "100%", borderRadius: "4px" }}
            />
          )}
          {/* Report Details */}
          <div style={{ marginTop: "1rem" }}>
            <p>
              <strong>Prediction:</strong> {report.prediction}
            </p>
            <p>
              <strong>Confidence:</strong> {report.confidence}%
            </p>
            <p>
              <strong>Uploaded by:</strong> {report.username}
            </p>
            <p>
              <strong>Date:</strong> {new Date(report.date).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportsPage;
