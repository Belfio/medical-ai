import {
  Form,
  Outlet,
  ShouldRevalidateFunction,
  useActionData,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import db from "~/lib/db";
import { Button } from "~/components/ui/button";
import { useContext, useState } from "react";

import ModelQuestionnaire from "~/components/ModelQuestionnaire";

import { MultiSelectorComplete } from "~/components/ui/multicombo";
import { DatasetType } from "~/lib/types";
import AlertSelectDataset from "~/components/AlertSelectDataset";
// import ModelNotebook from "~/components/ModelNotebook";
import { Input } from "~/components/ui/input";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { GithubInfo } from "./models.add.github";
import {
  GithubContext,
  GithubProvider,
} from "~/components/providers/GithubProvider";

export default function ModelAdd() {
  const error = useActionData<typeof error>() as {
    error: string;
    missingFields: string[];
  };
  const { datasets } = useLoaderData<typeof loader>();
  const [selectedDatasets, setDatasets] = useState<string[]>([]);

  const { githubInfo } = useContext(GithubContext);
  return (
    <div className="flex flex-col gap-4 max-w-[540px]">
      <h1>Upload your model</h1>

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

      <h2 className="mt-4 mb-2 text-xl font-bold">Step 1: Select a Dataset</h2>

      {/* {error && error?.missingFields && (
          <AlertSelectDataset
            alert={error?.missingFields.includes("datasets") || false}
          />
        )} */}
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
      {selectedDatasets.length > 0 && (
        <>
          <h2 className="mt-8 text-xl font-bold">Step 2: Upload your model</h2>
          <p className="text-sm text-gray-500 mt-2">
            Paste the URL to a Github repo containing your model:
          </p>
          <Outlet />

          {githubInfo && (
            <>
              <h2 className="mt-8 text-xl font-bold mb-4">
                Step 3: Review the details
              </h2>
              <Form method="post" action="/api/model/add/github">
                <input
                  type="hidden"
                  name="githubInfo"
                  value={JSON.stringify(githubInfo)}
                />
                <input
                  type="hidden"
                  name="datasetIds"
                  value={JSON.stringify(
                    selectedDatasets.map(
                      (l) => datasets.find((d) => d.name === l)?.datasetId
                    )
                  )}
                />
                <ModelQuestionnaire githubInfo={githubInfo} />
                <Button
                  type="submit"
                  name="button"
                  value="newModelGithub"
                  className="mt-4"
                >
                  Submit
                </Button>
              </Form>
            </>
          )}
        </>
      )}
    </div>
  );
}
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const datasets = await db.dataset.getByLatest();
  // console.log("datasets length", datasets.length);
  console.error("reloading this?");
  const url = new URL(request.url);
  if (url.pathname === "/models/add") {
    return redirect("/models/add/github");
  }
  return { datasets };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const githubUrl = formData.get("githubUrl action?");
  console.log("githubUrl", githubUrl);
  return { success: true };
};
// export const shouldRevalidate: ShouldRevalidateFunction = () => false;

// export function shouldRevalidate() {
//   console.log("stop this?");
//   return false;
// }
