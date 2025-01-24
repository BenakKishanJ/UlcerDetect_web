import ulcerInfo, { UlcerInfo } from "@/lib/ulcerInfo";
import Image from "next/image";

// TypeScript interface for the props of the component
interface PredictionCardProps {
  prediction: keyof UlcerInfo; // Ensure `prediction` is one of the keys in `UlcerInfo`
  confidence: number | null;
  file: File | null;
}

const PredictionResultCard: React.FC<PredictionCardProps> = ({
  prediction,
  confidence,
  file,
}) => {
  const ulcerGradeInfo = ulcerInfo[prediction]; // Access ulcer info for the prediction

  return (
    prediction &&
    confidence !== null &&
    file && (
      <div className="mt-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg flex overflow-hidden">
        {/* Image Section */}
        <div className="w-1/3">
          <Image
            src={URL.createObjectURL(file)}
            alt="Uploaded file"
            width={400}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details Section */}
        <div className="w-2/3 p-6">
          <h3 className="text-2xl font-semibold mb-4">Ulcer Information</h3>

          {ulcerGradeInfo && (
            <>
              {ulcerGradeInfo.type && (
                <p className="text-lg font-medium text-gray-700 mb-2">
                  <strong>Type:</strong> {ulcerGradeInfo.type}
                </p>
              )}

              <p className="text-sm text-gray-600 mb-4">
                <strong>Description:</strong> {ulcerGradeInfo.description}
              </p>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700">
                  <strong>Treatment:</strong>
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {Array.isArray(ulcerGradeInfo.treatment) ? (
                    ulcerGradeInfo.treatment.map(
                      (item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ),
                    )
                  ) : (
                    <li>{ulcerGradeInfo.treatment}</li>
                  )}
                </ul>
              </div>

              {prediction === "Grade 0" && ulcerGradeInfo.care && (
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    <strong>Care:</strong>
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {ulcerGradeInfo.care.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    )
  );
};

export default PredictionResultCard;
