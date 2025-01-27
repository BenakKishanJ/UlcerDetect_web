import ulcerInfoJson from "./ulcerInfoJson.json";

export interface UlcerGradeInfo {
  type?: string;
  description: string;
  treatment: string | string[];
  care?: string[];
}

// Define keys explicitly as "Grade 0" to "Grade 5"
export interface UlcerInfo {
  "Grade 0": UlcerGradeInfo;
  "Grade 1": UlcerGradeInfo;
  "Grade 2": UlcerGradeInfo;
  "Grade 3": UlcerGradeInfo;
  "Grade 4": UlcerGradeInfo;
  "Grade 5": UlcerGradeInfo;
}

// Add TypeScript typing to the imported JSON
const ulcerInfo: UlcerInfo = ulcerInfoJson as UlcerInfo;

export default ulcerInfo;
