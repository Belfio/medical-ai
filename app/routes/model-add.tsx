import {
  ActionFunctionArgs,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { ModelType } from "~/lib/types";
import { Form, redirect } from "@remix-run/react";
import db from "~/lib/db";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { MultiSelectorComplete } from "~/components/ui/multicombo";
import { useState } from "react";
import { Textarea } from "~/components/ui/textarea";
import { s3UploaderHandler } from "~/upload.server";
import { bodyParts, dataTypes, diseases } from "~/lib/const";

export default function ModelAdd() {
  const [diseasesSelected, setDiseases] = useState<string[]>([]);
  const [typesSelected, setTypes] = useState<string[]>([]);
  const [bodyPartsSelected, setBodyParts] = useState<string[]>([]);

  return (
    <>
      <Form
        method="post"
        className="flex flex-col gap-4 max-w-[540px]"
        encType="multipart/form-data"
      >
        <h2>Model Details</h2>
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
          values={diseasesSelected}
          placeholder="Select Diseases"
          options={diseases.map((disease) => ({
            label: disease.name,
            value: disease.name,
          }))}
          onValuesChange={setDiseases}
        />
        <MultiSelectorComplete
          values={typesSelected}
          placeholder="Select type of data"
          options={dataTypes.map((type) => ({
            label: type,
            value: type,
          }))}
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
          value={JSON.stringify(diseases)}
        />
        <input
          type="hidden"
          name="bodyParts"
          value={JSON.stringify(bodyParts)}
        />
        <input
          type="hidden"
          name="types"
          value={JSON.stringify(typesSelected)}
        />
        <h2 className="mt-8">Upload the dataset (zip format)</h2>
        <Input type="file" name="datasetFile" className="mb-12" />
        <Button type="submit" name="button">
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
  console.log(" formData", formData);
  const name = formData.get("name");
  const description = formData.get("description");
  const author = formData.get("author");
  const website = formData.get("website");
  const size = formData.get("size");
  const datasetFile = formData.get("datasetFile");
  const diseaseId = formData.get("diseaseId");
  const bodyParts = formData.get("bodyParts");
  const types = formData.get("types");

  // create the object dataset to save in the table dataset
  const dataset: ModelType = {
    createdAt: new Date().toISOString(),
    ranking: 0,
    modelId: String(name),
    description: description as string,
    downloadUrl: datasetFile as string,
    website: website as string,
    tConst: "metadata",
    modelType: "csv",
    diseaseId: diseaseId as string,
    bodyParts: bodyParts as string,
    types: types as string,
    userId: "1",
    author: author as string,
    size: size as string,
  };
  await db.model.create(dataset);

  return redirect("/models");
};
