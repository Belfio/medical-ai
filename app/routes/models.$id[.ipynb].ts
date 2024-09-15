import { LoaderFunctionArgs } from "@remix-run/node";
import db from "~/lib/db";
import s3 from "~/lib/s3";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) {
    return new Response("Model ID is required", { status: 400 });
  }
  console.log("params.id", params.id);
  const model = await db.model.get(String(params.id));

  //get the zip file from S3
  const zipFile = await s3.models.get(model.notebookFile);
  console.log("zipFile name", model.notebookFile);
  if (!zipFile) {
    return new Response("Model not found", { status: 404 });
  }
  return new Response(zipFile, {
    status: 200,
    headers: {
      "Content-Type": "application/ipynb",
      "Content-Disposition": `attachment; filename="notebook-${params.id}.ipynb"`,
    },
  });
}
