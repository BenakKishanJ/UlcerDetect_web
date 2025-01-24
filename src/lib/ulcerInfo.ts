import ulcerInfoJson from "./ulcerInfoJson.json";

export interface UlcerGradeInfo {
  type?: string;
  description: string;
  treatment: string | string[];
  care?: string[];
}

export interface UlcerInfo {
  "Grade 0": UlcerGradeInfo;
  "Grade 1": UlcerGradeInfo;
  "Grade 2": UlcerGradeInfo;
  "Grade 3": UlcerGradeInfo;
  "Grade 4": UlcerGradeInfo;
  "Grade 5": UlcerGradeInfo;
}

// Add TypeScript typing to the imported JSON
const ulcerInfo = ulcerInfoJson as unknown as UlcerInfo;

export default ulcerInfo;
