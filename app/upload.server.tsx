import type { UploadHandler } from "@remix-run/node";
import s3 from "./lib/s3";

export const s3UploaderHandler: UploadHandler = async (props) => {
  console.log("props", props);
  const { filename, data, contentType } = props;

  if (!filename || !data || !contentType) {
    console.log("props", props);
    console.log("props.data", props.data);

    // Collect all chunks of data
    const chunks = [];
    for await (const chunk of data) {
      chunks.push(chunk);
    }

    // Combine all chunks into a single Buffer
    const buffer = Buffer.concat(chunks);
    console.log("buffer", buffer);
    // Convert buffer to string
    const bufferString = buffer.toString();
    console.log("bufferString", bufferString);

    return bufferString;
  }

  return await s3.datasets.upload(data, filename!, contentType);
};
