import { useCallback, useState } from "react";
import { DatasetType, FiltersType, ModelType } from "~/lib/types";

export function useFilters<T extends ModelType | DatasetType>({
  data,
}: {
  data: T[];
}) {
  const [dataHook, setData] = useState(data);

  const handleFilterChange = (filters: FiltersType) => {
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

        if (filters.dataTypes.includes("All")) return true;

        if (filters.dataTypes.includes(dataset.dataType)) return true;
        const datasetBodyParts = JSON.parse(dataset.bodyParts);
        console.log(datasetBodyParts);
        console.log(filters.bodyParts);
        if (
          datasetBodyParts.some((part: string) =>
            filters.bodyParts.includes(part)
          )
        )
          return true;
        const datasetDiseases = JSON.parse(dataset.diseaseIds);
        if (
          datasetDiseases.some((disease: string) =>
            filters.diseases.includes(disease)
          )
        )
          return true;
        return false;
      })
    );
  };

  return { handleFilterChange, data: dataHook };
}
