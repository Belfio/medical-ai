// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: "medical-ai",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: { cloudflare: "5.38.0", aws: "6.52.0" },
    };
  },
  async run() {
    const datasetTable = new sst.aws.Dynamo("Datasets", {
      fields: {
        datasetId: "string",
        createdAt: "string",
        ranking: "number",
        tConst: "string",
        dataType: "string",
        diseaseId: "string",
        userId: "string",
      },
      primaryIndex: { hashKey: "datasetId" },
      globalIndexes: {
        CreatedAtIndex: {
          hashKey: "tConst",
          rangeKey: "createdAt",
        },
        RankingIndex: {
          hashKey: "tConst",
          rangeKey: "ranking",
        },
        DiseaseIndex: {
          hashKey: "diseaseId",
          rangeKey: "createdAt",
        },
        DataTypeIndex: {
          hashKey: "tConst",
          rangeKey: "dataType",
        },
        UserIdIndex: {
          hashKey: "userId",
        },
      },
    });
    const modelTable = new sst.aws.Dynamo("Models", {
      fields: {
        modelId: "string",
        createdAt: "string",
        ranking: "number",
        tConst: "string",
        diseaseId: "string",
        modelType: "string",
        userId: "string",
      },
      primaryIndex: { hashKey: "modelId" },
      globalIndexes: {
        CreatedAtIndex: {
          hashKey: "tConst",
          rangeKey: "createdAt",
        },
        RankingIndex: {
          hashKey: "tConst",
          rangeKey: "ranking",
        },
        DiseaseIndex: {
          hashKey: "diseaseId",
          rangeKey: "createdAt",
        },
        ModelTypeIndex: {
          hashKey: "tConst",
          rangeKey: "modelType",
        },
        UserIdIndex: {
          hashKey: "userId",
        },
      },
    });
    const userTable = new sst.aws.Dynamo("Users", {
      fields: {
        userId: "string",
        createdAt: "string",
        PK: "string",
      },
      primaryIndex: { hashKey: "userId" },
      globalIndexes: {
        CreatedAtIndex: {
          hashKey: "PK",
          rangeKey: "createdAt",
        },
      },
    });
    const datasetBucket = new sst.aws.Bucket("DatasetBucket");
    const modeBucket = new sst.aws.Bucket("ModelBucket");
    const site = new sst.aws.Remix("MedicalAI", {
      link: [datasetTable, modelTable, userTable, datasetBucket, modeBucket],
      domain: {
        name: "biomeddb.com",
        dns: sst.cloudflare.dns(),
      },
    });
    return {
      app: "medical-ai",
      siteUrl: site.url,
    };
  },
});
