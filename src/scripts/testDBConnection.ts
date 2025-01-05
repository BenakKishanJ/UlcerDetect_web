// testDbConnection.ts
import dbConnect from "/home/benki/Projects/UlcerApp/ulcer_detect/src/lib/mongodb"; // Update with the actual path to mongodb.ts

async function testDbConnection() {
    try {
        const connection = await dbConnect();
        console.log("🚀 Database connected successfully!");
        console.log("Database Name:", connection.connection.name); // Optional: Log database name
        process.exit(0); // Exit the script successfully
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1); // Exit the script with an error code
    }
}

testDbConnection();
