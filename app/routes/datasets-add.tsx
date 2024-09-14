import {
  ActionFunctionArgs,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { DatasetType } from "~/lib/types";
import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigation,
} from "@remix-run/react";
import db from "~/lib/db";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { MultiSelectorComplete } from "~/components/ui/multicombo";
import { useState } from "react";
import { Textarea } from "~/components/ui/textarea";
import { s3UploaderHandler } from "~/upload.server";
import {
  bodyFocus,
  bodyParts,
  categories,
  dataTypes,
  diseases,
} from "~/lib/const";

export default function Datasets() {
  const data = useActionData<typeof action>() as {
    error: string;
    missingFields: string[];
  };
  const [selDiseases, setDiseases] = useState<string[]>([]);
  const [selDisCategories, setCategories] = useState<string[]>([]);
  const [selTypes, setTypes] = useState<string[]>([]);
  const [selBodyParts, setBodyParts] = useState<string[]>([]);
  const [selBodyFocus, setBodyFocus] = useState<string[]>([]);
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
          values={selDisCategories}
          placeholder="Select Disease Category"
          options={categories.map((category) => ({
            label: category.categoryName,
            value: category.categoryId.toString(),
          }))}
          onValuesChange={setCategories}
        />
        {/* CLINICAL TARGET - SPECIFIC DISEASES */}
        <MultiSelectorComplete
          values={selDiseases}
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
          placeholder="Population size, how many humans"
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
        <Input type="file" name="datasetFile" className="mb-12" />
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
  const formData = await unstable_parseMultipartFormData(
    request,
    s3UploaderHandler
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
  if (
    !name ||
    !description ||
    !author ||
    !website ||
    !size ||
    !datasetFile ||
    !diseaseId ||
    !bodyParts ||
    !types ||
    !diseaseCategory ||
    !bodyFocus
  ) {
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!description) missingFields.push("description");
    if (!author) missingFields.push("author");
    if (!website) missingFields.push("website");
    if (!size) missingFields.push("size");
    if (!datasetFile) missingFields.push("datasetFile");
    if (!diseaseId) missingFields.push("diseaseId");
    if (!bodyParts) missingFields.push("bodyParts");
    return json({ error: "Some fields are required", missingFields });
  }
  const dataset: DatasetType = {
    createdAt: new Date().toISOString(),
    ranking: 0,
    datasetId: String(name),
    name: name as string,
    description: description as string,
    downloadUrl: datasetFile as string,
    website: website as string,
    tConst: "metadata",
    dataType: "csv",
    diseaseIds: diseaseId as string,
    bodyParts: bodyParts as string,
    types: types as string,
    userId: "1",
    author: author as string,
    size: size as string,
    diseaseCategory: diseaseCategory as string,
    bodyFocus: bodyFocus as string,
  };
  await db.dataset.create(dataset);

  return redirect("/datasets");
};
