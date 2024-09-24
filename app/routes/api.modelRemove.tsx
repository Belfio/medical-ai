import { ActionFunctionArgs, redirect } from "@remix-run/node";
import db from "~/lib/db";
import s3 from "~/lib/s3";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  console.log("formData", formData);
  if (formData.get("action") === "remove") {
    const modelId = formData.get("modelId");
    const { isSuccess } = await db.model.delete(modelId as string);
    console.log("db model delete", isSuccess);

    const s3Response = await s3.models.delete(`${modelId}/`);
    console.log("s3 model delete", s3Response.isSuccess);
  }

  return redirect("/models");
};
