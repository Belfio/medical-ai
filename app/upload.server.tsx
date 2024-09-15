import type { UploadHandlerPart } from "@remix-run/node";
import s3 from "./lib/s3";

export const s3UploaderHandler: <T extends UploadHandlerPart>(
  props: T,
  modelId: string
) => Promise<string> = async (props, valueId) => {
  console.log("props", props);
  console.log("modelId", valueId);
  const { filename, data, contentType } = props;

  if (!filename || !data || !contentType) {
    // Collect all chunks of data
    const chunks = [];
    for await (const chunk of data) {
      chunks.push(chunk);
    }

    // Combine all chunks into a single Buffer
    const buffer = Buffer.concat(chunks);

    // Convert buffer to string
    const bufferString = buffer.toString();
    console.log("bufferString", bufferString);

    return bufferString;
  }
  let s3FileName = filename;
  switch (props.name) {
    case "modelFile":
      s3FileName = `model-${valueId}.zip`;
      return await s3.models.upload(data, s3FileName, contentType);
      break;
    case "notebookFile":
      s3FileName = `notebook-${valueId}.ipynb`;
      return await s3.models.upload(data, s3FileName, contentType);
      break;
    case "datasetFile":
      s3FileName = `datasetFile-${valueId}.zip`;
      return await s3.datasets.upload(data, s3FileName, contentType);
      break;
    default:
      break;
  }
  return await s3.datasets.upload(data, s3FileName, contentType);
};
