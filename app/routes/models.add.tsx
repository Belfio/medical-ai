import {
  ActionFunctionArgs,
  unstable_parseMultipartFormData,
  UploadHandler,
  UploadHandlerPart,
} from "@remix-run/node";
import { ModelType } from "~/lib/types";
import {
  Form,
  json,
  redirect,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import db from "~/lib/db";
import { Button } from "~/components/ui/button";
import { useState } from "react";

import { s3UploaderHandler } from "~/upload.server";

import { AlertCircle } from "lucide-react";
import { randomId } from "~/lib/utils";
import Upload from "~/components/Upload";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import ModelQuestionnaire from "~/components/ModelQuestionnaire";
import ModelUploadSmall from "~/components/UploadSmall";

export default function ModelAdd() {
  const error = useActionData<typeof action>() as {
    error: string;
    missingFields: string[];
  };
  const { datasets, diseases } = useLoaderData<typeof loader>();

  const [files, setFiles] = useState<FileList | null>(null);
  return (
    <>
      <Form
        method="post"
        className="flex flex-col gap-4 max-w-[540px]"
        encType="multipart/form-data"
      >
        <h1>Upload your model</h1>
        {files?.length && files?.length > 0 ? (
          <>
            <ModelQuestionnaire datasets={datasets} diseases={diseases} />
            <ModelUploadSmall
              files={files}
              setFiles={setFiles}
              className="mt-4 w-full"
            />
            <Button type="submit" name="button">
              Submit
            </Button>
            {error && error.error && (
              <p className="text-red-500">{error.error}</p>
            )}
            {error && error.missingFields && (
              <p className="text-red-500">
                Missing fields: {error.missingFields.join(", ")}
              </p>
            )}{" "}
          </>
        ) : (
          <>
            {/* <div className="flex items-center gap-2">
          <CircleAlert className="text-yellow-600 w-12" />
          <p className="text-sm text-yellow-600">
            Please note that the model needs to work on at least one dataset to
            be published. Use one of the existing datasets or add a new one
            <Link to="/datasets-add" className="underline bold">
              here.
            </Link>
          </p>
        </div> */}
            <Upload files={files} setFiles={setFiles} className="mt-6" />

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Supported Formats</AlertTitle>
              <AlertDescription>
                We accept various file types including .py, .pkl, .h5, .pt,
                .onnx, .json, .yaml, and more. Total upload size limit: 5GB
              </AlertDescription>
            </Alert>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">
                Upload Requirements
              </h2>
              <ul className="list-disc pl-5">
                <li>
                  Include all necessary files for your model (e.g., weights,
                  config, preprocessor)
                </li>
                <li>Provide a requirements.txt file for any dependencies</li>
                <li>
                  Include a README.md with instructions on how to use your model
                </li>
                <li>
                  Ensure your files don&apos;t contain sensitive information
                </li>
              </ul>
            </div>
          </>
        )}
      </Form>
    </>
  );
}
export const loader = async () => {
  const datasets = await db.dataset.getByLatest();
  const diseases = await db.disease.getByLatest(100);
  console.log("datasets length", datasets.length);
  return { datasets, diseases };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const modelId = randomId();
  console.log("model id", modelId);
  const s3uploaderWithId: UploadHandler = (props: UploadHandlerPart) =>
    s3UploaderHandler(props, modelId);
  const formData = await unstable_parseMultipartFormData(
    request,
    s3uploaderWithId
  );
  const name = formData.get("name");
  const description = formData.get("description");
  const author = formData.get("author");
  const website = formData.get("website");
  const size = formData.get("size");
  const diseaseIds = formData.get("diseaseId");
  const diseaseCategories = formData.get("diseaseCategories");
  const bodyParts = formData.get("bodyParts");
  const notebookFile = formData.get("notebookFile");
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
