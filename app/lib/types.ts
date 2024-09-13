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
  modelType: string;
  userId: string;
}

export interface DatasetType {
  datasetId: string;
  createdAt: string;
  ranking: number;
  tConst: "metadata";
  dataType: string;
  diseaseId: string;
  userId: string;
  description: string;
  downloadUrl: string;
}
