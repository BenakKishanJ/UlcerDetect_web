import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { currentUser } from "@clerk/nextjs/server";

export const GET = async (req: NextRequest) => {
  try {
    const client = await clientPromise;
    const db = client.db("ulcer-detection");
    const collection = db.collection("reports");

    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json(
        { error: "Authentication required. User not found." },
        { status: 401 },
      );
    }

    // Fetch reports for the authenticated user
    const reports = await collection
      .find({ userId: user.id })
      .sort({ date: -1 }) // Order by most recent
      .toArray();

    return NextResponse.json(reports, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/reports:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { prediction, confidence, file } = body;

    const user = await currentUser();
    if (!user || !user.id) {
      return NextResponse.json(
        { error: "Authentication required. User not found." },
        { status: 401 },
      );
    }

    const userId = user.id; // Clerk user ID
    const username =
      user.username || user.emailAddresses[0]?.emailAddress || "Unknown";

    // Ensure database connection
    const client = await clientPromise;
    const db = client.db("ulcer-detection");

    // Check if `reports` collection exists, create if not
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((col) => col.name);

    if (!collectionNames.includes("reports")) {
      await db.createCollection("reports");
      console.log("Created `reports` collection");
    }

    const collection = db.collection("reports");

    // Insert the new report
    const result = await collection.insertOne({
      userId,
      username,
      file,
      prediction,
      confidence,
      date: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Report successfully created", reportId: result.insertedId },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error in POST /api/reports:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
