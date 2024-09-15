import {
  ActionFunctionArgs,
  unstable_parseMultipartFormData,
  UploadHandler,
  UploadHandlerPart,
} from "@remix-run/node";
import { DatasetType, ModelType } from "~/lib/types";
import {
  Form,
  json,
  Link,
  redirect,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import db from "~/lib/db";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { MultiSelectorComplete } from "~/components/ui/multicombo";
import { useState } from "react";
import { Textarea } from "~/components/ui/textarea";
import { s3UploaderHandler } from "~/upload.server";
import { bodyParts, categories, dataTypes, diseases } from "~/lib/const";
import { CircleAlert } from "lucide-react";
import { randomId } from "~/lib/utils";

export default function ModelAdd() {
  const data = useActionData<typeof action>() as {
    error: string;
    missingFields: string[];
  };
  const { datasets } = useLoaderData<typeof loader>();
  const [diseasesSelected, setDiseases] = useState<string[]>([]);
  const [typesSelected, setTypes] = useState<string[]>([]);
  const [bodyPartsSelected, setBodyParts] = useState<string[]>([]);
  const [selDisCategories, setCategories] = useState<string[]>([]);
  const [selectedDatasets, setDatasets] = useState<string[]>([]);

  return (
    <>
      <Form
        method="post"
        className="flex flex-col gap-4 max-w-[540px]"
        encType="multipart/form-data"
      >
        <h2>Model Details</h2>
        <div className="flex items-center gap-2">
          <CircleAlert className="text-yellow-600 w-12" />
          <p className="text-sm text-yellow-600">
            Please note that the model needs to work on at least one dataset to
            be published. Use one of the existing datasets or add a new one{" "}
            <Link to="/datasets-add" className="underline bold">
              here.
            </Link>
          </p>
        </div>
        {/* Name */}
        <Input
          className=""
          type="text"
          name="name"
          placeholder="Name"
          required
        />
        {/* Description */}
        <Textarea
          name="description"
          placeholder="Description"
          className="resize-none"
          required
        />
        {/* Author */}
        <Input
          className=""
          type="text"
          name="author"
          placeholder="Author"
          required
        />
        {/* Website */}
        <Input
          className=""
          type="text"
          name="website"
          placeholder="Website (optional)"
        />
        <h2 className="mt-8">Clinical target</h2>
        {/* Disease Category */}
        <MultiSelectorComplete
          values={selDisCategories}
          placeholder="Select Disease Category"
          options={categories.map((category) => ({
            label: category.categoryName,
            value: category.categoryId.toString(),
          }))}
          onValuesChange={setCategories}
        />
        {/* Diseases */}
        <MultiSelectorComplete
          values={diseasesSelected}
          placeholder="Select Specific Diseases (optional)"
          options={
            selDisCategories.length > 0
              ? diseases
                  .filter(
                    (disease) =>
                      String(disease.categoryId) === selDisCategories[0]
                  )
                  .map((disease) => ({
                    label: disease.name,
                    value: String(disease.id),
                  }))
              : diseases.map((disease) => ({
                  label: disease.name,
                  value: String(disease.id),
                }))
          }
          onValuesChange={setDiseases}
        />

        <h2 className="mt-8">Data information</h2>
        {/* Datasets */}
        <MultiSelectorComplete
          values={selectedDatasets}
          placeholder="Select the dataset to test this model"
          options={datasets.map((d: DatasetType) => ({
            label: d.name,
            value: d.datasetId,
          }))}
          onValuesChange={setDatasets}
        />
        {/* Types */}
        <MultiSelectorComplete
          values={typesSelected}
          placeholder="Select type of input data"
          options={dataTypes.map((type) => ({
            label: type,
            value: type,
          }))}
          onValuesChange={setTypes}
        />

        {/* Body Parts */}
        <MultiSelectorComplete
          values={bodyPartsSelected}
          placeholder="Select body part"
          options={bodyParts.map((bodyPart) => ({
            label: bodyPart,
            value: bodyPart,
          }))}
          onValuesChange={setBodyParts}
        />
        <input
          type="hidden"
          name="diseaseId"
          value={JSON.stringify(diseasesSelected)}
        />
        <input
          type="hidden"
          name="bodyParts"
          value={JSON.stringify(bodyPartsSelected)}
        />
        <input
          type="hidden"
          name="dataType"
          value={JSON.stringify(typesSelected)}
        />
        <input
          type="hidden"
          name="datasetIds"
          value={JSON.stringify(selectedDatasets)}
        />
        <input
          type="hidden"
          name="diseaseCategories"
          value={JSON.stringify(selDisCategories)}
        />
        <h1 className="mt-8">The model</h1>
        <h2 className="mt-8">Upload model data in zip format (optional)</h2>
        {/* Model File */}
        <Input
          type="file"
          name="modelFile"
          className="mb-2 pt-3 h-12 items-center bg-yellow-200"
          accept=".zip"
        />
        <h2 className="mt-0">Upload Jupyter Notebook</h2>
        {/* Notebook File */}
        <Input
          type="file"
          name="notebookFile"
          className="mb-12 pt-3 h-12 items-center bg-yellow-200"
          required
          accept=".ipynb"
        />
        <Button type="submit" name="button">
          Submit
        </Button>
        {data && data.error && <p className="text-red-500">{data.error}</p>}
        {data && data.missingFields && (
          <p className="text-red-500">
            Missing fields: {data.missingFields.join(", ")}
          </p>
        )}
      </Form>
    </>
  );
}
export const loader = async () => {
  const datasets = await db.dataset.getByLatest();
  console.log("datasets length", datasets.length);
  return { datasets };
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
