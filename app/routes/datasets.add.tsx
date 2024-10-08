import {
  ActionFunctionArgs,
  unstable_parseMultipartFormData,
  UploadHandler,
  UploadHandlerPart,
} from "@remix-run/node";
import { DatasetType, DiseaseType } from "~/lib/types";
import {
  Form,
  json,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import db from "~/lib/db";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { MultiSelectorComplete } from "~/components/ui/multicombo";
import { useState } from "react";
import { Textarea } from "~/components/ui/textarea";
import { s3UploaderHandler } from "~/server/upload.server";
import { bodyFocus, bodyParts, categories, dataTypes } from "~/lib/const";
import { getCategoryName, randomId } from "~/lib/utils";
import { Resource } from "sst";

export default function Datasets() {
  const data = useActionData<typeof action>() as {
    error: string;
    missingFields: string[];
  };
  const diseases = useLoaderData<DiseaseType[]>();
  const [selDiseases, setDiseases] = useState<(undefined | string)[]>([]);
  const [selDisCategories, setCategories] = useState<(undefined | string)[]>(
    []
  );
  const [selTypes, setTypes] = useState<(undefined | string)[]>([]);
  const [selBodyParts, setBodyParts] = useState<(undefined | string)[]>([]);
  const [selBodyFocus, setBodyFocus] = useState<(undefined | string)[]>([]);
  const navigation = useNavigation();

  return (
    <>
      <Form
        method="post"
        className="flex flex-col gap-4 max-w-[540px]"
        encType="multipart/form-data"
      >
        <h2>Dataset Details</h2>
        {/* NAME */}
        <Input
          className=""
          type="text"
          name="name"
          placeholder="Name"
          required
        />
        {/* DESCRIPTION */}
        <Textarea
          name="description"
          placeholder="Description"
          className="resize-none"
          required
        />
        {/* AUTHOR */}
        <Input className="" type="text" name="author" placeholder="Author" />
        {/* WEBSITE */}
        <Input className="" type="text" name="website" placeholder="Website" />
        <h2 className="mt-8">Clinical target</h2>
        {/* CLINICAL TARGET - CATEGORY */}
        <MultiSelectorComplete
          values={selDisCategories.map((id) => id && getCategoryName(id)) || []}
          placeholder="Select Disease Category"
          options={categories.map((category) => ({
            label: category.categoryName,
            value: category.categoryId.toString(),
          }))}
          onValuesChange={setCategories}
        />
        {/* CLINICAL TARGET - SPECIFIC DISEASES */}
        <MultiSelectorComplete
          values={selDiseases.map(
            (id) => diseases.find((d) => d.diseaseId === id)?.name
          )}
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
                    value: String(disease.diseaseId),
                  }))
              : diseases.map((disease) => ({
                  label: disease.name,
                  value: String(disease.diseaseId),
                }))
          }
          onValuesChange={setDiseases}
        />
        {/* CLINICAL TARGET - FOCUS */}
        <MultiSelectorComplete
          values={selBodyFocus}
          placeholder="Select focus"
          options={bodyFocus.map((part) => ({
            label: part,
            value: part,
          }))}
          onValuesChange={setBodyFocus}
        />
        {/* CLINICAL TARGET - BODY PARTS */}
        <MultiSelectorComplete
          values={selBodyParts}
          placeholder="Select body part (optional)"
          options={bodyParts.map((part) => ({
            label: part,
            value: part,
          }))}
          onValuesChange={setBodyParts}
        />
        <h2 className="mt-8">Data information</h2>
        {/* DATA INFORMATION - TYPE */}
        <MultiSelectorComplete
          values={selTypes}
          placeholder="Select type of data"
          options={dataTypes.map((type) => ({
            label: type,
            value: type,
          }))}
          onValuesChange={setTypes}
        />
        {/* DATA INFORMATION - SIZE */}
        <Input
          className=""
          type="text"
          name="size"
          placeholder="Population size, how many humans (optional)"
        />
        <Textarea
          name="instructions"
          placeholder="Important! Explain how to to use the data"
          required
          className="resize-none"
        />
        <input
          type="hidden"
          name="diseaseId"
          value={JSON.stringify(selDiseases)}
        />
        <input
          type="hidden"
          name="bodyParts"
          value={JSON.stringify(selBodyParts)}
        />
        <input type="hidden" name="types" value={JSON.stringify(selTypes)} />
        <input
          type="hidden"
          name="bodyFocus"
          value={JSON.stringify(selBodyFocus)}
        />
        <input
          type="hidden"
          name="diseaseCategory"
          value={JSON.stringify(selDisCategories)}
        />

        <h2 className="mt-8">Upload the dataset (zip format)</h2>
        <Input
          type="file"
          name="datasetFile"
          accept=".zip"
          className="pt-3 h-12 items-center bg-green-200"
        />
        <p>Or</p>
        <Input
          type="text"
          name="datasetUrl"
          placeholder="Dataset URL"
          className="mb-12 h-12 items-center bg-green-200"
        />
        <Button
          type="submit"
          name="button"
          disabled={navigation.state === "submitting"}
        >
          Submit Dataset
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

export const action = async ({ request }: ActionFunctionArgs) => {
  const datasetId = randomId();

  const s3uploaderWithId: UploadHandler = (props: UploadHandlerPart) =>
    s3UploaderHandler(props, datasetId, "datasets");

  const formData = await unstable_parseMultipartFormData(
    request,
    s3uploaderWithId
  );

  const name = formData.get("name");
  const description = formData.get("description");
  const author = formData.get("author");
  const website = formData.get("website");
  const size = formData.get("size");
  const datasetFile = formData.get("datasetFile");
  const diseaseId = formData.get("diseaseId");
  const bodyParts = formData.get("bodyParts");
  const types = formData.get("types");
  const diseaseCategory = formData.get("diseaseCategory");
  const bodyFocus = formData.get("bodyFocus");
  const instructions = formData.get("instructions");
  const datasetUrl = formData.get("datasetUrl");
  if (
    !name ||
    !description ||
    !author ||
    (!datasetFile && !datasetUrl) ||
    !diseaseId ||
    !bodyParts ||
    !types ||
    !diseaseCategory ||
    !bodyFocus ||
    !instructions
  ) {
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!description) missingFields.push("description");
    if (!author) missingFields.push("author");
    if (!datasetFile && !datasetUrl) missingFields.push("datasetFile");
    if (!diseaseId) missingFields.push("diseaseId");
    if (!bodyParts) missingFields.push("bodyParts");
    if (!types) missingFields.push("types");
    if (!diseaseCategory) missingFields.push("diseaseCategory");
    if (!bodyFocus) missingFields.push("bodyFocus");
    if (!instructions) missingFields.push("instructions");
    return json({ error: "Some fields are required", missingFields });
  }

  const dataset: DatasetType = {
    createdAt: new Date().toISOString(),
    ranking: 0,
    datasetId: datasetId,
    name: name as string,
    description: description as string,
    downloadUrl: datasetFile as string,
    website: website as string,
    tConst: "metadata",
    dataType: types as string,
    diseaseIds: diseaseId as string,
    bodyParts: bodyParts as string,
    types: types as string,
    userId: "1",
    author: author as string,
    size: size as string,
    diseaseCategory: diseaseCategory as string,
    bodyFocus: bodyFocus as string,
    instructions: instructions as string,
    externalUrl: datasetUrl as string,
    internalUrl: Resource.DatasetBucket.name,
  };
  await db.dataset.create(dataset);

  return redirect("/datasets");
};

export const loader = async () => {
  const diseases = await db.disease.getByLatest(999);
  return diseases;
};
