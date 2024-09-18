import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import db from "~/lib/db";
import { DiseaseType } from "~/lib/types";
import { getCategoryName } from "~/lib/utils";

export default function Diseases() {
  const disease = useLoaderData<DiseaseType>();
  return (
    <>
      <div className="flex flex-row gap-2">
        <div className="w-1/2 p-4 flex-col space-y-8">
          <div className="flex items-center gap-2">
            <h1>{disease.name}</h1>
            <Badge>{getCategoryName(disease.categoryId)}</Badge>
          </div>
          <p>{disease.description}</p>
          <Form method="POST" className="flex gap-2">
            <Link to={`/diseases/${disease.diseaseId}/edit`}>
              <Button variant="outline">Edit</Button>
            </Link>
            <Button type="submit" name="remove" value={disease.diseaseId}>
              Remove
            </Button>
            <input type="hidden" name="diseaseId" value={disease.diseaseId} />
          </Form>
        </div>
        <Outlet />
      </div>
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
