import { json, Link, Outlet, useLoaderData, useParams } from "@remix-run/react";
import { ModelsFilters } from "~/components/ModelsFilters";
import ModelsTable from "~/components/ModelTable";
import { Button } from "~/components/ui/button";
import db from "~/lib/db";

import { ModelType } from "~/lib/types";

export default function Models() {
  const { modelId } = useParams();
  const { models } = useLoaderData<{ models: ModelType[] }>();

  return (
    <>
      {modelId ? (
        <Outlet />
      ) : (
        <>
          <div className="mt-2 flex gap-4">
            <h2 className="text-2xl font-semibold mb-4">Models</h2>
            <Link to="/model-add">
              <Button>Submit your model</Button>
            </Link>
          </div>
          <ModelsFilters />

          <ModelsTable models={models} className="mt-4" />
        </>
      )}
    </>
  );
}

// Loader to fetch models
export const loader = async () => {
  try {
    const models: ModelType[] = await db.model.getByRanking();
    console.log("models", models);
    return json({ models });
  } catch (error) {
    console.error(error);
    return json({ error: "Failed to fetch datasets" }, { status: 500 });
  }
};
