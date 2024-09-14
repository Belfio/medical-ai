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
  bodyParts: string;
  inputDataTypes: string;
  userId: string;
  author: string;
  size: string;
  description: string;
  notebookFile: string;
  website: string;
  modelType: string;
  modelFile: string;
  test?: ModelTestType;
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
  bodyParts: string;
  types: string;
  createdAt: string;
  ranking: number;
  tConst: "metadata";
  dataType: string;
  diseaseIds: string;
  userId: string;
  description: string;
  downloadUrl: string;
  website: string;
  author: string;
  size: string;
  diseaseCategory: string;
  bodyFocus: string;
  name: string;
}
