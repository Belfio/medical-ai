import { categories, dataTypes, bodyParts } from "~/lib/const";
import { DatasetType, DiseaseType } from "~/lib/types";
import { getCategoryName } from "~/lib/utils";

import { MultiSelectorComplete } from "./ui/multicombo";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { useState } from "react";

export default function ModelQuestionnaire({
  datasets,
  diseases,
}: {
  datasets: DatasetType[];
  diseases: DiseaseType[];
}) {
  const [diseasesSelected, setDiseases] = useState<string[]>([]);
  const [typesSelected, setTypes] = useState<string[]>([]);
  const [bodyPartsSelected, setBodyParts] = useState<string[]>([]);
  const [selDisCategories, setCategories] = useState<string[]>([]);
  const [selectedDatasets, setDatasets] = useState<string[]>([]);
  return (
    <div>
      <div className="flex flex-col gap-4">
        {" "}
        {/* Name */}
        <Input
          className=""
          type="text"
          name="name"
          placeholder="Name"
          required
        />
        {/* Description */}
        <Textarea
          name="description"
          placeholder="Description"
          className="resize-none"
          required
        />
        {/* Author */}
        <Input
          className=""
          type="text"
          name="author"
          placeholder="Author"
          required
        />
        {/* Website */}
        <Input
          className=""
          type="text"
          name="website"
          placeholder="Website (optional)"
        />
      </div>
      <h2 className="mt-8">Clinical target</h2>
      {/* Disease Category */}
      <MultiSelectorComplete
        values={selDisCategories.map((category) => getCategoryName(category))}
        placeholder="Select Disease Category"
        options={categories.map((category) => ({
          label: category.categoryName,
          value: category.categoryId.toString(),
        }))}
        onValuesChange={setCategories}
      />
      {/* Diseases */}
      <MultiSelectorComplete
        values={diseasesSelected.map(
          (diseaseId) =>
            diseases.find((disease) => disease.diseaseId === diseaseId)?.name
        )}
        placeholder="Select Specific Diseases (optional)"
        options={
          selDisCategories.length > 0
            ? diseases
                .filter(
                  (disease) =>
                    String(disease.categoryId) === selDisCategories[0]
                )
                .map((disease) => ({
                  label: disease.name,
                  value: String(disease.diseaseId),
                }))
            : diseases.map((disease) => ({
                label: disease.name,
                value: String(disease.diseaseId),
              }))
        }
        onValuesChange={setDiseases}
      />
      <h2 className="mt-8">Data information</h2>
      {/* Datasets */}
      <MultiSelectorComplete
        values={selectedDatasets.map(
          (datasetId) =>
            datasets.find((dataset) => dataset.datasetId === datasetId)?.name
        )}
        placeholder="Select the dataset to test this model"
        options={datasets.map((d: DatasetType) => ({
          label: d.name,
          value: d.datasetId,
        }))}
        onValuesChange={setDatasets}
      />
      {/* Types */}
      <MultiSelectorComplete
        values={typesSelected}
        placeholder="Select type of input data"
        options={dataTypes.map((type) => ({
          label: type,
          value: type,
        }))}
        onValuesChange={setTypes}
      />
      {/* Body Parts */}
      <MultiSelectorComplete
        values={bodyPartsSelected}
        placeholder="Select body part"
        options={bodyParts.map((bodyPart) => ({
          label: bodyPart,
          value: bodyPart,
        }))}
        onValuesChange={setBodyParts}
      />
      <input
        type="hidden"
        name="diseaseId"
        value={JSON.stringify(diseasesSelected)}
      />
      <input
        type="hidden"
        name="bodyParts"
        value={JSON.stringify(bodyPartsSelected)}
      />
      <input
        type="hidden"
        name="dataType"
        value={JSON.stringify(typesSelected)}
      />
      <input
        type="hidden"
        name="datasetIds"
        value={JSON.stringify(selectedDatasets)}
      />
      <input
        type="hidden"
        name="diseaseCategories"
        value={JSON.stringify(selDisCategories)}
      />
    </div>
  );
}
