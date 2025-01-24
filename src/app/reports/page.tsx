"use client";
import React, { useEffect, useState } from "react";
import PredictionResultCard from "@/components/utils/PredictionResultCard"; // Import the PredictionResultCard component
import ulcerInfo, { UlcerInfo } from "@/lib/ulcerInfo";

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
  const [filterOption, setFilterOption] = useState<"date" | "type" | null>(
    null,
  ); // Current filter option
  const [dateOrder, setDateOrder] = useState<"asc" | "desc">("desc"); // Date order (latest first by default)
  const [selectedType, setSelectedType] = useState<string | null>(null); // Selected ulcer type for filter
  const [sortBy, setSortBy] = useState<"date" | "prediction">("date"); // Sort by date or prediction
  const ulcerGrades: Record<string, number> = {
    "Life-Threatening Ulcer": 5,
    "Critical Ulcer": 4,
    "Severe Ulcer": 3,
    "Moderate Ulcer": 2,
    "Mild Ulcer": 1,
    "No Ulcer": 0,
  };

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

  const handleSort = (a: Report, b: Report) => {
    if (sortBy === "date") {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateOrder === "desc"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    } else if (sortBy === "prediction") {
      return a.prediction.localeCompare(b.prediction);
    }
    return 0;
  };

  const filteredReports = reports
    .filter((report) => {
      // Filter by Type (Ulcer grade)
      if (selectedType) {
        return ulcerGrades[report.prediction] === ulcerGrades[selectedType];
      }
      return true;
    })
    .sort(handleSort);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h1 style={{ width: "100%" }}>Reports</h1>

      {/* Filter Controls */}
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() =>
            setFilterOption(filterOption === "date" ? null : "date")
          }
          style={{
            padding: "0.5rem",
            borderRadius: "4px",
            marginRight: "1rem",
          }}
        >
          Filter by Date
        </button>
        <button
          onClick={() =>
            setFilterOption(filterOption === "type" ? null : "type")
          }
          style={{ padding: "0.5rem", borderRadius: "4px" }}
        >
          Filter by Type
        </button>

        {/* Show date ordering options if Date is selected */}
        {filterOption === "date" && (
          <div style={{ marginTop: "1rem" }}>
            <button
              onClick={() =>
                setDateOrder(dateOrder === "desc" ? "asc" : "desc")
              }
              style={{
                padding: "0.5rem",
                borderRadius: "4px",
                marginRight: "1rem",
              }}
            >
              {dateOrder === "desc" ? "Oldest First" : "Latest First"}
            </button>
          </div>
        )}

        {/* Show type selection buttons if Type is selected */}
        {filterOption === "type" && (
          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
            {Object.keys(ulcerGrades).map((type) => (
              <button
                key={type}
                onClick={() =>
                  setSelectedType(selectedType === type ? null : type)
                }
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  backgroundColor:
                    selectedType === type ? "#007bff" : "#f0f0f0",
                  color: selectedType === type ? "#fff" : "#000",
                  border: "1px solid #ccc",
                }}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Render filtered and sorted reports */}
      {filteredReports.map((report) => (
        <div
          key={report._id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
            width: "100%", // Full width for a single report per row
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Display Date */}
          <div
            style={{
              fontSize: "0.9rem",
              color: "#888",
              marginBottom: "1rem",
            }}
          >
            <strong>{new Date(report.date).toLocaleString()}</strong>
          </div>

          {/* Use PredictionResultCard to display the report */}
          {report.file?.data && report.file?.type.startsWith("image/") && (
            <PredictionResultCard
              prediction={report.prediction as keyof typeof ulcerInfo} // Ensure prediction is a valid key from `ulcerInfo`
              confidence={report.confidence}
              file={
                new File(
                  [
                    new Blob([
                      new Uint8Array(
                        atob(report.file.data)
                          .split("")
                          .map((c) => c.charCodeAt(0)),
                      ),
                    ]),
                  ],
                  report.file.name,
                  { type: report.file.type },
                )
              } // Convert base64 string to a File object
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ReportsPage;
