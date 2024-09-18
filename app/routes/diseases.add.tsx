import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { CategoryType, DiseaseType } from "~/lib/types";
import db from "~/lib/db";
import { v4 as uuidv4 } from "uuid";
import { Form } from "@remix-run/react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useState } from "react";
import { categories } from "~/lib/const";
import { Combobox } from "~/components/ui/combobox";
export default function Diseases() {
  const [category, setCategory] = useState<CategoryType | null>();
  const handleCategoryChange = (value: string) => {
    console.log(value);
    setCategory(categories.find((c: CategoryType) => c.categoryName === value));
  };
  return (
    <>
      <div className="mt-2 flex gap-4">
        <h2 className="text-2xl font-semibold mb-4">Add disease</h2>
      </div>
      <Form className="flex flex-col gap-4 w-2/3" method="POST">
        <Input name="name" placeholder="Name" />

        <Combobox
          options={categories.map((c: CategoryType) => ({
            value: c.categoryId,
            label: c.categoryName,
          }))}
          value={category?.categoryName || ""}
          setValue={handleCategoryChange}
          className="w-full float-start right-0 text-slate-500 font-[400] px-3"
          placeholder="Select the disease category"
        />
        <Textarea
          name="description"
          placeholder="Description"
          className="h-auto resize-none"
        />
        <input type="hidden" name="categoryId" value={category?.categoryId} />
        <div className="flex gap-4">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </div>
      </Form>
    </>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = String(formData.get("name"));
  const categoryId = String(formData.get("categoryId"));
  const description = String(formData.get("description"));
  const disease: DiseaseType = {
    name,
    categoryId,
    description,
    diseaseId: uuidv4(),
    approved: "true",
    createdAt: new Date().toISOString(),
    tConst: "metadata",
  };
  console.log(disease);
  const diseases: DiseaseType[] = await db.disease.getNItems(100);
  if (diseases.find((d: DiseaseType) => d.name === name)) {
    return json({ error: "Disease already exists" }, { status: 400 });
  }
  await db.disease.create(disease);
  return redirect("/diseases");
};
