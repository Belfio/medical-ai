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
      <h1>Datasets</h1>
      <div>
        <Link to="/datasets-add">
          <Button>Add Dataset</Button>
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
