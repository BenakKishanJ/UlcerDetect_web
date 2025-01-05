import mongoose, { Schema, Document } from 'mongoose';

// Define the image schema
interface IImage extends Document {
    userId: string;         // The ID of the user who uploaded the image
    imageData: Buffer;      // The binary data of the uploaded image
    timestamp: Date;        // The timestamp when the image was uploaded
    prediction?: string;    // The result of the Keras model (optional)
}

// Schema definition for the image collection
const ImageSchema: Schema = new Schema(
    {
        userId: { type: String, required: true },    // Required field for user ID
        imageData: { type: Buffer, required: true },  // Required field for the image data (binary data)
        timestamp: { type: Date, default: Date.now }, // Default to current date and time
        prediction: { type: String },                 // Optional field for storing prediction results
    },
    {
        timestamps: true,  // Automatically include createdAt and updatedAt fields
    }
);

// Create and export the Image model
const Image = mongoose.models.Image || mongoose.model<IImage>('Image', ImageSchema);

export default Image;
