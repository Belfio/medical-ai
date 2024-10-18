import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Trash } from "lucide-react";
import { useState } from "react";
import PythonEditor from "~/components/PythonEditor";
import { Button } from "~/components/ui/button";
import db from "~/lib/db";
import { ModelType } from "~/lib/types";
import {
  getUrl,
  listFiles,
  uploadFile,
  uploadFileFromS3,
} from "~/server/googleApi.server";
import ds from "~/server/model.server";
import s3 from "~/lib/s3";
import { pyToNotebook } from "~/lib/utils";

export default function ModelPage() {
  const { model, datasetUrls } = useLoaderData<{
    model: ModelType;
    datasetUrls: string[];
  }>();
  const [script, setScript] = useState<string>("");

  if (!model) {
    return <>Something went wrong</>;
  }
  console.log("model", model);

  return (
    <>
      <div className="flex flex-row gap-2 max-w-screen-md justify-between">
        <div className="w-1/2 flex-col space-y-8">
          <div className="flex items-baseline gap-2">
            <h1 className="text-4xl font-bold">{model.name}</h1>
            {/* <Badge>{model.modelId}</Badge> */}
            <Form method="POST" className="">
              <Link to={`/models/${model.modelId}/edit`}>
                <Button variant="link">Edit</Button>
              </Link>
              <input type="hidden" name="modelId" value={model.modelId} />
            </Form>
          </div>
          <p>{model.description}</p>
        </div>
        <Button
          type="submit"
          name="remove"
          value={model.modelId}
          className="mt-2"
          variant="outline"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>

      <div className="max-w-screen-md my-8">
        <h2 className="text-2xl font-bold">Evaluate the model</h2>
        <p className="text-md text-gray-500 mb-4">
          Please review and edit the code where necessary to test the model.
          This code will run in a Google Colab notebook.
        </p>
        <PythonEditor
          datasetUrl={datasetUrls[0]}
          repoUrl={model.website}
          repoName={model.name}
          setScript={setScript}
        />
      </div>
      <Form method="POST" className="flex gap-2 justify-end max-w-screen-md ">
        <Button name="action" value="submit">
          Submit
        </Button>
        <input type="hidden" name="script" value={script} />
        <input type="hidden" name="modelId" value={model.modelId} />
        <input type="hidden" name="repoName" value={model.name} />
        <Button name="action" value="listFiles">
          List files
        </Button>
        <Button name="action" value="upload">
          Upload file
        </Button>
        <Button name="action" value="access">
          Access
        </Button>
        <input type="hidden" name="modelId" value={model.modelId} />
      </Form>
    </>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const remove = formData.get("remove");
  const modelId = formData.get("modelId");
  console.log("remove", remove);
  console.log("modelId", modelId);
  if (remove && modelId) {
    console.log("removing model");
    await db.model.delete(modelId as string);
    return redirect(`/models`);
  }
  const action = formData.get("action");
  if (action === "testing") {
    console.log("testing model");
    const s3Path = modelId + "/" + "prova.ipynb";
    console.log("s3Path", s3Path);
    await ds.testModel(s3Path);
  }
  if (action === "submit") {
    console.log("submitting model");
    // take the code in the editor and save it in a file
    const script = formData.get("script");
    const modelId = formData.get("modelId");
    const repoName = formData.get("repoName");

    console.log("code", script);
    // then take the file and save it in the google drive
    //filename is "userId+the github name"
    const fileName = `${modelId}-${repoName}.ipynb`;
    const s3Path = modelId + "/" + fileName;
    const notebook = pyToNotebook(script as string);
    const stream = s3.lib.stringToAsyncIterable(notebook as string);
    await s3.models.upload(stream, s3Path, "application/x-ipynb+json");
    // upload script to S3 and then to Colab
    await uploadFileFromS3(s3Path);
  }
  if (action === "listFiles") {
    const files = await listFiles();
    console.log("files", files);
  }
  if (action === "upload") {
    // create the file

    // upload it to drive
    // const files = await uploadFile(file);
    console.log("files", files);
  }
  if (action === "access") {
    const fileId = formData.get("fileId");
    const file = await getUrl(fileId as string);
    console.log("file", file);
  }
  return redirect(`/models/${modelId}`);
};

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.modelId) {
    return new Response("Model ID is required", { status: 400 });
  }
  try {
    const model = await db.model.get(params.modelId);
    if (!model) {
      return new Response("Model not found", { status: 404 });
    }
    console.log("model", model.datasetIds);
    const datasetIds = model?.datasetIds?.split(",") || [];
    const datasetUrls = [];
    for (const datasetId of datasetIds) {
      const dataset = await db.dataset.get(datasetId);
      datasetUrls.push(dataset?.downloadUrl);
    }
    return json({ model, datasetUrls });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
