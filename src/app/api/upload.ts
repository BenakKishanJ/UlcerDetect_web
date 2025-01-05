import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb"; // Your MongoDB connection file
import Image from "@/models/Image"; // Import the Image model

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Connect to the database
    await dbConnect();

    if (req.method === "POST") {
        try {
            // Ensure the userId and imageFile are provided
            const { userId, imageFile } = req.body;

            if (!imageFile || !userId) {
                return res.status(400).json({ message: "Invalid request. Missing file or userId." });
            }

            // Convert the image file to a Buffer (assuming base64-encoded image data from frontend)
            const imageBuffer = Buffer.from(imageFile, "base64");

            // Create a new Image document
            const newImage = new Image({
                userId,
                imageData: imageBuffer,
                timestamp: new Date(),
            });

            // Save the document to MongoDB
            const savedImage = await newImage.save();

            // Respond with a success message and the saved document
            return res.status(201).json({ message: "Image uploaded successfully", image: savedImage });
        } catch (error) {
            console.error("Error uploading image:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}
