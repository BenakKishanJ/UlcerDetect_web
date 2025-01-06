import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../lib/mongodb";
import Image from "../../models/Image";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            // Ensure we are connected to the database
            await dbConnect();

            // Get the form data from the body
            const { userId, imageFile } = req.body;

            if (!userId || !imageFile) {
                return res.status(400).json({ message: "User ID and image file are required." });
            }

            // Create a new image record in the database
            const newImage = new Image({
                userId,
                imageData: imageFile,  // Base64 encoded image
                timestamp: new Date(),
                date: new Date(),
            });

            // Save the image record
            await newImage.save();

            return res.status(200).json({ message: "Image uploaded successfully", image: newImage });
        } catch (error) {
            console.error("Error uploading image:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}
