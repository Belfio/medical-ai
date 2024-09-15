import { LoaderFunctionArgs } from "@remix-run/node";
import db from "~/lib/db";
import s3 from "~/lib/s3";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) {
    return new Response("Dataset ID is required", { status: 400 });
  }
  const dataset = await db.dataset.get(String(params.id));
  //get the zip file from S3
  const zipFile = await s3.datasets.get(dataset.downloadUrl) BodyInit;
  if (!zipFile) {
    return new Response("Dataset not found", { status: 404 });
  }
  return new Response(zipFile, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${params.id}.zip"`,
    },
  });
}
