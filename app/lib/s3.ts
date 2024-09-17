import type {
  GetObjectCommandInput,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Resource } from "sst";
import { Readable } from "stream";

const s3Client = new S3Client({ region: "us-east-1" });

const uploadStreamToS3 = async (
  data: AsyncIterable<Uint8Array>,
  key: string,
  contentType: string,
  bucketName: string
) => {
  const BUCKET_NAME = bucketName;

  const params: PutObjectCommandInput = {
    Bucket: BUCKET_NAME,
    Key: key,
    Body: await convertToBuffer(data),
    ContentType: contentType,
  };

  await s3Client.send(new PutObjectCommand(params));

  const url = await getSignedUrl(
    s3Client,
    new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    }),
    { expiresIn: 15 * 60 }
  );

  console.log(url);

  return key;
};

const getObjectFromS3 = async (key: string, bucketName: string) => {
  const BUCKET_NAME = bucketName;
  const params: GetObjectCommandInput = {
    Bucket: BUCKET_NAME,
    Key: key,
  };
  const data = await s3Client.send(new GetObjectCommand(params));
  // Read the stream completely
  const stream = data.Body as Readable;
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  const fileContent = Buffer.concat(chunks);

  return fileContent;
};

const getSize = async (key: string, bucketName: string) => {
  const BUCKET_NAME = bucketName;
  const params: GetObjectCommandInput = {
    Bucket: BUCKET_NAME,
    Key: key,
  };
  const data = await s3Client.send(new GetObjectCommand(params));
  return data;
};
// The UploadHandler gives us an AsyncIterable<Uint8Array>, so we need to convert that to something the aws-sdk can use.
// Here, we are going to convert that to a buffer to be consumed by the aws-sdk.
async function convertToBuffer(a: AsyncIterable<Uint8Array>) {
  const result = [];
  for await (const chunk of a) {
    result.push(chunk);
  }
  return Buffer.concat(result);
}

const s3 = {
  datasets: {
    upload: (
      data: AsyncIterable<Uint8Array>,
      key: string,
      contentType: string
    ) => uploadStreamToS3(data, key, contentType, Resource.DatasetBucket.name),
    get: (key: string) => getObjectFromS3(key, Resource.DatasetBucket.name),
    getSize: (key: string) => getSize(key, Resource.DatasetBucket.name),
  },
  models: {
    upload: (
      data: AsyncIterable<Uint8Array>,
      key: string,
      contentType: string
    ) => uploadStreamToS3(data, key, contentType, Resource.ModelBucket.name),
    get: (key: string) => getObjectFromS3(key, Resource.ModelBucket.name),
    getSize: (key: string) => getSize(key, Resource.ModelBucket.name),
  },
};

export default s3;
