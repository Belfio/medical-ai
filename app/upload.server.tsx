import type { UploadHandlerPart } from "@remix-run/node";
import s3 from "./lib/s3";

export const s3UploaderHandler: <T extends UploadHandlerPart>(
  props: T,
  valueId: string
) => Promise<string> = async (props, valueId) => {
  // console.log("props", props);
  // console.log("modelId", valueId);
  const { filename, data, contentType } = props;
  console.log("filename", filename);
  console.log("contentType", contentType);
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
      s3FileName = `model-${valueId.slice(0, 5)}-${filename}`;
      return await s3.models.upload(data, s3FileName, contentType);
      break;
    case "notebookFile":
      s3FileName = `notebook-${valueId.slice(0, 5)}-${filename}`;
      return await s3.models.upload(data, s3FileName, contentType);
      break;
    case "datasetFile":
      s3FileName = `datasetFile-${valueId.slice(0, 5)}-${
        filename.split(".")[0]
      }.zip`;
      return await s3.datasets.upload(data, s3FileName, contentType);
      break;
    default:
      break;
  }
  return await s3.datasets.upload(data, s3FileName, contentType);
};

export const externalLinkUploader = async (
  datasetUrl: string,
  datasetId: string
) => {
  const url = new URL(datasetUrl as string);
  const response = await fetch(url);
  const blob = await response.blob();
  const reader = blob.stream().getReader();
  const asyncIterable = {
    async *[Symbol.asyncIterator]() {
      let result;
      while (!(result = await reader.read()).done) {
        yield result.value;
      }
    },
  };
  const s3FileName = `datasetFile-${datasetId}.zip`;
  const s3Url = await s3.datasets.upload(
    asyncIterable,
    s3FileName,
    "application/zip"
  );

  return s3Url;
};
