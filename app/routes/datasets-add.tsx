import {
  ActionFunctionArgs,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { DatasetType } from "~/lib/types";
import { Form, redirect } from "@remix-run/react";
import db from "~/lib/db";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { MultiSelectorComplete } from "~/components/ui/multicombo";
import { useState } from "react";
import { Textarea } from "~/components/ui/textarea";
import { s3UploaderHandler } from "~/upload.server";
const diseasesList = [
  { label: "Diabetes", value: "diabetes" },
  { label: "Heart Disease", value: "heart-disease" },
  { label: "Cancer", value: "cancer" },
];
const bodyPartsList = [
  { label: "Head", value: "head" },
  { label: "Heart", value: "heart" },
  { label: "Leg", value: "leg" },
];
const dataTypes = [
  { label: "CSV", value: "csv" },
  { label: "JSON", value: "json" },
  { label: "Parquet", value: "parquet" },
];

export default function Datasets() {
  const [diseases, setDiseases] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [bodyParts, setBodyParts] = useState<string[]>([]);

  return (
    <>
      <Form
        method="post"
        className="flex flex-col gap-4 max-w-[540px]"
        encType="multipart/form-data"
      >
        <h2>Dataset Details</h2>
        <Input className="" type="text" name="name" placeholder="Name" />
        <Textarea
          name="description"
          placeholder="Description"
          className="resize-none"
        />
        <Input className="" type="text" name="author" placeholder="Author" />
        <Input className="" type="text" name="website" placeholder="Website" />
        <h2 className="mt-8">Clinical target</h2>
        <MultiSelectorComplete
          values={diseases}
          placeholder="Select Diseases"
          options={diseasesList}
          onValuesChange={setDiseases}
        />
        <MultiSelectorComplete
          values={types}
          placeholder="Select type of data"
          options={dataTypes}
          onValuesChange={setTypes}
        />

        <h2 className="mt-8">Data information</h2>
        <Input
          className=""
          type="text"
          name="size"
          placeholder="Population size"
        />

        <MultiSelectorComplete
          values={bodyParts}
          placeholder="Select body part"
          options={bodyPartsList}
          onValuesChange={setBodyParts}
        />

        <h2 className="mt-8">Upload the dataset (zip format)</h2>
        <Input type="file" name="datasetFile" className="mb-12" />
        <Button type="submit" name="addDataset">
          Submit Dataset
        </Button>
      </Form>
    </>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    s3UploaderHandler
  );
  console.log("EGOLO formData", formData);

  const fileName = formData.get("datasetFile");
  console.log("fileName", fileName);
  const name = formData.get("name");
  const description = formData.get("description");
  const downloadUrl = formData.get("downloadUrl");
  const dataset: DatasetType = {
    createdAt: new Date().toISOString(),
    ranking: 0,
    datasetId: String(name),
    description: description as string,
    downloadUrl: downloadUrl as string,
    tConst: "metadata",
    dataType: "csv",
    diseaseId: "1",
    userId: "1",
  };
  await db.dataset.create(dataset);

  return redirect("/datasets");
};
