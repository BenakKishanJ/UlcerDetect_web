from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

# Your existing model imports
import tensorflow as tf
from PIL import Image
import numpy as np

app = Flask(__name__)

# Enable CORS for all domains
CORS(app)

# Load your model
model = tf.keras.models.load_model('/home/benki/Projects/UlcerApp/ulcer_detect/tensorflow_model/DenseNet121.keras')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the image from the request
        file = request.files['file']
        if not file:
            return jsonify({"error": "No file uploaded"}), 400

        # Process the image
        image = Image.open(file).convert('RGB')
        image = image.resize((224, 224))  # Resize the image to match model input size
        image_array = np.array(image) / 255.0
        image_array = np.expand_dims(image_array, axis=0)

        # Make prediction
        predictions = model.predict(image_array)
        predicted_class = np.argmax(predictions, axis=1)[0]
        confidence = np.max(predictions)

        # Return the result
        return jsonify({
            "class": int(predicted_class),
            "confidence": float(confidence)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
