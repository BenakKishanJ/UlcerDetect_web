import { MongoClient, MongoClientOptions } from "mongodb";

// Check if the MongoDB URI is set in the environment
if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

const uri: string = process.env.MONGODB_URI;
const options: MongoClientOptions = {};

// Global variable to cache the MongoDB client promise during development
let clientPromise: Promise<MongoClient>;

declare global {
  // Allow global cache only in development
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient>;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

