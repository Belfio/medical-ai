import {
  ActionFunctionArgs,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { ModelType } from "~/lib/types";
import { Form, Link, redirect } from "@remix-run/react";
import db from "~/lib/db";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { MultiSelectorComplete } from "~/components/ui/multicombo";
import { useState } from "react";
import { Textarea } from "~/components/ui/textarea";
import { s3UploaderHandler } from "~/upload.server";
import { bodyParts, dataTypes, diseases } from "~/lib/const";
import { CircleAlert } from "lucide-react";

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
        <Input className="" type="text" name="name" placeholder="Name" />
        {/* Description */}
        <Textarea
          name="description"
          placeholder="Description"
          className="resize-none"
        />
        {/* Author */}
        <Input className="" type="text" name="author" placeholder="Author" />
        {/* Website */}
        <Input className="" type="text" name="website" placeholder="Website" />
        <h2 className="mt-8">Clinical target</h2>
        {/* Diseases */}
        <MultiSelectorComplete
          values={diseasesSelected}
          placeholder="Select Diseases"
          options={diseases.map((disease) => ({
            label: disease.name,
            value: disease.name,
          }))}
          onValuesChange={setDiseases}
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

        <h2 className="mt-8">Data information</h2>
        {/* Size */}
        <Input
          className=""
          type="text"
          name="size"
          placeholder="Population size"
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
          name="types"
          value={JSON.stringify(typesSelected)}
        />
        <h1 className="mt-8">The model</h1>
        <h2 className="mt-8">Upload model data in zip format (optional)</h2>
        {/* Model File */}
        <Input
          type="file"
          name="modelFile"
          className="mb-2 pt-3 h-12 items-center bg-yellow-200"
        />
        <h2 className="mt-0">Upload Jupyter Notebook (optional)</h2>
        {/* Notebook File */}
        <Input
          type="file"
          name="notebookFile"
          className="mb-12 pt-3 h-12 items-center bg-yellow-200"
        />
        <Button type="submit" name="button">
          Submit
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
  const diseaseId = formData.get("diseaseId");
  const bodyParts = formData.get("bodyParts");
  const types = formData.get("types");
  const notebookFile = formData.get("notebookFile");
  const modelFile = formData.get("modelFile");

  // create the object dataset to save in the table dataset
  const model: ModelType = {
    modelId: String(name),
    name: name as string,
    description: description as string,
    createdAt: new Date().toISOString(),
    inputDataTypes: types as string,
    ranking: 0,
    notebookFile: notebookFile as string,
    modelFile: modelFile as string,
    website: website as string,
    tConst: "metadata",
    modelType: "csv",
    diseaseIds: diseaseId as string,
    bodyParts: bodyParts as string,
    userId: "1",
    author: author as string,
    size: size as string,
  };
  await db.model.create(model);

  return redirect("/models");
};
