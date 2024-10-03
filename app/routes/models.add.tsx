import { Form, useActionData, useLoaderData } from "@remix-run/react";
import db from "~/lib/db";
import { Button } from "~/components/ui/button";
import { useState } from "react";

import ModelQuestionnaire from "~/components/ModelQuestionnaire";

import { MultiSelectorComplete } from "~/components/ui/multicombo";
import { DatasetType } from "~/lib/types";
import AlertSelectDataset from "~/components/AlertSelectDataset";
// import ModelNotebook from "~/components/ModelNotebook";
import { Input } from "~/components/ui/input";

export default function ModelAdd() {
  const error = useActionData<typeof error>() as {
    error: string;
    missingFields: string[];
  };
  const { datasets } = useLoaderData<typeof loader>();
  const [selectedDatasets, setDatasets] = useState<string[]>([]);

  const handleGitConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-4 max-w-[540px]">
      <h1>Upload your model</h1>
      <Form method="post">
        <input type="hidden" name="stogazzo" value="poba" />
        {error && error.error && <p className="text-red-500">{error.error}</p>}
        {error && error.missingFields && (
          <p className="text-red-500">
            Missing fields: {error.missingFields.join(", ")}
          </p>
        )}
        <input
          type="hidden"
          name="datasetIds"
          value={JSON.stringify(
            selectedDatasets.map(
              (l) => datasets.find((d) => d.name === l)?.datasetId
            )
          )}
        />

        <h2 className="mt-4 mb-2 text-xl font-bold">
          Step 1: Select a Dataset
        </h2>

        <AlertSelectDataset
          alert={error?.missingFields.includes("datasets") || false}
        />
        {/* Datasets */}
        <MultiSelectorComplete
          arrow
          values={selectedDatasets}
          placeholder="Select the model's dataset"
          options={datasets.map((d: DatasetType) => ({
            label: d.name,
            value: d.name,
          }))}
          onValuesChange={setDatasets}
        />

        <h2 className="mt-8 text-xl font-bold">Step 2: Upload your model</h2>
        <p className="text-sm text-gray-500 my-2">
          Paste the URL to a Github repo containing your model:
        </p>
        <div className="flex  gap-2">
          <Input type="text" name="githubUrl" placeholder="Github URL" />
          <Button onClick={handleGitConfirm}>Confirm</Button>
        </div>
        <h2 className="mt-8 text-xl font-bold mb-4">
          Step 3: Complete the details
        </h2>

        <ModelQuestionnaire />

        <Button type="submit" name="button" className="mt-4">
          Submit
        </Button>
      </Form>
    </div>
  );
}
export const loader = async () => {
  const datasets = await db.dataset.getByLatest();
  console.log("datasets length", datasets.length);
  return { datasets };
};
