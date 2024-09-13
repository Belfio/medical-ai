import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  DeleteCommand,
  QueryCommand,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";

import { Resource } from "sst";
import { DatasetType, ModelType, UserType } from "./types";

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const getItem = async <T extends Record<string, any>>(
  tableName: string,
  idObj: T
) => {
  // console.log("getItem", tableName, idObj);

  const command = new GetCommand({
    TableName: tableName,
    Key: {
      ...idObj,
    },
  });

  // // console.log("getItem", command);

  const data = await client.send(command);
  // // console.log("getItem data", data);

  if (!data.Item) return null;
  return data.Item;
};

// const queryItem = async (tableName: string, id: string, idName: string) => {
//   // console.log("queryItem", tableName, id, idName);
//   const command = new QueryCommand({
//     TableName: tableName,
//     KeyConditionExpression: `${idName} = :${idName}`,
//     ExpressionAttributeValues: {
//       [":" + idName]: id,
//     },
//     IndexName: idName,
//   });

//   const data = await client.send(command);
//   // // console.log("data", data.Items);

//   let result;
//   if (!data.Items) return null;
//   if (data.Items.length > 0) result = data.Items[0];
//   else result = null;
//   return result;
// };

// const queryItemSecondary = async (
//   tableName: string,
//   secondaryKey: string,
//   secondaryValue: string,
//   indexName: string
// ) => {
//   // console.log("queryItem", tableName, id, idName);

//   const command = new QueryCommand({
//     KeyConditionExpression: `${secondaryKey} = :queryKey`,
//     ExpressionAttributeValues: {
//       ":queryKey": { S: secondaryValue },
//     },
//     IndexName: indexName,
//     TableName: tableName,
//   });

//   const data = await client.send(command);
//   // // console.log("data", data.Items);

//   let result;
//   if (!data.Items) return null;
//   if (data.Items.length > 0) result = data.Items[0];
//   else result = null;
//   return result;
// };

// const queryItems = async <T>(
//   tableName: string,
//   keyValue: string,
//   keyName: string,
//   indexName: string,
//   LastEvaluatedKey?: any,
//   lastItems?: T[]
// ): Promise<T[] | null> => {
//   try {
//     // console.log("queryItems", tableName, id, idName);
//     let items = lastItems || [];

//     const command = new QueryCommand({
//       KeyConditionExpression: `${keyName} = :${keyName}`,
//       ExpressionAttributeValues: {
//         [":" + keyName]: { S: keyValue },
//       },
//       IndexName: indexName,
//       TableName: tableName,
//       ExclusiveStartKey: LastEvaluatedKey,
//     });

//     const data = await client.send(command);

//     let result;
//     if (!data.Items) return null;
//     if (data.Items.length > 0) {
//       result = data.Items as T[];
//       items = items.concat(result);
//     }
//     if (data.LastEvaluatedKey) {
//       return await queryItems(
//         tableName,
//         keyValue,
//         keyName,
//         indexName,
//         data.LastEvaluatedKey,
//         items
//       );
//     }
//     return items;
//   } catch (error) {
//     console.log("queryItems error", error);
//     return null;
//   }
// };

const getNItems = async (
  tableName: string,
  indexName: string,
  limit: number,
  lastEvaluatedKey?: any
): Promise<{ items: any[] | null; lastEvaluatedKey?: any }> => {
  try {
    const command = new QueryCommand({
      TableName: tableName,
      IndexName: indexName,
      KeyConditionExpression: "tConst = :tConst",
      ExpressionAttributeValues: {
        ":tConst": "metadata", // Adjust this value as needed
      },
      ScanIndexForward: false, // To get items in descending order
      Limit: limit,
      ExclusiveStartKey: lastEvaluatedKey,
    });

    const data = await client.send(command);

    if (!data.Items) return { items: null };
    return { items: data.Items, lastEvaluatedKey: data.LastEvaluatedKey };
  } catch (error) {
    console.log("getNItems error", error);
    return { items: null };
  }
};

