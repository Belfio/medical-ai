import { json } from "@remix-run/node";
import { DatasetType, DiseaseType, ModelType } from "~/lib/types";
import db from "~/lib/db";
import { useState } from "react";
import DiseasesTable from "~/components/DiseasesTable";
import { useLoaderData } from "@remix-run/react";
import { Combobox } from "~/components/ui/combobox";

export default function Diseases() {
  const { datasets, diseases, models } = useLoaderData<{
    datasets: DatasetType[];
    diseases: DiseaseType[];
    models: ModelType[];
  }>();
  const [selectedDisease, setSelectedDisease] = useState<DiseaseType | null>();
  return (
    <>
      <div className="mt-2 flex gap-4">
        <h2 className="text-2xl font-semibold mb-4">Tracked diseases</h2>
      </div>
      <Combobox
        options={diseases.map((disease) => ({
          value: disease.diseaseId,
          label: disease.name,
        }))}
        value={selectedDisease?.diseaseId || ""}
        setValue={setSelectedDisease}
      />

      {datasets && (
        <DiseasesTable
          diseases={diseases}
          models={models}
          datasets={datasets}
          className="mt-4"
        />
      )}
    </>
  );
}

export const loader = async () => {
  try {
    const datasets: DatasetType[] = await db.dataset.getByRanking();
    return json({ datasets, diseases: [], models: [] });
  } catch (error) {
    console.error(error);
    return json({ error: "Failed to fetch" }, { status: 500 });
  }
};
