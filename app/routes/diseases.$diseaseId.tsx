import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import db from "~/lib/db";
import { DiseaseType } from "~/lib/types";

export default function Diseases() {
  const disease = useLoaderData<DiseaseType>();
  return (
    <>
      <div className="flex items-center gap-2">
        <h1>{disease.name}</h1>
        <Badge>{disease.category}</Badge>
      </div>
      <p>{disease.description}</p>
      <Form method="POST" className="flex gap-2">
        <Button type="submit">Edit</Button>
        <Button type="submit" name="remove" value={disease.diseaseId}>
          Remove
        </Button>
        <input type="hidden" name="diseaseId" value={disease.diseaseId} />
      </Form>
    </>
  );
}

// const littleScript = async () => {
//   const diseaseToCreate: DiseaseType[] = diseases.map((d) => {
//     return {
//       ...d,
//       approved: "true",
//       createdAt: new Date().toISOString(),
//       diseaseId: d.id.toString(),
//       tConst: "metadata",
//     };
//   });
//   console.log("creating diseases");
//   diseaseToCreate.forEach(async (disease) => {
//     console.log("creating disease", disease);
//     await db.disease.create(disease);
//   });
// };

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const remove = formData.get("remove");
  const diseaseId = formData.get("diseaseId");
  console.log("remove", remove);
  console.log("diseaseId", diseaseId);
  if (remove && diseaseId) {
    console.log("removing disease");
    await db.disease.delete(diseaseId as string);
    return redirect(`/diseases`);
  }
  // await littleScript();
  return redirect(`/diseases/${diseaseId}`);
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const diseaseId = String(params.diseaseId);
  const disease = await db.disease.get(diseaseId);
  console.log("diseases", disease);
  return json(disease);
};