// const queryStatus = async (
//   tableName: string,
//   id: string,
//   idName: string,
//   indexName: string,
//   LastEvaluatedKey?: string,
//   lastItems?: any
// ): Promise<any[] | null> => {
//   // console.log("queryItems", tableName, id, idName);
//   let items = lastItems || [];
//   let command = {
//     KeyConditionExpression: `#status = :primaryIndex`,
//     ExpressionAttributeNames: { "#status": idName },
//     ExpressionAttributeValues: {
//       ":primaryIndex": { S: id },
//     },
//     IndexName: indexName,
//     TableName: tableName,
//   };
//   if (LastEvaluatedKey) {
//     command = { ...command, ExclusiveStartKey: LastEvaluatedKey };
//   }

//   const data = await client.send(new QueryCommand(command));
//   // // console.log("data queryItems", data.Items);

//   let result;
//   if (!data.Items) return null;
//   if (data.Items.length > 0) {
//     result = data.Items.map((item) => unmarshall(item));
//     items = items.concat(result);
//   }
//   if (data.LastEvaluatedKey) {
//     return await queryStatus(
//       tableName,
//       id,
//       idName,
//       indexName,
//       data.LastEvaluatedKey,
//       items
//     );
//   }
//   return items;
// };

// const queryItemsDate = async (
//   tableName: string,
//   id: string,
//   idName: string,
//   startingDate: string | null = null,
//   endingDate: string = new Date().toISOString(),
//   LastEvaluatedKey?: string,
//   lastItems?: any
// ): Promise<any[] | null> => {
//   // console.log("queryItemsDate", tableName, id, idName);
//   let items = lastItems || [];
//   let startingDateDefault;
//   if (!startingDate) {
//     startingDateDefault = new Date();
//     startingDateDefault.setDate(startingDateDefault.getDate() - 7);
//     startingDateDefault = startingDateDefault.toISOString();
//   } else {
//     startingDateDefault = startingDate;
//   }
//   let commandContent = {
//     KeyConditionExpression: `${idName} = :primaryKey AND creationDate BETWEEN :oldest AND :latest`,
//     ExpressionAttributeValues: {
//       ":primaryKey": { S: id },
//       ":oldest": { S: startingDateDefault },
//       ":latest": { S: endingDate },
//     },
//     TableName: tableName,
//   };
//   if (LastEvaluatedKey) {
//     commandContent = { ...commandContent, ExclusiveStartKey: LastEvaluatedKey };
//   }
//   const command = new QueryCommand(commandContent);

//   const data = await client.send(command);
//   console.log("data queryItemsDate", Object.keys(data));

//   let result;
//   if (!data.Items) return null;
//   if (data.Items.length > 0) {
//     result = data.Items.map((item) => unmarshall(item));
//     items = items.concat(result);
//     if (data.LastEvaluatedKey) {
//       return await queryItemsDate(
//         tableName,
//         id,
//         idName,
//         startingDate,
//         endingDate,
//         data.LastEvaluatedKey,
//         items
//       );
//     }
//   }
//   return items;
// };

// const queryItemsGlobalIndexDate = async (
//   tableName: string,
//   id: string,
//   idName: string,
//   globalIndexName: string,
//   startingDate: string | null = null,
//   endingDate: string = new Date().toISOString(),
//   LastEvaluatedKey?: string,
//   lastItems?: any
// ): Promise<any[] | null> => {
//   // console.log("queryItemsDate", tableName, id, idName);
//   let items = lastItems || [];
//   let startingDateDefault;
//   if (!startingDate) {
//     startingDateDefault = new Date();
//     startingDateDefault.setDate(startingDateDefault.getDate() - 7);
//     startingDateDefault = startingDateDefault.toISOString();
//   } else {
//     startingDateDefault = startingDate;
//   }
//   let commandContent = {
//     KeyConditionExpression: `${idName} = :primaryKey AND creationDate BETWEEN :oldest AND :latest`,
//     ExpressionAttributeValues: {
//       ":primaryKey": { S: id },
//       ":oldest": { S: startingDateDefault },
//       ":latest": { S: endingDate },
//     },
//     IndexName: globalIndexName,
//     TableName: tableName,
//   };
//   if (LastEvaluatedKey) {
//     commandContent = { ...commandContent, ExclusiveStartKey: LastEvaluatedKey };
//   }
//   const command = new QueryCommand(commandContent);

