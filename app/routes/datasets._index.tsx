import DatasetsTable from "~/components/DatasetsTable";
import { json } from "@remix-run/node";
import { DatasetType, DiseaseType } from "~/lib/types";
import { Link, useLoaderData } from "@remix-run/react";
import db from "~/lib/db";
import { Button } from "~/components/ui/button";
import { DatasetFilters } from "~/components/DatasetFilters";

import { useFilters } from "~/hooks/useFilters";

export default function Datasets() {
  const { datasets, diseases } = useLoaderData<{
    datasets: DatasetType[];
    diseases: DiseaseType[];
  }>();
  const { data, handleFilterChange } = useFilters({ data: datasets });

  return (
    <>
      <div className="mt-2 flex gap-4">
        <h2 className="text-2xl font-semibold mb-4">Datasets</h2>
        <Link to="/datasets-add">
          <Button>Add your dataset</Button>
        </Link>
      </div>
      <DatasetFilters onFilterChange={handleFilterChange} diseases={diseases} />

      <DatasetsTable diseases={diseases} datasets={data} className="mt-4" />
    </>
  );
}

export const loader = async () => {
  try {
    const datasets: DatasetType[] = await db.dataset.getByRanking();
    const diseases: DiseaseType[] = await db.disease.getNItems(100);
    return json({ datasets, diseases });
  } catch (error) {
    console.error(error);
    return json({ error: "Failed to fetch datasets" }, { status: 500 });
  }
};
