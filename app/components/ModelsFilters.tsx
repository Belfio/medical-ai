import { bodyParts, dataTypes, diseases } from "~/lib/const";
import { MultiSelectorComplete } from "./ui/multicombo";
import { useEffect, useState } from "react";
import { DatasetType, FiltersType } from "~/lib/types";
type ModelsFiltersProps = FiltersType & {
  datasets: string[];
};
export function ModelsFilters({
  onFilterChange,
  datasets = [],
}: {
  onFilterChange: (filters: ModelsFiltersProps) => void;
  datasets: DatasetType[];
}) {
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([]);
  const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([]);
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<string[]>([]);

  useEffect(() => {
    onFilterChange({
      dataTypes: selectedDataTypes,
      bodyParts: selectedBodyParts,
      diseases: selectedDiseases,
      datasets: selectedDataset,
    });
  }, [selectedDataTypes, selectedBodyParts, selectedDiseases, selectedDataset]);

  return (
    <div className="flex flex-col gap-0 max-w-2xl">
      {/* <h2 className="text-lg font-medium">Filter</h2> */}
      <div className="flex gap-1 items-center">
        <h3 className="text-sm font-medium w-1/6">Data type</h3>
        <MultiSelectorComplete
          options={dataTypes.map((dataType) => ({
            label: dataType,
            value: dataType,
          }))}
          values={selectedDataTypes}
          onValuesChange={(selected) => {
            setSelectedDataTypes(selected);
          }}
          placeholder="Select data types"
        />
      </div>
      <div className="flex gap-1 items-center">
        <h3 className="text-sm font-medium w-1/6">Body part</h3>
        <MultiSelectorComplete
          options={bodyParts.map((bodyPart) => ({
            label: bodyPart,
            value: bodyPart,
          }))}
          values={selectedBodyParts}
          onValuesChange={(selected) => {
            setSelectedBodyParts(selected);
          }}
          placeholder="Select body parts"
        />
      </div>

      <div className="flex gap-1 items-center">
        <h3 className="text-sm font-medium w-1/6">Disease</h3>
        <MultiSelectorComplete
          options={diseases.map((disease) => ({
            label: disease.name,
            value: String(disease.id),
          }))}
          values={selectedDiseases}
          onValuesChange={(selected) => {
            setSelectedDiseases(selected);
          }}
          placeholder="Select diseases"
        />
      </div>

      <div className="flex gap-1 items-center">
        <h3 className="text-sm font-medium w-1/6">Dataset</h3>
        <MultiSelectorComplete
          options={datasets.map((dataset) => ({
            label: dataset.name,
            value: dataset.datasetId,
          }))}
          values={selectedDataset}
          onValuesChange={(selected) => {
            setSelectedDataset(selected);
          }}
          placeholder="Select diseases"
        />
      </div>
    </div>
  );
}
