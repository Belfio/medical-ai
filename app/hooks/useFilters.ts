import { useState } from "react";
import { DatasetType, FiltersType, ModelType } from "~/lib/types";

export function useFilters<T extends ModelType | DatasetType>({
  data,
}: {
  data: T[];
}) {
  const [dataHook, setData] = useState(data);

  const handleFilterChange = (filters: FiltersType) => {
    console.log("filters", filters);
    setData(
      data.filter((dataset) => {
        const filterKeys = Object.keys(filters);
        if (
          filterKeys.every(
            (key) => filters[key as keyof FiltersType].length === 0
          )
        ) {
          return true;
        }

        switch (true) {
          case filters.dataTypes.includes("All"):
            return true;

          case filters.dataTypes.some((dT) =>
            JSON.parse(dataset.dataType).includes(dT)
          ):
            return true;

          case JSON.parse(dataset.bodyParts).some((part: string) =>
            filters.bodyParts.includes(part)
          ):
            return true;

          case JSON.parse(dataset.diseaseIds).some((disease: string) =>
            filters.diseases.includes(disease)
          ):
            return true;

          default:
            return false;
        }
      })
    );
  };

  return { handleFilterChange, data: dataHook };
}
