import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import db from "~/lib/db";
import { ModelType } from "~/lib/types";

export default function EditModel() {
  const model = useLoaderData<ModelType>();
  const [description, setDescription] = useState<string>(model.description);
  const [name, setName] = useState<string>(model.name);
  return (
    <>
      <Form method="POST" className="w-1/2 p-4 flex-col space-y-8">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <Textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-2">
          <Link to={`/models/${model.modelId}`}>
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" name="save" value={model.modelId}>
            Save
          </Button>
        </div>

        <input type="hidden" name="modelId" value={model.modelId} />
      </Form>
    </>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const save = formData.get("save");
  const modelId = formData.get("modelId");
  const model = await db.model.get(modelId as string);
  console.log("save", save);
  console.log("modelId", modelId);
  if (save && modelId) {
    console.log("saving model");
    await db.model.create({
      ...model,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
    });
    return redirect(`/models/${modelId}`);
  }
  return redirect(`/models/${modelId}`);
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const modelId = String(params.modelId);
  const model = await db.model.get(modelId);
  console.log("model", model);
  return json(model);
};
