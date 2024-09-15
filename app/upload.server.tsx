import type { UploadHandler, UploadHandlerPart } from "@remix-run/node";
import s3 from "./lib/s3";

export const s3UploaderHandler: <T extends UploadHandlerPart>(
  props: T,
  modelId: string
) => Promise<string> = async (props, s3FileName) => {
  console.log("props", props);
  console.log("modelId", s3FileName);
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

  return await s3.datasets.upload(data, s3FileName, contentType);
};
