import { json } from "@remix-run/node";
import { DatasetType, DiseaseType, ModelType } from "~/lib/types";
import db from "~/lib/db";
import { useEffect, useState } from "react";
import DiseasesTable from "~/components/DiseasesTable";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { Combobox } from "~/components/ui/combobox";
import { ComboboxIcon } from "~/components/ui/comboboxIcon";
import { Button } from "~/components/ui/button";
import { categories } from "~/lib/const";

export default function Diseases() {
  const { datasets, diseases, models } = useLoaderData<{
    datasets: DatasetType[];
    diseases: DiseaseType[];
    models: ModelType[];
  }>();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>();
  const [diseasesList, setDiseasesList] = useState<DiseaseType[]>(diseases);
  const handleDiseaseChange = (value: string) => {
    console.log(value);
    const disease = diseases.find((disease) => disease.name === value);
    navigate(`/diseases/${disease?.diseaseId}`);
  };
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };
  useEffect(() => {
    const filteredDiseases = diseases.filter((disease) => {
      return selectedCategory ? disease.category === selectedCategory : true;
    });
    setDiseasesList(filteredDiseases);
  }, [selectedCategory, diseases]);
  return (
    <>
      <div className="mt-2 flex gap-4 ">
        <h2 className="text-2xl font-semibold mb-4">Tracked diseases</h2>
        <Link to="/diseases/add">
          <Button>Add disease</Button>
        </Link>
      </div>
      <div className="w-1/3 flex-col space-y-4">
        <Combobox
          placeholder="Select disease category"
          options={categories.map((category) => ({
            value: category.categoryName,
            label: category.categoryName,
          }))}
          value={selectedCategory || ""}
          setValue={handleCategoryChange}
          className="w-full"
        />
      </div>
      {datasets && (
        <DiseasesTable
          diseases={diseasesList}
          models={models}
          datasets={datasets}
          className="mt-4"
          nameSearch={
            <>
              <ComboboxIcon
                options={diseases.map((disease) => ({
                  value: disease.diseaseId,
                  label: disease.name,
                }))}
                value={""}
                setValue={handleDiseaseChange}
                className="w-full"
              />
            </>
          }
        />
      )}
    </>
  );
}

export const loader = async () => {
  try {
    const datasets: DatasetType[] = await db.dataset.getByLatest();
    const diseases: DiseaseType[] = await db.disease.getNItems(100);
    const models: ModelType[] = await db.model.getByLatest();
    return json({ datasets, diseases, models });
  } catch (error) {
    console.error(error);
    return json({ error: "Failed to fetch" }, { status: 500 });
  }
};
