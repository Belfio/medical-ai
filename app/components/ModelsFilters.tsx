import { bodyParts, dataTypes, diseases } from "~/lib/const";
import { MultiSelectorComplete } from "./ui/multicombo";
import { useEffect, useState } from "react";
import { FiltersType } from "~/lib/types";
export function ModelsFilters({
  onFilterChange,
}: {
  onFilterChange: (filters: FiltersType) => void;
}) {
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([]);
  const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([]);
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);

  useEffect(() => {
    onFilterChange({
      dataTypes: selectedDataTypes,
      bodyParts: selectedBodyParts,
      diseases: selectedDiseases,
    });
  }, [selectedDataTypes, selectedBodyParts, selectedDiseases]);

  return (
    <div className="flex flex-col gap-0 max-w-2xl">
      <h2 className="text-lg font-medium">Filter</h2>
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
    </div>
  );
}
