import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Trash } from "lucide-react";
import PythonEditor from "~/components/PythonEditor";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import db from "~/lib/db";
import { ModelTestType, ModelType } from "~/lib/types";
import ds from "~/server/model.server";

export default function ModelPage() {
  const model = useLoaderData<ModelType>();

  if (!model) {
    return <>Something went wrong</>;
  }
  console.log("model", model);

  return (
    <>
      <div className="flex flex-row gap-2 max-w-screen-lg justify-between">
        <div className="w-1/2 flex-col space-y-8">
          <div className="flex items-baseline gap-2">
            <h1 className="text-4xl font-bold">{model.name}</h1>
            {/* <Badge>{model.modelId}</Badge> */}
            <Form method="POST" className="">
              <Link to={`/models/${model.modelId}/edit`}>
                <Button variant="link">Edit</Button>
              </Link>
              <input type="hidden" name="modelId" value={model.modelId} />
            </Form>
          </div>
          <p>{model.description}</p>
        </div>
        <Button
          type="submit"
          name="remove"
          value={model.modelId}
          className="mt-2"
          variant="outline"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>

      <div className="max-w-screen-lg my-4">
        <h2 className="text-2xl font-bold my-2">Testing code</h2>
        <PythonEditor />
      </div>
      <Form method="POST" className="flex gap-2">
        <Button name="action" value="testing">
          Testing
        </Button>
        <input type="hidden" name="modelId" value={model.modelId} />
      </Form>
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
            {/* <p>Data Type: {JSON.parse(model.dataType).join(", ")}</p> */}
            <p>Ranking: {model.ranking}</p>
            <p>User ID: {model.userId}</p>
            <h3 className="text-lg font-medium">Body Parts</h3>
            <ul>
              {JSON.parse(model.bodyParts).map(
                (part: string, index: number) => (
                  <li key={index}>{part}</li>
                )
              )}
            </ul>
            <h3 className="text-lg font-medium">Disease Categories</h3>
            <ul>
              {JSON.parse(model.diseaseCategory).map(
                (category: string, index: number) => (
                  <li key={index}>{category}</li>
                )
              )}
            </ul>
            <h3 className="text-lg font-medium">Dataset IDs</h3>
            <ul>
              {JSON.parse(model.datasetIds || "[]").map(
                (id: string, index: number) => (
                  <li key={index}>{id}</li>
                )
              )}
            </ul>
            <h3 className="text-lg font-medium">Disease IDs</h3>
            <ul>
              {model.diseaseIds.length > 0 ? (
                JSON.parse(model.diseaseIds || "[]").map(
                  (id: string, index: number) => <li key={index}>{id}</li>
                )
              ) : (
                <li>No disease IDs</li>
              )}
            </ul>
            {model.training && (
              <>
                <h3 className="text-lg font-medium">Training Details</h3>
                <p>Date: {model.training.date}</p>
                <p>DataSet ID: {model.training.datasetId}</p>
                <p>DataSet Name: {model.training.datasetName}</p>
                <p>Training Error: {model.training.score}</p>
                <p>Training Accuracy: {model.training.score}</p>
              </>
            )}
            {model.test && (
              <>
                <h3 className="text-lg font-medium">Testing Details</h3>
                {model.test?.tests.map((test: ModelTestType, index: number) => (
                  <div key={index}>
                    <p>Date: {test.date}</p>
                    <p>DataSet ID: {test.datasetId}</p>
                    <p>DataSet Name: {test.datasetName}</p>
                    <p>Testing Error: {test.score}</p>
                    <p>Testing Accuracy: {test.score}</p>
                  </div>
                ))}
                <h3 className="text-lg font-medium">Overall Testing Score</h3>
                <p>{model.test?.generalScore}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const remove = formData.get("remove");
  const modelId = formData.get("modelId");
  console.log("remove", remove);
  console.log("modelId", modelId);
  if (remove && modelId) {
    console.log("removing model");
    await db.model.delete(modelId as string);
    return redirect(`/models`);
  }
  const action = formData.get("action");
  if (action === "testing") {
    console.log("testing model");
    const s3Path = modelId + "/" + "prova.ipynb";
    console.log("s3Path", s3Path);
    await ds.testModel(s3Path);
  }
  return redirect(`/models/${modelId}`);
};

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
