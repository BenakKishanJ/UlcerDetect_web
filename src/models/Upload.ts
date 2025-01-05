import { Schema, model, models } from "mongoose";

const uploadSchema = new Schema({
    userId: { type: String, required: true },
    imagePath: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    date: { type: String, required: true },
    modelResult: {
        prediction: { type: String, required: true },
        confidence: { type: Number, required: true },
    },
    metadata: {
        originalFilename: { type: String, required: true },
        resolution: { type: String },
    },
});

export default models.Upload || model("Upload", uploadSchema);
