import mongoose, { Document, Schema } from "mongoose";

interface ImageDocument extends Document {
    userId: string;
    imageData: string; // The base64 string of the image
    timestamp: Date;
    date: Date;
}

const ImageSchema = new Schema<ImageDocument>(
    {
        userId: { type: String, required: true },
        imageData: { type: String, required: true }, // Base64 encoded image
        timestamp: { type: Date, default: Date.now },
        date: { type: Date, default: Date.now },
    },
    { collection: "Image" } // Explicitly specify the collection name
);

const Image = mongoose.models.Image || mongoose.model<ImageDocument>("Image", ImageSchema);

export default Image;
