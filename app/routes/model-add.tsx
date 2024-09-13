import { ActionFunctionArgs } from "@remix-run/node";
import { DatasetType, ModelType } from "~/lib/types";
import { Form, redirect } from "@remix-run/react";
import db from "~/lib/db";
import { Button } from "~/components/ui/button";

export default function ModelAdd() {
  return (
    <>
      <Form method="post">
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="description" placeholder="Description" />
        <input type="text" name="author" placeholder="Author" />
        <input type="text" name="downloadUrl" placeholder="Download URL" />
        <Button type="submit" name="addDataset">
          Add Model
        </Button>
      </Form>
    </>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  console.log("formData", formData);
  const name = formData.get("name");

  const dataset: ModelType = {
    createdAt: new Date().toISOString(),
    ranking: 0,
    modelId: String(name),
    tConst: "metadata",
    diseaseId: "1",
    userId: "1",
    modelType: "metadata",
  };
  await db.model.create(dataset);

  return redirect("/models");
};
