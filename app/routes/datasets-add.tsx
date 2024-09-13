import { ActionFunctionArgs } from "@remix-run/node";
import { DatasetType } from "~/lib/types";
import { Form, redirect } from "@remix-run/react";
import db from "~/lib/db";
import { Button } from "~/components/ui/button";

export default function Datasets() {
  return (
    <>
      <Form method="post">
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="description" placeholder="Description" />
        <input type="text" name="author" placeholder="Author" />
        <input type="text" name="downloadUrl" placeholder="Download URL" />
        <Button type="submit" name="addDataset">
          Add Dataset
        </Button>
      </Form>
    </>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  console.log("formData", formData);
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
