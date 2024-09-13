import DatasetsTable from "~/components/DatasetsTable";
import { json } from "@remix-run/node";
import { DatasetType } from "~/lib/types";
import { Link, useLoaderData } from "@remix-run/react";
import db from "~/lib/db";
import { Button } from "~/components/ui/button";

export default function Datasets() {
  const { datasets } = useLoaderData<{ datasets: DatasetType[] }>();
  return (
    <>
      <div className="mt-2 flex gap-4">
        <h2 className="text-2xl font-semibold mb-4">Datasets</h2>
        <Link to="/datasets-add">
          <Button>Add your dataset</Button>
        </Link>
      </div>
      {datasets && <DatasetsTable datasets={datasets} />}
    </>
  );
}

export const loader = async () => {
  try {
    const datasets: DatasetType[] = await db.dataset.getByRanking();
    return json({ datasets });
  } catch (error) {
    console.error(error);
    return json({ error: "Failed to fetch datasets" }, { status: 500 });
  }
};
