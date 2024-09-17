import { json, LoaderFunctionArgs } from "@remix-run/node";
import db from "~/lib/db";
import s3 from "~/lib/s3";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { datasetId } = params;

  if (!datasetId) {
    return json({ error: "Dataset ID is required" }, { status: 400 });
  }
  try {
    const dataset = await db.dataset.get(datasetId);
    const datasetFile = await s3.datasets.get(dataset.downloadUrl);
    // return json(datasetFile);
    return new Response(datasetFile, {
      headers: {
        "Content-Type": "application/zip", // Adjust this depending on the file type
        "Content-Disposition": `attachment; filename="${datasetId}.zip"`,
      },
    });
  } catch (error) {
    return json({ error: "Dataset not found" }, { status: 404 });
  }
};
