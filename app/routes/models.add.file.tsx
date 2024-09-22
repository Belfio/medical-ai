import {
  ActionFunctionArgs,
  UploadHandler,
  UploadHandlerPart,
  unstable_parseMultipartFormData,
  json,
  redirect,
} from "@remix-run/node";
import db from "~/lib/db";
import { ModelType } from "~/lib/types";
import { randomId } from "~/lib/utils";
import { s3UploaderHandler } from "~/upload.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log("model add file");
  const modelId = randomId();
  console.log("model id", modelId);
  const s3uploaderWithId: UploadHandler = (props: UploadHandlerPart) =>
    s3UploaderHandler(props, modelId);
  const formData = await unstable_parseMultipartFormData(
    request,
    s3uploaderWithId
  );
  const notebookFile = formData.getAll("notebookFile");

  console.log("notebookFile", notebookFile);
  return redirect("/models");
  const name = formData.get("name");
  const description = formData.get("description");
  const author = formData.get("author");
  const website = formData.get("website");
  const size = formData.get("size");
  const diseaseIds = formData.get("diseaseId");
  const diseaseCategories = formData.get("diseaseCategories");
  const bodyParts = formData.get("bodyParts");
  const modelFile = formData.get("modelFile");
  const dataType = formData.get("dataType");
  const datasetIds = formData.get("datasetIds");
  if (
    !name ||
    !description ||
    !author ||
    !notebookFile ||
    !diseaseIds ||
    !diseaseCategories ||
    !dataType ||
    !datasetIds
  ) {
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!description) missingFields.push("description");
    if (!author) missingFields.push("author");
    if (!diseaseIds) missingFields.push("diseaseIds");
    if (!diseaseCategories) missingFields.push("diseaseCategories");
    if (!notebookFile) missingFields.push("notebookFile");
    if (!dataType) missingFields.push("dataType");
    if (!datasetIds) missingFields.push("datasetIds");
    return json(
      { error: `Missing fields: ${missingFields.join(", ")}` },
      { status: 400 }
    );
  }

  // create the object dataset to save in the table dataset
  const model: ModelType = {
    modelId: modelId,
    name: name as string,
    description: description as string,
    createdAt: new Date().toISOString(),
    ranking: 0,
    notebookFile: notebookFile as string,
    modelFile: modelFile as string,
    website: website as string,
    tConst: "metadata",
    diseaseIds: diseaseIds as string,
    bodyParts: bodyParts as string,
    userId: "1",
    author: author as string,
    size: size as string,
    datasetIds: datasetIds as string,
    diseaseCategory: diseaseCategories as string,
    dataType: dataType as string,
  };
  await db.model.create(model);

  return redirect("/models");
};
