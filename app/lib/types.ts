import { bodyFocus, bodyParts, categories, dataTypes } from "./const";

export interface ResponseType {
  isSuccess: boolean;
  msg: string;
}

export interface UserType {
  userId: string;
  email: string;
  name: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ModelType {
  name: string;
  modelId: string;
  createdAt: string;
  ranking: number;
  tConst: "metadata";
  diseaseIds: string;
  bodyParts: (typeof bodyParts)[number];
  dataType: (typeof dataTypes)[number];
  userId: string;
  author: string;
  size: string;
  description: string;
  notebookFile: string;
  website: string;
  modelType: string;
  modelFile: string;
  test?: ModelTestType;
  datasetIds?: string;
  diseaseCategory: (typeof categories)[number];
}

export interface ModelTestType {
  generalScore: number;
  tests: {
    datasetId: string;
    datasetName: string;
    score: number;
  }[];
  sizeMB: number;
}

export interface DatasetType {
  datasetId: string;
  types: string;
  createdAt: string;
  ranking: number;
  tConst: "metadata";
  diseaseIds: string;
  bodyParts: (typeof bodyParts)[number];
  dataType: (typeof dataTypes)[number];
  userId: string;
  description: string;
  downloadUrl: string;
  website: string;
  author: string;
  size: string;
  diseaseCategory: (typeof categories)[number];
  bodyFocus: (typeof bodyFocus)[number];
  name: string;
}

export interface FiltersType {
  dataTypes: string[];
  bodyParts: string[];
  diseases: string[];
}
