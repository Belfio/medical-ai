import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Combobox } from "~/components/ui/combobox";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { categories } from "~/lib/const";
import db from "~/lib/db";
import { DiseaseType } from "~/lib/types";
import { getCategoryId, getCategoryName } from "~/lib/utils";

export default function Diseases() {
  const disease = useLoaderData<DiseaseType>();
  const [category, setCategoryId] = useState<string>(
    getCategoryName(disease.categoryId) || ""
  );
  const [description, setDescription] = useState<string>(disease.description);
  return (
    <>
      <Form method="POST" className="w-1/2 p-4 flex-col space-y-8">
        <div className="flex items-center gap-2">
          <Input type="text" name="name" value={disease.name} />
          <Combobox
            options={categories.map((c) => ({
              value: c.categoryId,
              label: c.categoryName,
            }))}
            value={category}
            setValue={setCategoryId}
          />
        </div>
        <Textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-2">
          <Link to={`/diseases/${disease.diseaseId}`}>
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" name="save" value={disease.diseaseId}>
            Save
          </Button>
        </div>

        <input
          type="hidden"
          name="categoryId"
          value={getCategoryId(category)}
        />
        <input type="hidden" name="diseaseId" value={disease.diseaseId} />
      </Form>
    </>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const save = formData.get("save");
  const diseaseId = formData.get("diseaseId");
  const disease = await db.disease.get(diseaseId as string);
  console.log("save", save);
  console.log("diseaseId", diseaseId);
  if (save && diseaseId) {
    console.log("saving disease");
    console.log("categoryId", formData.get("categoryId"));
    await db.disease.create({
      ...disease,
      name: formData.get("name") as string,
      categoryId: formData.get("categoryId") as string,
      description: formData.get("description") as string,
    });
    return redirect(`/diseases/${diseaseId}`);
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
