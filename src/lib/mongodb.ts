import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string || "mongodb+srv://admin:drait123@cluster0.bvtgy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URI, { bufferCommands: false })
            .then((mongooseInstance) => mongooseInstance);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;
