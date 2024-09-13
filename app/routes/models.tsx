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
          <ModelsFilters />
          <div className="mt-8">
            <Link to="/model-add">
              <Button>Add Dataset</Button>
            </Link>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Available Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ModelsTable models={models} />
          </div>
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
