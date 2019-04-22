export interface UploadResponse {
  message: string;
  filename: string;
}

export interface GraphData {
  values: number[];
  labels: string[];
}

export type CSVData = [string, number];

export interface EnergyDataResponse {
  hardwareData: CSVData[] | null;
  apiData: CSVData[] | null;
  rating: string;
  percentile: string;
  statementCoverage: string;
  reportFilename: string;
  sourcelineFeedbackFilename: string;
}

export interface EnergyEvaluationRequest {
  filename: string;
  scriptname?: string;
  category: string;
  method: string;
}

export interface ResultsData {
  hardwareData: GraphData;
  apiData: GraphData;
  truncatedTotalEnergy: string;
  rating: string;
  ratingClass: string;
  percentile: string;
  levelIndicator: string;
  statementCoverage: string;
  reportFilename: string;
  sourcelineFeedbackFilename: string;
}

export interface FilePathObject {
  apps: string[];
  scripts: string[];
}
