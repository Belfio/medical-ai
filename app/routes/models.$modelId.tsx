import { useParams } from "@remix-run/react";

export default function ModelPage() {
  const { modelId } = useParams();

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Model: {modelId}</h1>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">{model.name}</h2>
          <p className="card-subtitle">{model.description}</p>
        </div>
        <div className="card-body">
          <h3 className="text-lg font-medium">Target Diseases</h3>
          <ul>
            {model.targetDiseases.map((disease, index) => (
              <li key={index}>{disease}</li>
            ))}
          </ul>
          <h3 className="text-lg font-medium">Input Data</h3>
          <ul>
            {model.inputData.map((data, index) => (
              <li key={index}>{data}</li>
            ))}
          </ul>
          <h3 className="text-lg font-medium">Training Details</h3>
          <p>Date: {model.training.date}</p>
          <p>DataSet ID: {model.training.dataSetId}</p>
          <p>DataSet Name: {model.training.dataSetName}</p>
          <p>Training Error: {model.training.trainingError}</p>
          <p>Training Accuracy: {model.training.trainingAccuracy}</p>
          <h3 className="text-lg font-medium">Testing Details</h3>
          {model.testing.map((test, index) => (
            <div key={index}>
              <p>Date: {test.date}</p>
              <p>DataSet ID: {test.dataSetId}</p>
              <p>DataSet Name: {test.dataSetName}</p>
              <p>Testing Error: {test.testingError}</p>
              <p>Testing Accuracy: {test.testingAccuracy}</p>
            </div>
          ))}
          <h3 className="text-lg font-medium">Overall Testing Score</h3>
          <p>{model.testingScore}</p>
        </div>
      </div>
    </div>
  );
}

export function loader() {
  return model;
}

const model = {
  id: "poba",
  name: "POBA",
  description: "POBA is a model that predicts the price of Bitcoin.",
  targetDiseases: [
    {
      id: 1,
      name: "Covid19",
      testingScore: 0.99,
    },
    {
      id: 2,
      name: "Influenza",
      testingScore: 0.79,
    },
    {
      id: 3,
      name: "RSV",
      testingScore: 0.98,
    },
  ],
  inputData: ["Symptoms", "Age", "Gender", "Pre-existing conditions"],
  training: {
    date: "2024-02-01",
    dataSetId: "5345234k",
    dataSetName: "POBA Dataset",
    trainingError: 0.01,
    trainingAccuracy: 0.99,
  },
  testing: [
    {
      date: "2024-02-01",
      dataSetId: "5345234k",
      dataSetName: "POBA Dataset",
      testingError: 0.01,
      testingAccuracy: 0.99,
    },
    {
      date: "2024-02-01",
      dataSetId: "5345234k",
      dataSetName: "POBA Dataset",
      testingError: 0.01,
      testingAccuracy: 0.99,
    },
    {
      date: "2024-02-01",
      dataSetId: "5345234k",
      dataSetName: "POBA Dataset",
      testingError: 0.01,
      testingAccuracy: 0.99,
    },
  ],
  testingScore: 0.99,
  sizeMB: 100,
};
