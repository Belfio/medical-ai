import { useActionData, useFetcher, useLoaderData } from "@remix-run/react";
import db from "~/lib/db";
import { Button } from "~/components/ui/button";
import { useState } from "react";

import Upload from "~/components/Upload";

import ModelQuestionnaire from "~/components/ModelQuestionnaire";
import ModelUploadSmall from "~/components/UploadSmall";
import { MultiSelectorComplete } from "~/components/ui/multicombo";
import { DatasetType } from "~/lib/types";
import AlertSelectDataset from "~/components/AlertSelectDataset";

export default function ModelAdd() {
  const fetcher = useFetcher();
  const error = useActionData<typeof error>() as {
    error: string;
    missingFields: string[];
  };
  const { datasets } = useLoaderData<typeof loader>();
  const [selectedDatasets, setDatasets] = useState<string[]>([]);

  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    if (!files) return;
    Array.from(files).map((file) => formData.append(file.name, file));
    console.log("sending files?", files.length);
    await fetcher.submit(formData, {
      method: "post",
      encType: "multipart/form-data",
      action: "/api/model/add",
    });
  };

  const turnPage =
    files?.length && files?.length > 0 && selectedDatasets.length > 0;
  const datasetReminder =
    files?.length && files?.length > 0 && selectedDatasets.length === 0;
  return (
    <div className="flex flex-col gap-4 max-w-[540px]">
      <h1>Upload your model</h1>
      {JSON.stringify(selectedDatasets)}
      {turnPage ? (
        <>
          <fetcher.Form method="post" onSubmit={handleSubmit}>
            <input type="hidden" name="stogazzo" value="poba" />
            <ModelQuestionnaire />
            <ModelUploadSmall
              files={files}
              setFiles={setFiles}
              className="mt-4 w-full"
            />
            {error && error.error && (
              <p className="text-red-500">{error.error}</p>
            )}
            {error && error.missingFields && (
              <p className="text-red-500">
                Missing fields: {error.missingFields.join(", ")}
              </p>
            )}{" "}
            <input
              type="hidden"
              name="datasetIds"
              value={JSON.stringify(selectedDatasets)}
            />
            <Button type="submit" name="button">
              Submit
            </Button>
          </fetcher.Form>
        </>
      ) : (
        <>
          <div className="max-w-4xl mx-auto px-8">
            <h2 className="mt-4 mb-2 text-xl font-bold">
              Step 1: Select a Dataset
            </h2>
            <AlertSelectDataset alert={datasetReminder || false} />
            {/* Datasets */}
            <MultiSelectorComplete
              arrow
              values={selectedDatasets.map(
                (datasetId) =>
                  datasets.find((dataset) => dataset.datasetId === datasetId)
                    ?.name
              )}
              placeholder="Select the model's dataset"
              options={datasets.map((d: DatasetType) => ({
                label: d.name,
                value: d.datasetId,
              }))}
              onValuesChange={setDatasets}
            />

            <h2 className="mt-8 text-xl font-bold">
              Step 2: Upload your model
            </h2>

            <Upload files={files} setFiles={setFiles} className="mt-3" />
          </div>
        </>
      )}
    </div>
  );
}
export const loader = async () => {
  const datasets = await db.dataset.getByLatest();
  console.log("datasets length", datasets.length);
  return { datasets };
};
