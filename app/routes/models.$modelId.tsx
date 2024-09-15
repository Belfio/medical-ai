import { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import db from "~/lib/db";

export default function ModelPage() {
  const model = useLoaderData<typeof loader>();

  if (!model) {
    return <div>Model not found</div>;
  }

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Model: {model.modelId}</h1>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">{model.name}</h2>
          <p className="card-subtitle">{model.description}</p>
        </div>
        <div className="card-body">
          <h3 className="text-lg font-medium">Details</h3>
          <p>Author: {model.author}</p>
          <p>Created At: {new Date(model.createdAt).toLocaleDateString()}</p>
          <p>Website: {model.website}</p>
          <p>Size: {model.size || "N/A"}</p>
          <p>Data Type: {JSON.parse(model.dataType).join(", ")}</p>
          <p>Notebook File: {model.notebookFile}</p>
          <p>Model File: {model.modelFile}</p>
          <p>Ranking: {model.ranking}</p>
          <p>User ID: {model.userId}</p>
          <h3 className="text-lg font-medium">Body Parts</h3>
          <ul>
            {JSON.parse(model.bodyParts).map((part, index) => (
              <li key={index}>{part}</li>
            ))}
          </ul>
          <h3 className="text-lg font-medium">Disease Categories</h3>
          <ul>
            {JSON.parse(model.diseaseCategory).map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
          <h3 className="text-lg font-medium">Dataset IDs</h3>
          <ul>
            {JSON.parse(model.datasetIds).map((id, index) => (
              <li key={index}>{id}</li>
            ))}
          </ul>
          <h3 className="text-lg font-medium">Disease IDs</h3>
          <ul>
            {model.diseaseIds.length > 0 ? (
              JSON.parse(model.diseaseIds).map((id: string, index: number) => (
                <li key={index}>{id}</li>
              ))
            ) : (
              <li>No disease IDs</li>
            )}
          </ul>
          {model.training && (
            <>
              <h3 className="text-lg font-medium">Training Details</h3>
              <p>Date: {model.training.date}</p>
              <p>DataSet ID: {model.training.dataSetId}</p>
              <p>DataSet Name: {model.training.dataSetName}</p>
              <p>Training Error: {model.training.trainingError}</p>
              <p>Training Accuracy: {model.training.trainingAccuracy}</p>
            </>
          )}
          {model.testing && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.modelId) {
    return new Response("Model ID is required", { status: 400 });
  }
  try {
    const model = await db.model.get(params.modelId);
    if (!model) {
      return new Response("Model not found", { status: 404 });
    }
    return json(model);
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
