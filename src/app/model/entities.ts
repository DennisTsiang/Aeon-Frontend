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
}
