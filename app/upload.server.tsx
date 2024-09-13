import type { UploadHandler } from "@remix-run/node";
import s3 from "./lib/s3";

export const s3UploaderHandler: UploadHandler = async (props) => {
  console.log("props", props);
  const { filename, data, contentType } = props;
  console.log("filename", filename);
  console.log("contentType", contentType);
  console.log("data", data);
  if (!filename || !data || !contentType) {
    return props;
  }
  return await s3.datasets.upload(data, filename!, contentType);
};
