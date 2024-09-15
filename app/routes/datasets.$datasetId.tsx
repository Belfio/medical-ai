import { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import db from "~/lib/db";
import { DatasetType } from "~/lib/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

export default function DatasetPage() {
  const dataset = useLoaderData<typeof loader>() as DatasetType;

  if (!dataset) {
    return <div>Dataset not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Dataset: {dataset.datasetId}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{dataset.name}</CardTitle>
          {dataset.description}
        </CardHeader>
        <CardContent>
          <h2 className="text-lg font-medium mt-4">Details</h2>
          <ul className="space-y-2">
            <li>
              <strong>Author:</strong> {dataset.author}
            </li>
            <li>
              <strong>Created At:</strong>{" "}
              {new Date(dataset.createdAt).toLocaleDateString()}
            </li>
            <li>
              <strong>Website:</strong>{" "}
              <a
                href={dataset.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {dataset.website}
              </a>
            </li>
            <li>
              <strong>Size:</strong> {dataset.size || "N/A"}
            </li>
            <li>
              <strong>Data Type:</strong>{" "}
              {/* {JSON.parse(dataset.dataType).join(", ")} */}
            </li>
            <li>
              <strong>Dataset File:</strong>{" "}
              <a
                href={dataset.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Download
              </a>
            </li>
            <li>
              <strong>Ranking:</strong> {dataset.ranking}
            </li>
            <li>
              <strong>User ID:</strong> {dataset.userId}
            </li>
            <li>
              <strong>Instructions:</strong> {dataset.instructions}
            </li>
            <li>
              <strong>Body Focus:</strong> {JSON.parse(dataset.bodyFocus)}
            </li>
          </ul>

          <h2 className="text-lg font-medium mt-6">Body Parts</h2>
          <ul className="list-disc list-inside">
            {JSON.parse(dataset.bodyParts).map(
              (part: string, index: number) => (
                <li key={index}>{part}</li>
              )
            )}
          </ul>

          <h2 className="text-lg font-medium mt-6">Disease Categories</h2>
          <ul className="list-disc list-inside">
            {JSON.parse(dataset.diseaseCategory).map(
              (category: string, index: number) => (
                <li key={index}>{category}</li>
              )
            )}
          </ul>

          <h2 className="text-lg font-medium mt-6">Disease IDs</h2>
          <ul className="list-disc list-inside">
            {dataset.diseaseIds.length > 0 ? (
              JSON.parse(dataset.diseaseIds).map(
                (id: string, index: number) => <li key={index}>{id}</li>
              )
            ) : (
              <li>No disease IDs</li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.datasetId) {
    return new Response("Dataset ID is required", { status: 400 });
  }
  try {
    const dataset = await db.dataset.get(params.datasetId);
    if (!dataset) {
      return new Response("Dataset not found", { status: 404 });
    }
    return json(dataset);
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
