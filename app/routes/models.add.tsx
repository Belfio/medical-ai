import { useActionData, useFetcher, useLoaderData } from "@remix-run/react";
import db from "~/lib/db";
import { Button } from "~/components/ui/button";
import { useState } from "react";

import { AlertCircle } from "lucide-react";

import Upload from "~/components/Upload";
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert";
import ModelQuestionnaire from "~/components/ModelQuestionnaire";
import ModelUploadSmall from "~/components/UploadSmall";

export default function ModelAdd() {
  const fetcher = useFetcher();
  const error = useActionData<typeof error>() as {
    error: string;
    missingFields: string[];
  };
  const { datasets, diseases } = useLoaderData<typeof loader>();
  // create a reducer

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
      action: "/models/add/file",
    });
  };

  return (
    <div className="flex flex-col gap-4 max-w-[540px]">
      <h1>Upload your model</h1>
      {files?.length && files?.length > 0 ? (
        <>
          <fetcher.Form method="post" onSubmit={handleSubmit}>
            <input type="hidden" name="stogazzo" value="poba" />
            <ModelQuestionnaire datasets={datasets} diseases={diseases} />
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
            <Button type="submit" name="button">
              Submit
            </Button>
          </fetcher.Form>
        </>
      ) : (
        <>
          {/* <div className="flex items-center gap-2">
          <CircleAlert className="text-yellow-600 w-12" />
          <p className="text-sm text-yellow-600">
            Please note that the model needs to work on at least one dataset to
            be published. Use one of the existing datasets or add a new one
            <Link to="/datasets-add" className="underline bold">
              here.
            </Link>
          </p>
        </div> */}
          <Upload files={files} setFiles={setFiles} className="mt-6" />
          <div className="max-w-4xl mx-auto px-8">
            <Alert className=" mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Supported Formats</AlertTitle>
              <AlertDescription>
                We accept various file types including .py, .pkl, .h5, .pt,
                .onnx, .json, .yaml, and more. Total upload size limit: 5GB
              </AlertDescription>
            </Alert>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">
                Upload Requirements
              </h2>
              <ul className="list-disc pl-5">
                <li>
                  Include all necessary files for your model (e.g., weights,
                  config, preprocessor)
                </li>
                <li>Provide a requirements.txt file for any dependencies</li>
                <li>
                  Include a README.md with instructions on how to use your model
                </li>
                <li>
                  Ensure your files don&apos;t contain sensitive information
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
export const loader = async () => {
  const datasets = await db.dataset.getByLatest();
  const diseases = await db.disease.getByLatest(100);
  console.log("datasets length", datasets.length);
  return { datasets, diseases };
};
