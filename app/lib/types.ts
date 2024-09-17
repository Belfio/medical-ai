import { bodyFocus, bodyParts, dataTypes } from "./const";

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
  modelFile: string;
  test?: ModelTestingType;
  training?: ModelTrainingType;
  datasetIds?: string;
  diseaseCategory: string;
}

export interface ModelTestingType {
  generalScore: number;
  tests: ModelTestType[];
}

export interface ModelTrainingType extends ModelTestType {
  generalScore: number;
}

export interface ModelTestType {
  datasetId: string;
  datasetName: string;
  score: number;
  date: string;
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
  diseaseCategory: string;
  bodyFocus: (typeof bodyFocus)[number];
  name: string;
  instructions: string;
}

export interface FiltersType {
  dataTypes: string[];
  bodyParts: string[];
  diseases: string[];
}
