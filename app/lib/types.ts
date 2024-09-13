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
  modelId: string;
  createdAt: string;
  ranking: number;
  tConst: "metadata";
  diseaseId: string;
  bodyParts: string;
  types: string;
  userId: string;
  author: string;
  size: string;
  description: string;
  downloadUrl: string;
  website: string;
  modelType: string;
}

export interface DatasetType {
  datasetId: string;
  bodyParts: string;
  types: string;
  createdAt: string;
  ranking: number;
  tConst: "metadata";
  dataType: string;
  diseaseId: string;
  userId: string;
  description: string;
  downloadUrl: string;
  website: string;
  author: string;
  size: string;
}