//   const data = await client.send(command);
//   console.log("data queryItemsDate", Object.keys(data));

//   let result;
//   if (!data.Items) return null;
//   if (data.Items.length > 0) {
//     result = data.Items.map((item) => unmarshall(item));
//     items = items.concat(result);
//     if (data.LastEvaluatedKey) {
//       return await queryItemsDate(
//         tableName,
//         id,
//         idName,
//         startingDate,
//         endingDate,
//         data.LastEvaluatedKey,
//         items
//       );
//     }
//   }
//   return items;
// };

// const queryItemsType = async (
//   tableName: string,
//   id: string,
//   idName: string,
//   type: string,
//   typeName: string,
//   old?: number,
//   LastEvaluatedKey?: string,
//   lastItems?: any
// ): Promise<any[] | null> => {
//   // console.log("queryItemsType", tableName, id, idName);
//   let items = lastItems || [];

//   const oldest = new Date();
//   const daysBefore = old || 365;
//   oldest.setDate(oldest.getDate() - daysBefore);
//   const oldestString = oldest.toISOString();
//   let command = {
//     KeyConditionExpression: `${idName} = :primaryKey AND creationDate > :oldest`,
//     FilterExpression: `${typeName} = :type `,
//     ExpressionAttributeValues: {
//       ":primaryKey": { S: id },
//       ":type": { S: type },
//       ":oldest": { S: oldestString },
//     },
//     // IndexName: idName,
//     TableName: tableName,
//   };
//   if (LastEvaluatedKey) {
//     command = { ...command, ExclusiveStartKey: LastEvaluatedKey };
//   }
//   // // console.log("command queryItems", command);

//   const data = await client.send(new QueryCommand(command));

//   let result;
//   if (!data.Items) return null;
//   if (data.Items.length > 0) {
//     result = data.Items.map((item) => unmarshall(item));
//     items = items.concat(result);
//   }
//   if (data.LastEvaluatedKey) {
//     return await queryItemsType(
//       tableName,
//       id,
//       idName,
//       type,
//       typeName,
//       old,
//       data.LastEvaluatedKey,
//       items
//     );
//   }

//   return items;
// };

// const queryItemsTypeAndStatus = async (
//   tableName: string,
//   indexName: string,
//   type: string,
//   typeName: string,
//   status: string,
//   statusName: string,
//   LastEvaluatedKey?: string,
//   lastItems?: any
// ): Promise<any[] | null> => {
//   // console.log(
//   //   "queryItemsType",
//   //   tableName,
//   //   indexName,
//   //   type,
//   //   typeName,
//   //   status,
//   //   statusName
//   // );

//   let items = lastItems || [];

//   let command = {
//     ExpressionAttributeNames: {
//       "#status": statusName,
//       "#type": typeName,
//     },
//     ExpressionAttributeValues: {
//       ":type": { S: type },
//       ":status": { S: status },
//     },
//     KeyConditionExpression: `#type = :type AND #status = :status`,
//     IndexName: indexName,
//     TableName: tableName,
//   };
//   if (LastEvaluatedKey) {
//     command = { ...command, ExclusiveStartKey: LastEvaluatedKey };
//   }
//   // // console.log("command queryItems", command);

//   const data = await client.send(new QueryCommand(command));
//   // // console.log("data queryItems", data);

//   let result;
//   if (!data.Items) return null;
//   if (data.Items.length > 0) {
//     result = data.Items.map((item) => unmarshall(item));
//     items = items.concat(result);
//   }
//   if (data.LastEvaluatedKey) {
//     return await queryItemsTypeAndStatus(
//       tableName,
//       indexName,
//       type,
//       typeName,
//       status,
//       statusName,
//       data.LastEvaluatedKey,
//       items
//     );
//   }

