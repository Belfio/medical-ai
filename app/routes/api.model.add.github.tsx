import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import db from "~/lib/db";
import { DatasetType, ModelType } from "~/lib/types";
import { randomId } from "~/lib/utils";

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log("model add github");
  const modelId = randomId();
  const formData = await request.formData();

  const name = formData.get("name");
  const description = formData.get("description");
  const author = formData.get("author");
  const website = formData.get("website");

  const datasetIds: string[] = JSON.parse(formData.get("datasetIds") as string);
  if (!name || !description || !author || !datasetIds) {
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!description) missingFields.push("description");
    if (!author) missingFields.push("author");
    if (!datasetIds) missingFields.push("datasetIds");
    return json(
      { error: `Missing fields: ${missingFields.join(", ")}` },
      { status: 400 }
    );
  }

  let datasets: DatasetType[] = [];

  await Promise.all(
    datasetIds.map(async (datasetId) => {
      const dataset = await db.dataset.get(datasetId);
      if (!dataset) return;
      datasets = [...datasets, dataset];
    })
  );
  if (!datasets) {
    return json({ error: `Datasets not found` }, { status: 400 });
  }

  const diseaseCategories = Array.from(
    new Set(
      datasets.map((dataset) => JSON.parse(dataset.diseaseCategory)).flat()
    )
  );
  const bodyParts = Array.from(
    new Set(datasets.map((dataset) => JSON.parse(dataset.bodyParts)).flat())
  );
  const dataType = Array.from(
    new Set(datasets.map((dataset) => JSON.parse(dataset.dataType)).flat())
  );
  const diseaseIds = Array.from(
    new Set(datasets.map((dataset) => JSON.parse(dataset.diseaseIds)).flat())
  );
  // create the object dataset to save in the table dataset
  const model: ModelType = {
    modelId: modelId,
    name: name as string,
    description: description as string,
    createdAt: new Date().toISOString(),
    ranking: 0,
    website: website as string,
    tConst: "metadata",
    diseaseIds: JSON.stringify(diseaseIds) as string,
    bodyParts: JSON.stringify(bodyParts) as string,
    userId: "1",
    author: author as string,
    size: "na" as string,
    datasetIds: JSON.stringify(datasetIds),
    diseaseCategory: JSON.stringify(diseaseCategories) as string,
    dataType: JSON.stringify(dataType) as string,
    statusTesting: "PENDING",
  };

  console.log("new model", model);
  await db.model.create(model);

  return redirect("/models");
};
