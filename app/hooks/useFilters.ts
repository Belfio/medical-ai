import { useState } from "react";
import { DatasetType, FiltersType, ModelType } from "~/lib/types";

export function useFilters<T extends ModelType | DatasetType>({
  data,
}: {
  data: T[];
}) {
  const [dataHook, setData] = useState(data);

  const handleFilterChange = (filters: FiltersType) => {
    setData(
      data.filter((element) => {
        const filterKeys = Object.keys(filters);
        if (
          filterKeys.every(
            (key) => filters[key as keyof FiltersType]?.length === 0
          )
        ) {
          return true;
        }

        switch (true) {
          case filters.dataTypes.includes("All"):
            return true;

          case filters.dataTypes.some((dT) =>
            JSON.parse(element.dataType).includes(dT)
          ):
            return true;

          case JSON.parse(element.bodyParts).some((part: string) =>
            filters.bodyParts.includes(part)
          ):
            return true;

          case JSON.parse(element.diseaseIds).some((disease: string) =>
            filters.diseases.includes(disease)
          ):
            return true;
          case filters?.datasets &&
            filters.datasets.some((id: string) => id === element.datasetId):
            return true;
          default:
            return false;
        }
      })
    );
  };

  return { handleFilterChange, data: dataHook };
}