//   return items;
// };
type responseType = {
  isSuccess: boolean;
  msg: string;
};
const createItem = async (
  tableName: string,
  item: any
): Promise<responseType> => {
  // console.log("createItem...");

  const command = new PutCommand({
    TableName: tableName,
    Item: item,
  });

  try {
    await client.send(command);
  } catch (error) {
    console.log("createItem error", error);
    return { isSuccess: false, msg: "error" };
  }

  return { isSuccess: true, msg: "ok" };
};

const deleteItem = async (
  tableName: string,
  idObj: any
): Promise<responseType> => {
  // console.log("deleteItem", tableName, idObj);

  const command = new DeleteCommand({
    TableName: tableName,
    Key: {
      ...idObj,
    },
  });

  // // console.log("deleteItem", command);
  try {
    await client.send(command);
  } catch (error) {
    return { isSuccess: false, msg: "error" };
  }
  // console.log("geleteItem data", data);

  return { isSuccess: true, msg: "deleted" };
};

const db = {
  user: {
    create: async (userProfile: UserType) => {
      const response = await createItem(Resource.Users.name, userProfile);
      if (!response.isSuccess) {
        throw new Error(`Error creating user: ${response.msg}`);
      }
      return response;
    },
    get: async (userId: string): Promise<UserType> => {
      const user = (await getItem(Resource.Users.name, {
        userId,
      })) as UserType;

      return user;
    },
    delete: async (userId: string) => {
      await deleteItem(Resource.Users.name, {
        userId,
      });
    },
  },
  model: {
    create: async (model: ModelType) => {
      const response = await createItem(Resource.Models.name, model);
      if (!response.isSuccess) {
        throw new Error(`Error creating model: ${response.msg}`);
      }
      return response;
    },
    get: async (modelId: string): Promise<ModelType> => {
      const model = (await getItem(Resource.Models.name, {
        modelId,
      })) as ModelType;

      return model;
    },
    getByRanking: async (): Promise<ModelType[]> => {
      const models = (await getNItems(
        Resource.Models.name,
        "RankingIndex",
        50
      )) as { items: ModelType[] | null; lastEvaluatedKey?: any };
      return models.items || [];
    },
    getByLatest: async (): Promise<ModelType[]> => {
      const models = (await getNItems(
        Resource.Models.name,
        "CreatedAtIndex",
        50
      )) as { items: ModelType[] | null; lastEvaluatedKey?: any };
      return models.items || [];
    },
    // getByRanking: async (): Promise<ModelType[]> => {
    //   const models = (await queryItems(
    //     Resource.Models.name,
    //     "metadata",
    //     "tConst"
    //   )) as ModelType[];
    //   return models;
    // },
    delete: async (modelId: string) => {
      await deleteItem(Resource.Models.name, {
        modelId,
      });
    },
  },
  dataset: {
    create: async (dataset: DatasetType) => {
      const response = await createItem(Resource.Datasets.name, dataset);
      if (!response.isSuccess) {
        throw new Error(`Error creating dataset: ${response.msg}`);
      }
      return response;
    },
    get: async (datasetId: string): Promise<DatasetType> => {
      const dataset = (await getItem(Resource.Datasets.name, {
        datasetId,
      })) as DatasetType;

      return dataset;
    },
    getByRanking: async (): Promise<DatasetType[]> => {
      const datasets = (await getNItems(
        Resource.Datasets.name,
        "RankingIndex",
        50
      )) as { items: DatasetType[] | null; lastEvaluatedKey?: any };
      return datasets.items || [];
    },
    getByLatest: async (): Promise<DatasetType[]> => {
      const datasets = (await getNItems(
        Resource.Datasets.name,
        "CreatedAtIndex",
        50
      )) as { items: DatasetType[] | null; lastEvaluatedKey?: any };
      return datasets.items || [];
    },
    delete: async (datasetId: string) => {
      await deleteItem(Resource.Datasets.name, {
        datasetId,
      });
    },
  },
};

export default db;
