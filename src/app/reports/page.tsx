"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PredictionResultCard from "@/components/utils/PredictionResultCard";
import ulcerInfo, { UlcerInfo } from "@/lib/ulcerInfo";
import { Filter, SortAsc, SortDesc } from "lucide-react";

// Type for the grade mapping
type GradeMapping = {
  [key: string]: string;
};

// Converting Grade numbers to ulcer types
const gradeToTypeMapping: GradeMapping = {
  "Grade 0": "No Ulcer",
  "Grade 1": "Mild Ulcer",
  "Grade 2": "Moderate Ulcer",
  "Grade 3": "Severe Ulcer",
  "Grade 4": "Critical Ulcer",
  "Grade 5": "Life-Threatening Ulcer",
};

interface Report {
  _id: string;
  userId: string;
  username: string;
  prediction: keyof typeof ulcerInfo;
  confidence: number;
  file: {
    data: string;
    name: string;
    type: string;
  };
  date: string;
}

type SortOption = "date" | "prediction";
type SortOrder = "asc" | "desc";

const ReportsPage = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/api/reports");
        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }
        const data = await response.json();
        setReports(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch reports",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleSort = (reports: Report[]): Report[] => {
    return [...reports].sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      } else {
        const gradeA = parseInt(a.prediction.split(" ")[1]);
        const gradeB = parseInt(b.prediction.split(" ")[1]);
        return sortOrder === "desc" ? gradeB - gradeA : gradeA - gradeB;
      }
    });
  };

  const filteredReports = handleSort(
    reports.filter((report) =>
      selectedGrade === "all" ? true : report.prediction === selectedGrade,
    ),
  );

  const toggleSortOrder = () => {
    setSortOrder((current) => (current === "desc" ? "asc" : "desc"));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4 text-center">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Reports</h1>

      {/* Filter Controls */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="w-full sm:w-64">
              <Select
                value={selectedGrade}
                onValueChange={(value) => setSelectedGrade(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  {Object.keys(gradeToTypeMapping).map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade} - {gradeToTypeMapping[grade]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                variant={sortBy === "date" ? "default" : "outline"}
                onClick={() => setSortBy("date")}
                className="flex items-center gap-2"
              >
                {sortOrder === "desc" ? (
                  <SortDesc size={16} />
                ) : (
                  <SortAsc size={16} />
                )}
                Date
              </Button>
              <Button
                variant={sortBy === "prediction" ? "default" : "outline"}
                onClick={() => setSortBy("prediction")}
                className="flex items-center gap-2"
              >
                <Filter size={16} />
                Severity
              </Button>
              <Button
                variant="outline"
                onClick={toggleSortOrder}
                className="flex items-center gap-2"
              >
                {sortOrder === "desc" ? "Newest First" : "Oldest First"}
              </Button>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredReports.length}{" "}
            {filteredReports.length === 1 ? "report" : "reports"}
            {selectedGrade !== "all" && ` for ${selectedGrade}`}
          </div>
        </CardContent>
      </Card>

      {/* Reports Grid */}
      <div className="grid gap-6">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <Card key={report._id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="mb-4 text-sm text-gray-500">
                  <time dateTime={report.date}>
                    {new Date(report.date).toLocaleString()}
                  </time>
                </div>

                {report.file?.data &&
                  report.file?.type.startsWith("image/") && (
                    <PredictionResultCard
                      prediction={report.prediction}
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
                      }
                    />
                  )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            No reports found for the selected criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
